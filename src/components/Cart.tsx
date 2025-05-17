
import React, { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from '@/components/ui/sheet';
import { ShoppingCart, Plus, Minus, Trash } from 'lucide-react';
import { toast } from 'sonner';

const Cart = () => {
  const { items, totalItems, updateQuantity, removeItem, clearCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const total = items.reduce(
    (sum, item) => sum + (parseFloat(item.price.replace('$', '')) * item.quantity),
    0
  );

  const handleCheckout = () => {
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    
    toast.success("Order placed successfully!", {
      description: `Your order for ${totalItems} item(s) has been placed.`
    });
    clearCart();
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative bg-white hover:bg-gray-50 border-none">
          <ShoppingCart className="h-5 w-5" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-restaurant-primary text-white text-xs flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[90vw] sm:max-w-md flex flex-col">
        <SheetHeader className="border-b pb-4">
          <SheetTitle className="text-xl font-playfair">Your Cart</SheetTitle>
        </SheetHeader>
        
        <div className="flex-grow overflow-auto py-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-10">
              <ShoppingCart className="h-16 w-16 text-gray-300 mb-4" />
              <p className="text-gray-500 font-medium text-lg">Your cart is empty</p>
              <p className="text-gray-400 mt-2">Add items from our menu to get started</p>
              <Button 
                className="mt-6 bg-restaurant-primary"
                onClick={() => {
                  setIsOpen(false);
                  window.location.href = '/menu';
                }}
              >
                Browse Menu
              </Button>
            </div>
          ) : (
            <div className="space-y-5">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 pb-5 border-b border-gray-100">
                  <div className="w-20 h-20 relative overflow-hidden rounded-md flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-medium">{item.name}</h3>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-gray-400 hover:text-red-500"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-restaurant-primary font-medium mt-1">{item.price}</p>
                    <div className="flex items-center gap-2 mt-3">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-full"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-full"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {items.length > 0 && (
          <SheetFooter className="border-t pt-4 flex-col gap-4">
            <div className="flex justify-between text-lg font-semibold">
              <span>Total:</span>
              <span className="text-restaurant-primary">${total.toFixed(2)}</span>
            </div>
            
            <div className="grid gap-2">
              <Button 
                className="w-full bg-restaurant-primary hover:bg-restaurant-primary/90"
                onClick={handleCheckout}
              >
                Complete Order
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => clearCart()}
              >
                Clear Cart
              </Button>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
