import { create } from 'zustand';
import { ProductInBasketType } from '../types';

// TODO: fn to BasketStore --> removeFromBasket
/**
 * TODO:
 * ! consider adding fn increase/decrease number of quantity
 * ! configure zustand
 * ! configure TanStack
 */

type BasketStore = {
  count: number;
  total: number;
  products: ProductInBasketType[];
  removeFromBasket: (productId: Pick<ProductInBasketType, 'id'>) => void;
  addToBasket: (product: ProductInBasketType) => void;
};

const useBasketStore = create<BasketStore>((set) => ({
  count: 0,
  products: [],
  total: 0,
  removeFromBasket: ({ id }) => {
    set((state) => {
      const productToRemove = state.products.find((product) => product.id === id);

      if (!productToRemove) {
        return state;
      }

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

      return {
        count: state.count + product.quantity,
        total: updatedTotal,
        products: updatedProducts,
      };
    }),
}));

export default useBasketStore;
