export type Product = {
  id: number;
  title: string;
  price: number;
  category: string;
  description?: string;
  image?: string;
  rating?: {
    rata: number;
    count: number;
  };
};

export type ProductInBasket = Product & { quantity: number };

export type Basket = {
  count: number;
  products: ProductInBasket[];
  // TODO: add total property
};
