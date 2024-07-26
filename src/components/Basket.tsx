import useBasketStore from '../lib/basket-store';

const Basket = () => {
  const { count, products, total, removeFromBasket } = useBasketStore();

  return (
    <ul>
      <li>Number of products in basket: {count}</li>
      <li>Total: {total} USD</li>
      <li>
        {count > 0 ? (
          <>
            Your basket:
            <ul>
              {products?.map((product) => {
                const subtotal = Math.round((product.quantity * product.price + Number.EPSILON) * 100) / 100;
                return (
                  <li key={product.id}>
                    {product.title}, amount: {product.quantity}, price: {product.price} USD, subtotal: {subtotal}
                    USD
                    <button onClick={() => removeFromBasket({ id: product.id })}>remove from basket</button>
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
  );
};
export default Basket;
