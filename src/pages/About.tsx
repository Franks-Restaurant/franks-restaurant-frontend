
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const TEAM_MEMBERS = [
  {
    id: 1,
    name: "Michael Johnson",
    role: "Executive Chef",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    bio: "With 15 years of culinary experience, Chef Michael brings innovation and tradition together in every dish."
  },
  {
    id: 2,
    name: "Sarah Williams",
    role: "Restaurant Manager",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    bio: "Sarah ensures every guest has an exceptional dining experience through her meticulous attention to detail."
  },
  {
    id: 3,
    name: "David Chen",
    role: "Pastry Chef",
    image: "https://randomuser.me/api/portraits/men/22.jpg",
    bio: "David's passion for pastry has led to the creation of our signature desserts that customers love."
  },
  {
    id: 4,
    name: "Emily Rodriguez",
    role: "Head Server",
    image: "https://randomuser.me/api/portraits/women/29.jpg",
    bio: "Emily's warm personality and knowledge of our menu make her an invaluable part of the dining experience."
  }
];

const MILESTONES = [
  { year: "1985", event: "First Franks restaurant opened in downtown" },
  { year: "1995", event: "Expanded to 5 locations and introduced our signature pancakes" },
  { year: "2005", event: "Celebrated 20 years with a cookbook and menu expansion" },
  { year: "2015", event: "Launched online ordering system and loyalty program" },
  { year: "2022", event: "Opened our 20th location and refreshed our brand" }
];

const About = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
    
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-restaurant-dark mb-4 font-playfair" data-aos="fade-down">
              About Us
            </h1>
            <div className="h-1 w-24 bg-restaurant-primary mx-auto" data-aos="fade-up" data-aos-delay="100"></div>
            <p className="mt-6 text-lg text-gray-700 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="200">
              Discover our story, our values, and the people who make Franks special
            </p>
          </div>
          
          {/* Our Story Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div data-aos="fade-right">
              <h2 className="text-3xl font-bold text-restaurant-dark mb-6 font-playfair">Our Story</h2>
              <div className="h-1 w-16 bg-restaurant-primary mb-6"></div>
              <p className="text-gray-700 mb-6">
                Franks was founded in 1985 with a simple mission: to serve delicious, 
                home-style meals in a warm and welcoming environment. What started as a small 
                family diner has grown into a beloved restaurant chain with locations across the country.
              </p>
              <p className="text-gray-700 mb-6">
                Our founder, James Miller, believed that good food brings people together. This philosophy 
                continues to guide us as we grow, ensuring that every dish we serve is prepared with 
                care and the finest ingredients.
              </p>
              <p className="text-gray-700">
                Throughout the years, we've remained committed to our original values while embracing 
                innovation in our menu and service. Today, Franks is proud to be a place where 
                friends and families gather to enjoy great food and create lasting memories.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4" data-aos="fade-left">
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
          
          {/* Our Values Section */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-20" data-aos="fade-up">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-restaurant-dark mb-4 font-playfair">Our Values</h2>
              <div className="h-1 w-16 bg-restaurant-primary mx-auto mb-6"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-restaurant-accent rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-restaurant-primary"><path d="M13.73 21a2 2 0 0 1-3.46 0"></path><path d="M18.63 13A17.89 17.89 0 0 1 18 8"></path><path d="M6.26 6.26A5.86 5.86 0 0 0 6 8c0 7-3 9-3 9h14"></path><path d="M18 8a6 6 0 0 0-9.33-5"></path><path d="m1 1 22 22"></path></svg>
                </div>
                <h3 className="text-xl font-bold text-restaurant-dark mb-2 font-playfair">Quality Ingredients</h3>
                <p className="text-gray-700">
                  We source the freshest ingredients from local producers whenever possible, ensuring that every dish meets our high standards.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-restaurant-accent rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-restaurant-primary"><path d="M17 5H7V19H17V5Z"></path><path d="M11 9H13"></path><path d="M11 13H13"></path><path d="M11 17H13"></path></svg>
                </div>
                <h3 className="text-xl font-bold text-restaurant-dark mb-2 font-playfair">Exceptional Service</h3>
                <p className="text-gray-700">
                  We believe that warm hospitality and attentive service are just as important as delicious food in creating a memorable dining experience.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-restaurant-accent rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-restaurant-primary"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>
                </div>
                <h3 className="text-xl font-bold text-restaurant-dark mb-2 font-playfair">Community Focus</h3>
                <p className="text-gray-700">
                  We're committed to giving back to the communities we serve through partnerships with local charities and sustainable business practices.
                </p>
              </div>
            </div>
          </div>
          
          {/* Timeline/Milestones Section */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-restaurant-dark mb-4 font-playfair" data-aos="fade-down">Our Journey</h2>
              <div className="h-1 w-16 bg-restaurant-primary mx-auto mb-6" data-aos="fade-up"></div>
            </div>
            
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-restaurant-primary"></div>
              
              {/* Timeline Events */}
              <div className="relative">
                {MILESTONES.map((milestone, index) => (
                  <div 
                    key={milestone.year} 
                    data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
                    className={`flex flex-col md:flex-row items-center justify-between mb-16 ${
                      index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                  >
                    <div className="md:w-5/12"></div>
                    <div className="flex items-center justify-center z-10">
                      <div className="w-12 h-12 bg-restaurant-primary rounded-full flex items-center justify-center text-white font-bold">
                        {milestone.year}
                      </div>
                    </div>
                    <div className="md:w-5/12 mt-4 md:mt-0">
                      <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-bold text-restaurant-dark mb-2 font-playfair">{milestone.year}</h3>
                        <p className="text-gray-700">{milestone.event}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Team Section */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-restaurant-dark mb-4 font-playfair" data-aos="fade-down">Meet Our Team</h2>
              <div className="h-1 w-16 bg-restaurant-primary mx-auto mb-6" data-aos="fade-up"></div>
              <p className="text-lg text-gray-700 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
                The passionate individuals who work tirelessly to bring you an exceptional dining experience
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {TEAM_MEMBERS.map((member, index) => (
                <Card 
                  key={member.id}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                  className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="h-64 overflow-hidden">
                    <img 
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <CardContent className="p-6 text-center">
                    <h3 className="text-xl font-bold text-restaurant-dark mb-1 font-playfair">{member.name}</h3>
                    <p className="text-restaurant-primary font-medium mb-3">{member.role}</p>
                    <p className="text-gray-600 text-sm">{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          {/* Join Us CTA */}
          <div className="rounded-lg overflow-hidden relative" data-aos="fade-up">
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ 
                backgroundImage: "url('https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?q=80&w=2070&auto=format&fit=crop')", 
                filter: 'brightness(0.4)'
              }}
            ></div>
            
            <div className="relative py-16 px-8 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-playfair">Join Our Team</h2>
              <p className="text-xl text-gray-200 max-w-2xl mx-auto mb-8">
                We're always looking for passionate individuals to join our growing family. 
                Check out our current openings and become part of our story.
              </p>
              <Button size="lg" className="bg-restaurant-primary hover:bg-restaurant-primary/90 text-lg px-8">
                View Career Opportunities
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default About;
