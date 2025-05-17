import { JSX } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const user = useSelector((state: RootState) => state.auth.user);

  // If no user, redirect to home (or login)
  if (!user) {
    console.log('No user found');
    return <Navigate to="/" replace />;
  }

  // Optional: restrict admin routes
  const isAdmin = user.email === 'ramrekadi1729@gmail.com';
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
