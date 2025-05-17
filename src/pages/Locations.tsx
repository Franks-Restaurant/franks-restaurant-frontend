
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Phone, Clock, Search } from 'lucide-react';
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
    services: ["Dine-in", "Takeout", "Delivery"],
    coordinates: { lat: 40.7128, lng: -74.006 }
  },
  {
    id: 2,
    name: "Westside",
    address: "456 Ocean Avenue, Westside, ST 10002",
    phone: "(555) 987-6543",
    hours: "Mon-Sat: 7am-11pm, Sun: 8am-9pm",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop",
    services: ["Dine-in", "Takeout"],
    coordinates: { lat: 40.7314, lng: -73.9897 }
  },
  {
    id: 3,
    name: "Northside Mall",
    address: "789 Shopping Center, Northside, ST 10003",
    phone: "(555) 456-7890",
    hours: "Mon-Sun: 10am-9pm",
    image: "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?q=80&w=2070&auto=format&fit=crop",
    services: ["Dine-in", "Takeout", "Delivery"],
    coordinates: { lat: 40.7549, lng: -73.9840 }
  },
  {
    id: 4,
    name: "Eastside",
    address: "321 Park Avenue, Eastside, ST 10004",
    phone: "(555) 789-0123",
    hours: "Mon-Thu: 7am-9pm, Fri-Sun: 7am-11pm",
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1974&auto=format&fit=crop",
    services: ["Dine-in", "Takeout", "Delivery"],
    coordinates: { lat: 40.7681, lng: -73.9715 }
  },
  {
    id: 5,
    name: "Southside",
    address: "987 River Road, Southside, ST 10005",
    phone: "(555) 234-5678",
    hours: "Mon-Sun: 8am-10pm",
    image: "https://images.unsplash.com/photo-1507914372368-b2b085b925a1?q=80&w=2070&auto=format&fit=crop",
    services: ["Dine-in", "Takeout"],
    coordinates: { lat: 40.7058, lng: -74.0088 }
  },
  {
    id: 6,
    name: "Airport Terminal",
    address: "Terminal B Food Court, International Airport, ST 10006",
    phone: "(555) 345-6789",
    hours: "Daily: 5am-11pm",
    image: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?q=80&w=1974&auto=format&fit=crop",
    services: ["Takeout"],
    coordinates: { lat: 40.7769, lng: -73.8740 }
  }
];

const Locations = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filteredLocations, setFilteredLocations] = React.useState(LOCATIONS);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
    
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, []);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const filtered = LOCATIONS.filter(location => 
      location.address.toLowerCase().includes(searchTerm.toLowerCase()) || 
      location.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredLocations(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-restaurant-dark mb-4 font-playfair" data-aos="fade-down">
              Our Locations
            </h1>
            <div className="h-1 w-24 bg-restaurant-primary mx-auto" data-aos="fade-up" data-aos-delay="100"></div>
            <p className="mt-6 text-lg text-gray-700 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="200">
              Find the Franks restaurant nearest to you and come experience our delicious food and warm hospitality
            </p>
          </div>
          
          {/* Search Bar */}
          <div className="max-w-xl mx-auto mb-12" data-aos="fade-up" data-aos-delay="300">
            <form onSubmit={handleSearch} className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  type="text" 
                  placeholder="Search by location or address..." 
                  className="pl-10 py-6 text-base"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button type="submit" className="bg-restaurant-primary hover:bg-restaurant-primary/90">
                Search
              </Button>
            </form>
          </div>
          
          {/* Map Placeholder - In a real implementation, this would be an interactive map */}
          <div className="mb-12 rounded-lg overflow-hidden shadow-lg" style={{ height: '400px' }} data-aos="fade-up">
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <p className="text-gray-600 text-lg">Interactive Map Would Be Displayed Here</p>
            </div>
          </div>
          
          {/* Locations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredLocations.length > 0 ? (
              filteredLocations.map((location, index) => (
                <Card 
                  key={location.id}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                  className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={location.image}
                      alt={location.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <CardContent className="p-6">
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
                    
                    <div className="mb-5">
                      <p className="text-sm font-medium text-gray-700 mb-2">Available Services:</p>
                      <div className="flex flex-wrap gap-2">
                        {location.services.map((service) => (
                          <span key={service} className="bg-restaurant-accent text-restaurant-dark text-xs px-3 py-1 rounded-full">
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex space-x-3 mt-6">
                      <Button className="flex-1 bg-restaurant-primary hover:bg-restaurant-primary/90">
                        Get Directions
                      </Button>
                      <Button variant="outline" className="flex-1 border-restaurant-primary text-restaurant-primary">
                        Order Online
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-3 text-center py-12">
                <p className="text-gray-600 text-lg">No locations found matching your search. Please try again.</p>
                <Button 
                  className="mt-4 bg-restaurant-primary hover:bg-restaurant-primary/90"
                  onClick={() => {
                    setSearchTerm('');
                    setFilteredLocations(LOCATIONS);
                  }}
                >
                  Show All Locations
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Locations;
