import { useEffect, useState } from 'react';
import { ProductType } from '../types';
import ProductItem from './ProductItem';
import useBasketStore from '../lib/basket-store';

const ProductsList = () => {
  const [products, setProducts] = useState<ProductType[]>();
  const { addToBasket } = useBasketStore();

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

  return (
    <ol>
      {products?.map((product) => (
        <ProductItem key={product.id} product={product} onAddToBasket={addToBasket} />
      ))}
    </ol>
  );
};
export default ProductsList;
