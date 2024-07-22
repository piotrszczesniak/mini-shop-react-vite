import { useEffect, useState } from 'react';

import ProductItem from './components/ProductItem';
import { Basket, Product, ProductInBasket } from './types';

function App() {
  // TODO: replace useState with either context of Zustand
  const [basket, setBasket] = useState<Basket>({
    count: 0,
    products: [],
  });

  const [products, setProducts] = useState<Product[]>();

  useEffect(() => {
    // TODO: replace fetch with React Query
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();

        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToBasket = (product: ProductInBasket) => {
    setBasket((currentBasket) => {
      const isInBasket = currentBasket.products.findIndex(
        (basketProduct) => basketProduct.id === product.id
      );

      if (isInBasket === -1) {
        return {
          count: currentBasket.count + product.quantity,
          products: [...currentBasket.products, product],
        };
      }

      const updatedProducts = currentBasket.products.map((basketProduct) =>
        basketProduct.id !== product.id
          ? basketProduct
          : {
              ...basketProduct,
              quantity: basketProduct.quantity + product.quantity,
            }
      );

      return {
        count: currentBasket.count + product.quantity,
        products: updatedProducts,
      };
    });
  };

  console.log('current basket:', basket);

  return (
    <>
      <h1>add product to basket</h1>
      <ol>
        {products?.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            handleClick={handleAddToBasket}
          />
        ))}
      </ol>
    </>
  );
}

export default App;
