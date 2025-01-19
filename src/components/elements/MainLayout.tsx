import { useLocation, Outlet } from 'react-router-dom';
import { useEffect } from 'react';

import Header from './Header';
import Footer from './Footer';
import '../styles/mainLayout.scss';

// Get url path and scroll to the top when it changes.
// Create global layout containing header, footer and main with dynamic content.
export default function Root() {
  const { pathname } = useLocation();
  const noHeaderRoutes = ['/', '/signup'];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      {!noHeaderRoutes.includes(pathname) && <Header />}
      <main className='main'>
        <Outlet />
      </main>
      <Footer />
    </>
  ); 
};
