import { useEffect, useState } from 'react';

import ProductItem from './components/ProductItem';
import { Basket, Product, ProductInBasket } from './types';

function App() {
  // TODO: replace useState with either context of Zustand
  const [basket, setBasket] = useState<Basket>({
    count: 0,
    total: 0,
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
          total: currentBasket.total + product.quantity * product.price,
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

      const updatedTotal = updatedProducts.reduce(
        (accumulator, currentValue) =>
          accumulator + currentValue.quantity * currentValue.price,
        0
      );

      return {
        count: currentBasket.count + product.quantity,
        total: Math.round((updatedTotal + Number.EPSILON) * 100) / 100,
        products: updatedProducts,
      };
    });
  };

  console.log('current basket:', basket);

  return (
    <>
      <h1>simple store</h1>
      <ul>
        <li>Number of products in basket: {basket.count}</li>
        <li>Total: {basket.total} USD</li>
        <li>
          {basket.count > 0 ? (
            <>
              Your basket:
              <ul>
                {basket?.products?.map((product) => {
                  const subtotal =
                    Math.round(
                      (product.quantity * product.price + Number.EPSILON) * 100
                    ) / 100;
                  return (
                    <li key={product.id}>
                      {product.title}, amount: {product.quantity}, price:{' '}
                      {product.price} USD, subtotal: {subtotal}
                      USD
                    </li>
                  );
                })}
              </ul>
            </>
          ) : (
            'Your basket is empty'
          )}
        </li>
      </ul>
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
