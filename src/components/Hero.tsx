import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import TableBooking from './TableBooking';

const Hero = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);
  
  const handleViewMenu = () => {
    navigate('/menu');
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop')", 
          filter: 'brightness(0.5)'
        }}
      ></div>
      
      <div className="absolute inset-0 bg-black opacity-40"></div>
      
      <div className="relative h-full flex flex-col justify-center items-center container mx-auto px-4 text-center">
        <h1 
          data-aos="fade-down" 
          className="text-5xl md:text-7xl font-bold text-white mb-6 font-playfair"
        >
          Savor the Moment
        </h1>
        
        <p 
          data-aos="fade-up" 
          data-aos-delay="100" 
          className="text-xl md:text-2xl text-white max-w-3xl mb-8"
        >
          Discover our delicious meals prepared with fresh ingredients and passion
        </p>
        
        <div 
          data-aos="fade-up" 
          data-aos-delay="200" 
          className="flex flex-col sm:flex-row gap-4 mt-6"
        >
          <Button 
            size="lg" 
            className="bg-restaurant-primary hover:bg-restaurant-primary/90 text-lg"
            onClick={handleViewMenu}
          >
            View Our Menu
          </Button>
          
          <TableBooking 
            customButton={
              <Button size="lg" variant="outline" className="border-white text-restaurant-primary hover:bg-white hover:text-restaurant-primary text-lg">
                Book a Table
              </Button>
            }
          />
        </div>
      </div>
    </div>   
  );
};

export default Hero;
