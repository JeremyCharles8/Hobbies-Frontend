import { useLocation, Outlet } from 'react-router-dom';
import { useEffect } from 'react';

import Header from './Header';
import Footer from './Footer';

// Get url path and scroll to the top when it changes.
// Create global layout containing header, footer and main with dynamic content.
export default function Root() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Header />
      <main className='main'>
        <Outlet />
      </main>
      <Footer />
    </>
  ); 
};
