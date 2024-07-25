import Basket from './components/Basket';
import ProductsList from './components/ProductsList';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <h3>simple store</h3>
      <Basket />
      <ProductsList />
    </QueryClientProvider>
  );
}

export default App;
