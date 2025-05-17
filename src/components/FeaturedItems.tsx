
// import React, { useEffect } from 'react';
// import { Card, CardContent, CardFooter } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { useNavigate } from 'react-router-dom';
// import { useCart } from '@/contexts/CartContext';
// import { toast } from 'sonner';
// import AOS from 'aos';
// import 'aos/dist/aos.css';
// import { fetchPublicMenuAction } from '@/store/actions/publicMenu.action';
// import { useDispatch, useSelector } from 'react-redux';
// import { AppDispatch, RootState } from '@/store';

// const FEATURED_ITEMS = [
//   {
//     id: 1,
//     name: "Signature Breakfast",
//     description: "Fluffy pancakes, eggs, bacon, and hash browns served with fresh orange juice.",
//     price: "$14.99",
//     image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?q=80&w=2070&auto=format&fit=crop",
//     category: "Breakfast"
//   },
//   {
//     id: 2,
//     name: "Classic Burger",
//     description: "Juicy beef patty with cheese, lettuce, tomato, and our special sauce.",
//     price: "$12.99",
//     image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1999&auto=format&fit=crop",
//     category: "Lunch"
//   },
//   {
//     id: 3,
//     name: "Grilled Salmon",
//     description: "Fresh salmon fillet grilled to perfection, served with seasonal vegetables.",
//     price: "$19.99",
//     image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=2070&auto=format&fit=crop",
//     category: "Dinner"
//   },
//   {
//     id: 4,
//     name: "Chocolate Cake",
//     description: "Rich chocolate layer cake with ganache frosting and fresh berries.",
//     price: "$8.99",
//     image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1989&auto=format&fit=crop",
//     category: "Dessert"
//   }
// ];

// const FeaturedItems = () => {

//   const dispatch = useDispatch<AppDispatch>();
//   const { menu,loading } = useSelector((state: RootState) => state.userMenu);

//   useEffect(()=>{
//     dispatch(fetchPublicMenuAction())
//   },[])
  
//   const navigate = useNavigate();
//   const { addItem } = useCart();

//   useEffect(() => {
//     AOS.init({
//       duration: 800,
//       once: true,
//     });
//   }, []);

//   const handleAddToCart = (item) => {
//     addItem({
//       id: item.id,
//       name: item.name,
//       price: item.price,
//       image: item.image
//     });
//     toast.success(`Added ${item.name} to cart`);
//   };

//   const handleViewFullMenu = () => {
//     navigate('/menu');
//   };

//   return (
//     <section id="featured" className="py-20 bg-restaurant-accent">
//       <div className="container mx-auto px-4">
//         <div className="text-center mb-16">
//           <h2 className="text-3xl md:text-5xl font-bold text-restaurant-dark mb-4 font-playfair">Featured Menu Items</h2>
//           <div className="h-1 w-24 bg-restaurant-primary mx-auto"></div>
//           <p className="mt-6 text-lg text-gray-700 max-w-2xl mx-auto">
//             Explore our most popular dishes, crafted with fresh ingredients and served with passion
//           </p>
//         </div>
        
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//           {FEATURED_ITEMS.map((item, index) => (
//             <Card 
//               key={item.id}
//               data-aos="fade-up"
//               data-aos-delay={index * 100}
//               className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 group"
//             >
//               <div className="h-64 overflow-hidden">
//                 <img 
//                   src={item.image}
//                   alt={item.name}
//                   className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//                 />
//               </div>
//               <div className="absolute top-4 right-4 bg-restaurant-primary text-white px-3 py-1 rounded-full text-sm font-medium">
//                 {item.category}
//               </div>
//               <CardContent className="pt-6">
//                 <h3 className="text-xl font-bold text-restaurant-dark mb-2 font-playfair">{item.name}</h3>
//                 <p className="text-gray-600 mb-2">{item.description}</p>
//                 <p className="text-restaurant-primary font-bold text-xl">{item.price}</p>
//               </CardContent>
//               <CardFooter className="pt-0 flex gap-2">
//                 <Button 
//                   className="flex-1 bg-restaurant-secondary hover:bg-restaurant-secondary/90"
//                   onClick={() => handleAddToCart(item)}
//                 >
//                   Add to Cart
//                 </Button>
//                 <Button 
//                   variant="outline" 
//                   className="flex-1" 
//                   onClick={() => navigate('/menu')}
//                 >
//                   Details
//                 </Button>
//               </CardFooter>
//             </Card>
//           ))}
//         </div>
        
//         <div className="text-center mt-12">
//           <Button 
//             className="bg-restaurant-primary hover:bg-restaurant-primary/90 text-lg px-8" 
//             size="lg"
//             onClick={handleViewFullMenu}
//           >
//             View Full Menu
//           </Button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FeaturedItems;

import React, { useEffect } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { fetchPublicMenuAction } from '@/store/actions/publicMenu.action';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';

const FeaturedItems = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { menu, loading } = useSelector((state: RootState) => state.userMenu);

  const navigate = useNavigate();
  const { addItem } = useCart();

  useEffect(() => {
    dispatch(fetchPublicMenuAction());
  }, [dispatch]);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const handleAddToCart = (item: any) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
    });
    toast.success(`Added ${item.name} to cart`);
  };

  const handleViewFullMenu = () => {
    navigate('/menu');
  };

  // Collect first item from each category
  const featuredItems = Object.entries(menu).flatMap(([category, items]) => {
    if (items && items.length > 0) {
      return [{ ...items[0], category }];
    }
    return [];
  });

  return (
    <section id="featured" className="py-20 bg-restaurant-accent">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-restaurant-dark mb-4 font-playfair">
            Featured Menu Items
          </h2>
          <div className="h-1 w-24 bg-restaurant-primary mx-auto"></div>
          <p className="mt-6 text-lg text-gray-700 max-w-2xl mx-auto">
            Explore our most popular dishes, crafted with fresh ingredients and served with passion.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredItems.map((item, index) => (
            <Card
              key={item.id}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <div className="h-64 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="absolute top-4 right-4 bg-restaurant-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                {item.category}
              </div>
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold text-restaurant-dark mb-2 font-playfair">{item.name}</h3>
                <p className="text-gray-600 mb-2">{item.description}</p>
                <p className="text-restaurant-primary font-bold text-xl">{item.price}</p>
              </CardContent>
              <CardFooter className="pt-0 flex gap-2">
                <Button
                  className="flex-1 bg-restaurant-secondary hover:bg-restaurant-secondary/90"
                  onClick={() => handleAddToCart(item)}
                >
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => navigate('/menu')}
                >
                  Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            className="bg-restaurant-primary hover:bg-restaurant-primary/90 text-lg px-8"
            size="lg"
            onClick={handleViewFullMenu}
          >
            View Full Menu
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedItems;

