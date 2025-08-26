import { Analytics } from "@vercel/analytics/react";
import AppRoutes from '../routes';
import Footer from '../components/Footer';

function App() {
  return (
    <div className="App">
      <AppRoutes />
      <Footer />
      <Analytics />
    </div>
  );
}

export default App;