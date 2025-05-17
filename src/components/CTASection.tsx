
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import AOS from 'aos';
import 'aos/dist/aos.css';

const CTASection = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="relative">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: "url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2074&auto=format&fit=crop')", 
              filter: 'brightness(0.4)'
            }}
          ></div>
          
          <div className="relative py-16 px-8 md:px-16 rounded-2xl overflow-hidden">
            <div className="max-w-2xl mx-auto text-center" data-aos="fade-up">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 font-playfair">
                Experience the Flavor Today
              </h2>
              <p className="text-xl text-gray-200 mb-8">
                Whether you're dining in, ordering online, or booking a table, we're ready to serve you with the best culinary experience.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-restaurant-primary hover:bg-restaurant-primary/90 text-lg px-8">
                  Order Online
                </Button>
                <Button size="lg" variant="outline" className="border-white text-restaurant-primary hover:bg-white hover:text-restaurant-primary text-lg px-8">
                  Book a Table
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
