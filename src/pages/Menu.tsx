
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Star, Clock } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useCart } from '@/contexts/CartContext';
import TableBooking from '@/components/TableBooking';
import { toast } from 'sonner';

const MENU_CATEGORIES = [
  { id: "breakfast", name: "Breakfast" },
  { id: "lunch", name: "Lunch" },
  { id: "dinner", name: "Dinner" },
  { id: "desserts", name: "Desserts" },
  { id: "beverages", name: "Beverages" },
];

const MENU_ITEMS = {
  breakfast: [
    {
      id: 1,
      name: "Classic Pancakes",
      description: "Fluffy pancakes served with maple syrup, butter, and your choice of toppings.",
      price: "$9.99",
      image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?q=80&w=2080&auto=format&fit=crop",
      dietary: ["Vegetarian"]
    },
    {
      id: 2,
      name: "Eggs Benedict",
      description: "Poached eggs and Canadian bacon on English muffins topped with hollandaise sauce.",
      price: "$12.99",
      image: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?q=80&w=1974&auto=format&fit=crop"
    },
    {
      id: 3,
      name: "Avocado Toast",
      description: "Toasted artisan bread topped with smashed avocado, poached eggs, and microgreens.",
      price: "$11.99",
      image: "https://images.unsplash.com/photo-1603046891744-1f76eb10aec3?q=80&w=1974&auto=format&fit=crop",
      dietary: ["Vegetarian"]
    },
    {
      id: 4,
      name: "Breakfast Burrito",
      description: "Scrambled eggs, chorizo, black beans, cheese, and pico de gallo in a flour tortilla.",
      price: "$10.99",
      image: "https://images.unsplash.com/photo-1606851094291-6efae152bb87?q=80&w=1974&auto=format&fit=crop"
    },
    {
      id: 5,
      name: "Belgian Waffles",
      description: "Light and crispy waffles topped with fresh berries, whipped cream, and powdered sugar.",
      price: "$10.99",
      image: "https://images.unsplash.com/photo-1598214886806-c87b84b7078b?q=80&w=1925&auto=format&fit=crop",
      dietary: ["Vegetarian"]
    },
    {
      id: 6,
      name: "Granola Bowl",
      description: "House-made granola with Greek yogurt, fresh fruit, and honey drizzle.",
      price: "$8.99",
      image: "https://images.unsplash.com/photo-1620807773206-49c1f2957417?q=80&w=1974&auto=format&fit=crop",
      dietary: ["Vegetarian"]
    }
  ],
  lunch: [
    {
      id: 7,
      name: "Grilled Chicken Sandwich",
      description: "Grilled chicken breast with lettuce, tomato, and avocado on a brioche bun.",
      price: "$13.99",
      image: "https://images.unsplash.com/photo-1521305916504-4a1121188589?q=80&w=1980&auto=format&fit=crop"
    },
    {
      id: 8,
      name: "Classic Burger",
      description: "Juicy beef patty with cheese, lettuce, tomato, and our special sauce.",
      price: "$12.99",
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1999&auto=format&fit=crop"
    },
    {
      id: 9,
      name: "Caesar Salad",
      description: "Crisp romaine lettuce with parmesan, croutons, and our house Caesar dressing.",
      price: "$9.99",
      image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?q=80&w=1974&auto=format&fit=crop",
      dietary: ["Vegetarian"]
    }
  ],
  dinner: [
    {
      id: 10,
      name: "Grilled Salmon",
      description: "Fresh salmon fillet grilled to perfection, served with seasonal vegetables.",
      price: "$19.99",
      image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: 11,
      name: "Ribeye Steak",
      description: "12oz prime ribeye steak cooked to your preference with garlic mashed potatoes.",
      price: "$26.99",
      image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: 12,
      name: "Penne Arrabbiata",
      description: "Penne pasta in a spicy tomato sauce with garlic and fresh basil.",
      price: "$14.99",
      image: "https://images.unsplash.com/photo-1608219992759-8d74ed8d76eb?q=80&w=1974&auto=format&fit=crop",
      dietary: ["Vegetarian"]
    }
  ],
  desserts: [
    {
      id: 13,
      name: "Chocolate Cake",
      description: "Rich chocolate layer cake with ganache frosting and fresh berries.",
      price: "$8.99",
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1989&auto=format&fit=crop",
      dietary: ["Vegetarian"]
    },
    {
      id: 14,
      name: "New York Cheesecake",
      description: "Creamy classic cheesecake with a graham cracker crust and berry compote.",
      price: "$7.99",
      image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=2070&auto=format&fit=crop",
      dietary: ["Vegetarian"]
    }
  ],
  beverages: [
    {
      id: 15,
      name: "Fresh Fruit Smoothie",
      description: "Blended seasonal fruits with yogurt and honey.",
      price: "$5.99",
      image: "https://images.unsplash.com/photo-1553530666-3d9d9f5d289e?q=80&w=2062&auto=format&fit=crop",
      dietary: ["Vegetarian"]
    },
    {
      id: 16,
      name: "Iced Coffee",
      description: "Cold brewed coffee served over ice with your choice of milk and flavoring.",
      price: "$4.99",
      image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=1969&auto=format&fit=crop",
      dietary: ["Vegetarian"]
    }
  ]
};

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState("breakfast");
  const { addItem } = useCart();

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      mirror: true,
    });
    window.scrollTo(0, 0);
  }, []);

  const popularItems = MENU_ITEMS.breakfast.slice(0, 3).concat(
    MENU_ITEMS.lunch.slice(0, 2),
    MENU_ITEMS.dinner.slice(0, 1)
  );

  const handleAddToCart = (item: any) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image
    });
    toast.success(`Added ${item.name} to cart`, {
      description: 'Go to cart to complete your order'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 
              className="text-5xl md:text-7xl font-bold text-restaurant-dark mb-6 font-playfair"
              data-aos="fade-down"
            >
              Our Menu
            </h1>
            <div 
              className="h-1 w-32 bg-restaurant-primary mx-auto"
              data-aos="fade-up" 
              data-aos-delay="100"
            ></div>
            <p 
              className="mt-8 text-xl text-gray-700 max-w-3xl mx-auto"
              data-aos="fade-up" 
              data-aos-delay="200"
            >
              Discover our chef-crafted dishes made with fresh ingredients and passion
            </p>
          </div>

          <div className="mb-20" data-aos="fade-up" data-aos-delay="300">
            <h2 className="text-3xl font-bold text-restaurant-dark mb-8 text-center font-playfair">
              Most Popular Dishes
            </h2>
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full max-w-6xl mx-auto"
            >
              <CarouselContent>
                {popularItems.map((item, index) => (
                  <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-2">
                      <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300">
                        <div className="relative h-64 overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-4 right-4 flex gap-2">
                            <Badge variant="secondary" className="bg-white/90">
                              <Star className="h-4 w-4 mr-1 text-yellow-500" />
                              Popular
                            </Badge>
                          </div>
                        </div>
                        <CardContent className="p-6">
                          <h3 className="text-xl font-bold text-restaurant-dark font-playfair">{item.name}</h3>
                          <p className="text-gray-600 mt-2 text-sm">{item.description}</p>
                          <div className="flex justify-between items-center mt-4">
                            <span className="text-restaurant-primary font-bold text-lg">{item.price}</span>
                            <Button 
                              size="sm"
                              className="bg-restaurant-secondary hover:bg-restaurant-secondary/90"
                              onClick={() => handleAddToCart(item)}
                            >
                              Add to Cart
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="hidden md:block">
                <CarouselPrevious className="-left-12" />
                <CarouselNext className="-right-12" />
              </div>
            </Carousel>
          </div>

          <Tabs defaultValue={activeCategory} onValueChange={setActiveCategory} className="w-full">
            <div className="flex justify-center mb-12" data-aos="fade-up">
              <TabsList className="bg-white/80 backdrop-blur-sm shadow-lg p-1 rounded-lg">
                {MENU_CATEGORIES.map(category => (
                  <TabsTrigger 
                    key={category.id} 
                    value={category.id}
                    className="data-[state=active]:bg-restaurant-primary data-[state=active]:text-white px-6 py-2"
                  >
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            
            {MENU_CATEGORIES.map(category => (
              <TabsContent key={category.id} value={category.id} className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {MENU_ITEMS[category.id].map((item, index) => (
                    <Card 
                      key={item.id}
                      data-aos="fade-up"
                      data-aos-delay={index * 100}
                      className="group overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <div className="relative h-64 overflow-hidden">
                        <img 
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {item.dietary && (
                          <div className="absolute top-4 left-4 flex gap-2">
                            {item.dietary.map((diet) => (
                              <Badge key={diet} variant="secondary" className="bg-white/90">
                                {diet}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                      
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-bold text-restaurant-dark font-playfair group-hover:text-restaurant-primary transition-colors">
                            {item.name}
                          </h3>
                          <span className="text-restaurant-primary font-bold text-lg">{item.price}</span>
                        </div>
                        
                        <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                        
                        <Button 
                          className="w-full bg-restaurant-secondary hover:bg-restaurant-secondary/90 transition-all duration-300 group-hover:translate-y-[-2px]"
                          onClick={() => handleAddToCart(item)}
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" /> Add to Cart
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
          
          <div className="mt-16 text-center" data-aos="fade-up">
            <div className="max-w-2xl mx-auto bg-restaurant-accent p-8 rounded-lg shadow-lg">
              <Clock className="w-8 h-8 text-restaurant-primary mx-auto mb-4" />
              <p className="text-gray-700 mb-6">
                Have dietary restrictions or allergies? Please inform our staff when placing your order.
                Our kitchen can accommodate most dietary requirements with advance notice.
              </p>
              <TableBooking 
                customButton={
                  <Button className="bg-restaurant-primary hover:bg-restaurant-primary/90 text-lg px-8" size="lg">
                    Book a Table
                  </Button>
                }
              />
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Menu;
