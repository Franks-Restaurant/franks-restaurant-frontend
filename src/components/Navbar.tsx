import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Cart from './Cart';
import TableBooking from './TableBooking';
import { useCart } from '@/contexts/CartContext';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { logoutAction } from '@/store/slices/auth/auth.slice';

const getInitials = (name: string) => {
  const nameParts = name.split(' ');
  return nameParts.map(part => part.charAt(0).toUpperCase()).join('');
};

const Navbar = ({ onSignInClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { totalItems } = useCart();
  const navigate = useNavigate();
  const routerLocation = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  const authState = useSelector((state: RootState) => state.auth);
  const user = authState.user;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const handleOrderOnline = () => navigate('/menu');
  const handleSignOut = async () => {
    await dispatch(logoutAction());
    navigate('/', { replace: true });
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'Locations', path: '/locations' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      routerLocation.pathname === '/' 
        ? scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
        : 'bg-white/95 backdrop-blur-md shadow-sm'
    }`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <span className={`text-2xl font-bold font-playfair ${
              routerLocation.pathname === '/' 
                ? scrolled ? 'text-[#2d3192]' : 'text-white'
                : 'text-[#2d3192]'
            }`}>
              Franks <span className={`text-2xl font-bold ${
              routerLocation.pathname === '/' 
                ? scrolled ? 'text-[#ed1b25]' : 'text-white'
                : 'text-[#ed1b25]'
            }`}>Restaurant</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-4">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path} 
                className={`font-medium hover:text-restaurant-primary transition-colors ${
                  routerLocation.pathname === '/' 
                    ? scrolled ? 'text-restaurant-dark' : 'text-white'
                    : 'text-restaurant-dark'
                }`}
              >
                {link.name}
              </Link>
            ))}

            <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
              <TableBooking />
              <Cart />
              <Button 
                className="bg-restaurant-primary hover:bg-restaurant-primary/90 text-white"
                size="sm"
                onClick={handleOrderOnline}
              >
                Order Online
              </Button>

              {user ? (
                <div className="relative">
                  <button 
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 p-1 rounded-full bg-gray-200 hover:bg-gray-300"
                  >
                    {user.avatar && user.avatar.includes('http') ? (
                      <img src={user.avatar} alt="Profile" className="w-8 h-8 rounded-full" />
                    ) : (
                      <div className="w-8 h-8 flex items-center justify-center rounded-full text-white text-sm bg-restaurant-primary hover:bg-restaurant-primary/90">
                        {getInitials(user.name)}
                      </div>
                    )}
                  </button>

                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md">
                      <ul className="py-2">
                        <li>
                          <Link to="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                            Update Profile
                          </Link>
                        </li>
                        <li>
                          <button 
                            onClick={handleSignOut} 
                            className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                          >
                            Logout
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <Button 
                  className="bg-restaurant-primary hover:bg-restaurant-primary/90 text-white"
                  size="sm"
                  onClick={onSignInClick}
                >
                  Sign In
                </Button>
              )}
            </div>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <Cart />
            <TableBooking />
            <button 
              onClick={toggleMenu} 
              className={`p-2 rounded-md transition-colors ${
                routerLocation.pathname === '/' 
                  ? scrolled ? 'text-restaurant-dark hover:bg-gray-100' : 'text-white hover:bg-white/10'
                  : 'text-restaurant-dark hover:bg-gray-100'
              }`}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md mt-2 py-4 px-4 border-t border-gray-100 animate-fade-in">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path} 
                  className="text-restaurant-dark font-medium px-4 py-2 rounded-md hover:bg-gray-50 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Button 
                className="mx-4 bg-restaurant-primary hover:bg-restaurant-primary/90 text-white"
                onClick={() => {
                  handleOrderOnline();
                  setIsOpen(false);
                }}
              >
                Order Online
              </Button>
              {user ? (
                <div className="mx-4">
                  <Button
                    className="w-full bg-restaurant-primary hover:bg-restaurant-primary/90 text-white"
                    onClick={handleSignOut}
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <Button 
                  className="mx-4 bg-restaurant-primary hover:bg-restaurant-primary/90 text-white"
                  onClick={onSignInClick}
                >
                  Sign In
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;


