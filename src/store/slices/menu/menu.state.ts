export interface MenuItem {
  _id: number | string;
    name: string;
    description: string;
    price: string | number;
    category: string;
    session: string;
    restaurant: string;
    image: string;
  }
  
  export interface MenuItemState {
    items: MenuItem[];
    loading: boolean;
    error?: string;
  }