
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import AOS from 'aos';
import 'aos/dist/aos.css';

const AboutSection = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
  <section className="py-20 bg-white overflow-x-hidden"> {/* Added overflow-x-hidden */}
  <div className="container mx-auto px-4">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">      
      {/* Left Side */}
      <div className="order-2 lg:order-1" data-aos="fade-right">
        <div className="text-left">
          <h2 className="text-3xl md:text-5xl font-bold text-restaurant-dark mb-4 font-playfair">Our Story</h2>
          <div className="h-1 w-24 bg-restaurant-primary mb-6"></div>
          <p className="text-gray-700 mb-6 text-lg">
            {/* Since 1985, Franks has been serving delicious, homestyle meals made with love and the freshest ingredients. 
            Our family recipes have been passed down through generations, bringing authentic flavors to your table. */}
            Frank's Restaurant in Fairview Heights, Illinois, is a welcoming family-friendly spot serving classic American cuisine.
          </p>
          <p className="text-gray-700 mb-6 text-lg">
            {/* What started as a small diner has grown into multiple locations across the country, 
            but our commitment to quality food and warm hospitality remains unchanged. */}
             We pride ourselves on offering hearty meals made from fresh, high-quality ingredients. 
             Our menu features a variety of comfort foods, from juicy burgers to homestyle breakfasts and delicious steaks. 
             We provide a warm and inviting atmosphere where families and friends can gather and enjoy great food. 
             Our staff is dedicated to delivering excellent service with a smile. 
          </p>
          <p className="text-gray-700 mb-6 text-lg">
             At Frank's, we believe in quality, tradition, and a touch of home in every meal. 
             Whether you're stopping by for a quick bite or a family dinner, we guarantee a delicious experience. 
             Come visit Frank’s Restaurant and enjoy a taste of home-cooked goodness!
             </p>
          <div className="flex flex-wrap space-x-4 mt-8">
            <Button className="bg-restaurant-primary hover:bg-restaurant-primary/90">
              Learn More
            </Button>
            <Button variant="outline" className="border-restaurant-primary text-restaurant-primary">
              Meet Our Team
            </Button>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="order-1 lg:order-2" data-aos="fade-left">
        <div className="grid grid-cols-2 gap-4 max-w-full">
          <div className="space-y-4">
            <div className="overflow-hidden rounded-lg h-64">
              <img 
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop" 
                alt="Restaurant interior" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="overflow-hidden rounded-lg h-40">
              <img 
                src="https://images.unsplash.com/photo-1484659619207-9165d119dafe?q=80&w=2070&auto=format&fit=crop" 
                alt="Chef cooking" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
          <div className="space-y-4 mt-8">
            <div className="overflow-hidden rounded-lg h-40">
              <img 
                src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=2074&auto=format&fit=crop" 
                alt="Food preparation" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="overflow-hidden rounded-lg h-64">
              <img 
                src="https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?q=80&w=2070&auto=format&fit=crop" 
                alt="Dining area" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</section>

  );
};

export default AboutSection;
