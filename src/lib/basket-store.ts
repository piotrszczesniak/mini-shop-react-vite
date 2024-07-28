import { create } from 'zustand';
import { ProductInBasketType } from '../types';
import { toast } from 'react-toastify';

// TODO: fn to BasketStore --> removeFromBasket
/**
 * TODO:
 * ! add fn decrease number of quantity
 * ! add set quantity number in the basket
 * ! configure zustand
 * ! configure TanStack
 * ! add npm install --save react-toastify
 */

type BasketStore = {
  count: number;
  total: number;
  products: ProductInBasketType[];
  increase: (productId: Pick<ProductInBasketType, 'id'>) => void;
  descrease: (productId: Pick<ProductInBasketType, 'id'>) => void;
  removeFromBasket: (productId: Pick<ProductInBasketType, 'id'>) => void;
  addToBasket: (product: ProductInBasketType) => void;
};

const useBasketStore = create<BasketStore>((set) => ({
  count: 0,
  products: [],
  total: 0,
  increase: ({ id }) => {
    set((state) => {
      const productToUpdate = state.products.find((product) => product.id === id);

      if (!productToUpdate) {
        return state;
      }

      return {
        count: state.count + 1,
        total: state.total + productToUpdate.price * productToUpdate.quantity,
        products: state.products.map((product) => {
          if (product.id === productToUpdate.id) {
            return {
              ...productToUpdate,
              quantity: productToUpdate.quantity + 1,
            };
          } else {
            return product;
          }
        }),
      };
    });
  },
  descrease: ({ id }) => console.log(id),
  removeFromBasket: ({ id }) => {
    set((state) => {
      const productToRemove = state.products.find((product) => product.id === id);

      if (!productToRemove) {
        return state;
      }

      toast.info('Product removed from the basket');
      return {
        products: state.products.filter((product) => product.id !== id),
        count: state.count - productToRemove.quantity,
        total: state.total - productToRemove?.quantity * productToRemove?.price,
      };
    });
  },
  addToBasket: (product) =>
    set((state) => {
      // check if product is in the basket
      const productIndex = state.products.findIndex((basketProduct) => basketProduct.id === product.id);

      // case when product insnt in the basket
      if (productIndex === -1) {
        toast.success('Product added to basket successfully!');
        return {
          count: state.count + product.quantity,
          total: state.total + product.quantity * product.price,
          products: [...state.products, product],
        };
      }

      // id of the product present in the basket
      const productInBasketId = state.products[productIndex].id;

      // looking for a product to be updated
      const updatedProducts = state.products.map((basketProduct) =>
        basketProduct.id !== productInBasketId
          ? basketProduct
          : {
              ...basketProduct,
              quantity: basketProduct.quantity + product.quantity,
            }
      );

      const updatedTotal = updatedProducts.reduce(
        (accumulator, currentValue) => accumulator + currentValue.quantity * currentValue.price,
        0
      );

      toast.success('Product quantity updated successfully!');
      return {
        count: state.count + product.quantity,
        total: updatedTotal,
        products: updatedProducts,
      };
    }),
}));

export default useBasketStore;
