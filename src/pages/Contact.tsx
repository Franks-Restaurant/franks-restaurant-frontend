
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  CheckCircle, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Smartphone, 
  FacebookIcon,
  InstagramIcon,
  TwitterIcon
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useToast } from "@/hooks/use-toast";

const FAQ_ITEMS = [
  {
    question: "What are your opening hours?",
    answer: "Our restaurants are generally open from 7 AM to 10 PM Monday through Saturday, and 8 AM to 9 PM on Sundays. However, hours may vary by location. Please check our Locations page for specific hours."
  },
  {
    question: "Do you offer vegetarian options?",
    answer: "Yes, we offer a variety of vegetarian options on our menu. These items are clearly marked with a 'Vegetarian' label on both our in-restaurant and online menus."
  },
  {
    question: "How can I book a large party or event?",
    answer: "For large parties or events, we recommend booking at least one week in advance. You can do this by filling out our reservation form online or by calling your preferred location directly. For parties of 10 or more, please contact our events team at events@villagedine.com."
  },
  {
    question: "Do you offer takeout and delivery?",
    answer: "Yes, most of our locations offer both takeout and delivery options. You can place orders through our website, mobile app, or by calling the restaurant directly."
  },
  {
    question: "Do I need a reservation?",
    answer: "Reservations are recommended, especially during peak hours, but not required. Walk-ins are always welcome, and we'll do our best to accommodate you as quickly as possible."
  },
  {
    question: "Is there a dress code?",
    answer: "We have a casual dining atmosphere. While we don't enforce a strict dress code, we appreciate neat, clean attire."
  }
];

const Contact = () => {
  const { toast } = useToast();
  
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
    
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent",
      description: "Thank you for your message. We'll respond as soon as possible.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-restaurant-dark mb-4 font-playfair" data-aos="fade-down">
              Contact Us
            </h1>
            <div className="h-1 w-24 bg-restaurant-primary mx-auto" data-aos="fade-up" data-aos-delay="100"></div>
            <p className="mt-6 text-lg text-gray-700 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="200">
              We'd love to hear from you. Whether you have a question, feedback, or want to make a reservation,
              our team is here to help.
            </p>
          </div>
          
          {/* Contact Information Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <Card 
              className="border-none shadow-lg hover:shadow-xl transition-all duration-300" 
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <CardContent className="flex flex-col items-center text-center p-6">
                <div className="bg-restaurant-primary text-white p-3 rounded-full mb-4">
                  <Phone className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-restaurant-dark mb-2 font-playfair">Phone</h3>
                <p className="text-gray-700">General Inquiries</p>
                <p className="text-restaurant-primary font-medium">(555) 123-4567</p>
              </CardContent>
            </Card>
            
            <Card 
              className="border-none shadow-lg hover:shadow-xl transition-all duration-300" 
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <CardContent className="flex flex-col items-center text-center p-6">
                <div className="bg-restaurant-primary text-white p-3 rounded-full mb-4">
                  <Mail className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-restaurant-dark mb-2 font-playfair">Email</h3>
                <p className="text-gray-700">Customer Service</p>
                <p className="text-restaurant-primary font-medium">info@villagedine.com</p>
              </CardContent>
            </Card>
            
            <Card 
              className="border-none shadow-lg hover:shadow-xl transition-all duration-300" 
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <CardContent className="flex flex-col items-center text-center p-6">
                <div className="bg-restaurant-primary text-white p-3 rounded-full mb-4">
                  <MapPin className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-restaurant-dark mb-2 font-playfair">Headquarters</h3>
                <p className="text-gray-700">123 Main Street</p>
                <p className="text-gray-700">City Center, ST 10001</p>
              </CardContent>
            </Card>
            
            <Card 
              className="border-none shadow-lg hover:shadow-xl transition-all duration-300" 
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <CardContent className="flex flex-col items-center text-center p-6">
                <div className="bg-restaurant-primary text-white p-3 rounded-full mb-4">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-restaurant-dark mb-2 font-playfair">Office Hours</h3>
                <p className="text-gray-700">Monday - Friday</p>
                <p className="text-restaurant-primary font-medium">9:00 AM - 5:00 PM</p>
              </CardContent>
            </Card>
          </div>
          
          {/* Contact Form and Info Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            <div data-aos="fade-right">
              <Card className="border-none shadow-lg h-full">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold text-restaurant-dark mb-6 font-playfair">Send Us a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name
                        </label>
                        <Input 
                          id="name" 
                          placeholder="Your name" 
                          required 
                          className="w-full"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address
                        </label>
                        <Input 
                          id="email" 
                          type="email" 
                          placeholder="Your email" 
                          required 
                          className="w-full"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number (Optional)
                      </label>
                      <Input 
                        id="phone"
                        type="tel" 
                        placeholder="Your phone number" 
                        className="w-full"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                        Subject
                      </label>
                      <Input 
                        id="subject" 
                        placeholder="How can we help?" 
                        required 
                        className="w-full"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        Message
                      </label>
                      <Textarea 
                        id="message" 
                        placeholder="Write your message here..." 
                        rows={5} 
                        required 
                        className="w-full"
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-restaurant-primary hover:bg-restaurant-primary/90 text-lg"
                      size="lg"
                    >
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
            
            <div data-aos="fade-left">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-restaurant-dark mb-6 font-playfair">Connect With Us</h2>
                <p className="text-gray-700 mb-6">
                  Have a question, comment, or special request? We're here to help. 
                  You can reach us through any of the channels below, and our team will get back to you as soon as possible.
                </p>
                
                <div className="flex items-center mb-4">
                  <Smartphone className="text-restaurant-primary mr-3" />
                  <span>Download our mobile app for easy ordering on the go</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <Button className="bg-gray-900 hover:bg-gray-800">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 mr-2" fill="currentColor">
                      <path d="M17.05 20.28c-.98.95-2.05.88-3.08.5-1.09-.4-2.06-.32-3.19.08-1.38.5-2.35.32-3.25-.5-2.33-2.33-2.33-6.43 0-8.77 1.67-1.33 3.5-1.33 5.03 0 .71.71 1.3.69 1.98 0 .81-.81 1.95-1.36 3.05-.96 1.45.57 2.17 1.76 2.53 3.08-2.07.74-2.36 2.89-.47 4.08 1.47.93 1.61 2.1.4 3.49zm-3.84-10.06c-.48-1.45-2.12-2.57-3.71-2.4-.07-1.25.62-2.47 1.71-3.14 1.26-.78 2.73-.61 3.82-.01 1.46.78 2.25 2.31 1.85 3.89-1.25.05-2.4.67-3.23 1.45.08.17.18.32.25.51.24.6.31-.09.31-.3z"/>
                    </svg>
                    App Store
                  </Button>
                  <Button className="bg-green-700 hover:bg-green-800">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 mr-2" fill="currentColor">
                      <path d="M3.79 2.4c-.58.34-.95.96-.95 1.69v15.8c0 .73.37 1.35.95 1.7l.07.04 8.9-8.9v-.17l-8.9-8.9-.07.04z"/>
                      <path fill="#febd01" d="M15.96 11.53l-3.2-3.2-8.92 8.92c.32.26.71.39 1.12.39.41 0 .82-.15 1.14-.41l9.86-5.7"/>
                      <path fill="#cd3729" d="M20.55 8.38l-4.59-2.64-3.21 3.21 3.21 3.2 4.59-2.64c.61-.35.61-.93 0-1.28.01 0 .01 0 0-.05z"/>
                      <path fill="#019f53" d="M4.1 21.8c.41 0 .82-.15 1.14-.41l9.86-5.7-3.2-3.2-8.92 8.92c.32.26.71.39 1.12.39z"/>
                    </svg>
                    Google Play
                  </Button>
                </div>
                
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-restaurant-dark mb-3 font-playfair">Follow Us</h3>
                  <p className="text-gray-700 mb-4">
                    Stay updated with our latest news, promotions, and events by following us on social media.
                  </p>
                  <div className="flex space-x-4">
                    <a href="#" className="bg-restaurant-primary text-white p-2 rounded-full hover:bg-restaurant-primary/80 transition-colors">
                      <FacebookIcon className="w-5 h-5" />
                    </a>
                    <a href="#" className="bg-restaurant-primary text-white p-2 rounded-full hover:bg-restaurant-primary/80 transition-colors">
                      <InstagramIcon className="w-5 h-5" />
                    </a>
                    <a href="#" className="bg-restaurant-primary text-white p-2 rounded-full hover:bg-restaurant-primary/80 transition-colors">
                      <TwitterIcon className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
              
              <Card className="border-none shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-restaurant-dark mb-3 font-playfair">Newsletter</h3>
                  <p className="text-gray-700 mb-4">
                    Subscribe to our newsletter for the latest updates, promotions, and special offers.
                  </p>
                  <form className="flex space-x-3">
                    <Input 
                      type="email" 
                      placeholder="Your email address" 
                      required
                      className="flex-1"
                    />
                    <Button 
                      type="submit"
                      className="bg-restaurant-secondary hover:bg-restaurant-secondary/90"
                    >
                      Subscribe
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* FAQ Section */}
          <div data-aos="fade-up">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-restaurant-dark mb-4 font-playfair">Frequently Asked Questions</h2>
              <div className="h-1 w-16 bg-restaurant-primary mx-auto mb-6"></div>
              <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                Find answers to our most commonly asked questions. If you can't find what you're looking for,
                feel free to contact us directly.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <div className="space-y-6">
                {FAQ_ITEMS.map((item, index) => (
                  <Card key={index} className="border-none shadow-lg">
                    <CardContent className="p-6">
                      <h4 className="text-lg font-bold text-restaurant-dark mb-3 font-playfair">
                        {item.question}
                      </h4>
                      <p className="text-gray-700">
                        {item.answer}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="mt-8 text-center">
                <p className="text-gray-700 mb-4">
                  Don't see your question here? Feel free to reach out to us directly.
                </p>
                <Button className="bg-restaurant-primary hover:bg-restaurant-primary/90">
                  Ask a Question
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Contact;
