import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function RefrshHandler({ setIsAuthenticated, isAuthenticated }) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setIsAuthenticated(true);
      if (location.pathname === '/' || location.pathname === '/login' || location.pathname === '/signup') {
        navigate(isAuthenticated ? '/secondHome' : '/home', { replace: false });
      }
    } else {
      setIsAuthenticated(false); 
    }
  }, [location, navigate, setIsAuthenticated, isAuthenticated]);

  return null;
}

export default RefrshHandler;
