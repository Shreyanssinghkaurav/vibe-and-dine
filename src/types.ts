export type Cuisine = 'italian' | 'indian' | 'japanese' | 'mexican' | 'american' | 'chinese' | 'street-food';
export type DietaryRestriction = 'vegan' | 'vegetarian' | 'non-vegetarian' | 'gluten-free' | 'dairy-free' | 'none';
export type UserRole = 'admin' | 'user';
export type DishCategory = 'veg' | 'non-veg' | 'all';

export interface User {
  _id: string;
  username: string;
  password: string;
  role: UserRole;
}

export interface TimeSlot {
  id: string;
  time: string;
  isBooked: boolean;
  bookedBy?: string;
}

export interface Dish {
  id: string;
  name: string;
  price: number;
  description: string;
  cuisine: Cuisine;
  category: DishCategory;
  dietaryRestrictions: DietaryRestriction[];
  restaurantId: string;
}

export interface Restaurant {
  id: string;
  name: string;
  image: string;
  description: string;
  dishes: Dish[];
  contact: {
    phone: string;
    email: string;
    address: string;
  };
  timeSlots: TimeSlot[];
}