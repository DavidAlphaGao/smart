import logo from './logo.svg';
import './App.css';
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';
import SmartConatiner from './SmartContainer';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SmartConatiner
        key="smart-container"
        onChange={(v) => console.log(v)}
      />
    </QueryClientProvider>
  );
}

export default App;
