import { useState } from 'react';
import LandingPage from "./Components/LandingPage/LandingPage";
import Home from "./Components/Home/Home";
import { ProductsProvider } from "./context/ProductsContext";

function App() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'home'>('landing');

  const handleGetStarted = () => {
    setCurrentPage('home');
  };

  const handleBackToLanding = () => {
    setCurrentPage('landing');
  };

  return (
    <>
      {currentPage === 'landing' ? (
        <LandingPage onGetStarted={handleGetStarted} />
      ) : (
        <ProductsProvider>
          <Home onBackToLanding={handleBackToLanding} />
        </ProductsProvider>
      )}
    </>
  );
}

export default App;
