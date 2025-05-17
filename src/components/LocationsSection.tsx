
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Clock } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const LOCATIONS = [
  {
    id: 1,
    name: "Downtown",
    address: "123 Main Street, City Center, ST 10001",
    phone: "(555) 123-4567",
    hours: "Mon-Sat: 7am-10pm, Sun: 8am-9pm",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2074&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Westside",
    address: "456 Ocean Avenue, Westside, ST 10002",
    phone: "(555) 987-6543",
    hours: "Mon-Sat: 7am-11pm, Sun: 8am-9pm",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Northside Mall",
    address: "789 Shopping Center, Northside, ST 10003",
    phone: "(555) 456-7890",
    hours: "Mon-Sun: 10am-9pm",
    image: "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?q=80&w=2070&auto=format&fit=crop",
  },
];

const LocationsSection = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-restaurant-dark mb-4 font-playfair">Our Locations</h2>
          <div className="h-1 w-24 bg-restaurant-primary mx-auto"></div>
          <p className="mt-6 text-lg text-gray-700 max-w-2xl mx-auto">
            Find the Franks restaurant nearest to you and come experience our delicious food and warm hospitality
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {LOCATIONS.map((location, index) => (
            <div 
              key={location.id}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={location.image}
                  alt={location.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-restaurant-dark mb-4 font-playfair">{location.name}</h3>
                
                <div className="flex items-start mb-3">
                  <MapPin className="w-5 h-5 text-restaurant-primary mr-3 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">{location.address}</p>
                </div>
                
                <div className="flex items-center mb-3">
                  <Phone className="w-5 h-5 text-restaurant-primary mr-3 flex-shrink-0" />
                  <p className="text-gray-700">{location.phone}</p>
                </div>
                
                <div className="flex items-start mb-5">
                  <Clock className="w-5 h-5 text-restaurant-primary mr-3 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">{location.hours}</p>
                </div>
                
                <div className="flex space-x-3 mt-6">
                  <Button className="flex-1 bg-restaurant-primary hover:bg-restaurant-primary/90">
                    Get Directions
                  </Button>
                  <Button variant="outline" className="flex-1 border-restaurant-primary text-restaurant-primary">
                    Order Online
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button className="bg-restaurant-secondary hover:bg-restaurant-secondary/90 text-lg px-8" size="lg">
            View All Locations
          </Button>
        </div>
      </div>
    </section>
  );
};

export default LocationsSection;
