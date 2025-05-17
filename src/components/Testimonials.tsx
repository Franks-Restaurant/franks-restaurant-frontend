import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const TESTIMONIALS = [
  {
    id: 1,
    name: "Sarah Johnson",
    rating: 5,
    comment: "The best breakfast I've ever had! The pancakes were fluffy, and the service was outstanding.",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    id: 2,
    name: "Michael Smith",
    rating: 5,
    comment: "My family loves coming here for dinner. Great food, reasonable prices, and friendly staff.",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    id: 3,
    name: "Jennifer Davis",
    rating: 5,
    comment: "We had our anniversary dinner here and it was perfect. The steak was cooked to perfection!",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
  },
  {
    id: 4,
    name: "Robert Wilson",
    rating: 4,
    comment: "Love the atmosphere and the desserts are to die for! Will definitely be coming back soon.",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
  },
  {
    id: 5,
    name: "Amanda Garcia",
    rating: 5,
    comment: "The online ordering was so easy to use, and the food arrived hot and delicious. 10/10!",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
  }
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-restaurant-accent">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16" data-aos="fade-down">
          <h2 className="text-3xl md:text-5xl font-bold text-restaurant-dark mb-4 font-playfair">What Our Customers Say</h2>
          <div className="h-1 w-24 bg-restaurant-primary mx-auto"></div>
          <p className="mt-6 text-lg text-gray-700 max-w-2xl mx-auto">
            We take pride in serving our customers and value their feedback
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative min-h-[300px] overflow-hidden">
            {TESTIMONIALS.map((testimonial, index) => (
              <Card
                key={testimonial.id}
                className={`
                  absolute w-full transition-all duration-700 ease-in-out transform
                  ${index === activeIndex
                    ? 'opacity-100 scale-100 z-10'
                    : 'opacity-0 scale-95 pointer-events-none z-0'}
                  shadow-lg border-none
                `}
              >
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                    <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                      <p className="text-gray-700 text-lg italic mb-4">"{testimonial.comment}"</p>
                      <p className="font-bold text-restaurant-dark">{testimonial.name}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 flex justify-center space-x-2 pt-16 md:pt-12">
            {TESTIMONIALS.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeIndex ? 'bg-restaurant-primary w-6' : 'bg-gray-300'
                }`}
                onClick={() => setActiveIndex(index)}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
