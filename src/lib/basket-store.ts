import { create } from 'zustand';
import { ProductInBasketType } from '../types';

type BasketStore = {
  count: number;
  total: number;
  products: ProductInBasketType[];
  addToBasket: (product: ProductInBasketType) => void;
};

const useBasketStore = create<BasketStore>((set) => ({
  count: 0,
  products: [],
  total: 0,
  addToBasket: (product: ProductInBasketType) =>
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
