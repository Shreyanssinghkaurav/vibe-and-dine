import React, { useState } from 'react';
import type { Restaurant, User, DishCategory } from '../types';
import { PlusCircle, Pencil, Trash2, Phone, Mail, MapPin, Calendar } from 'lucide-react';

interface RestaurantCardProps {
  restaurant: Restaurant;
  currentUser: User | null;
  onAddDish: (restaurantId: string) => void;
  onEditRestaurant: (restaurant: Restaurant) => void;
  onDeleteRestaurant: (restaurantId: string) => void;
  onEditDish: (restaurantId: string, dish: Restaurant['dishes'][0]) => void;
  onDeleteDish: (restaurantId: string, dishId: string) => void;
  onBookTimeSlot: (restaurantId: string, slotId: string) => void;
  onCancelBooking: (restaurantId: string, slotId: string) => void;
}

export function RestaurantCard({
  restaurant,
  currentUser,
  onAddDish,
  onEditRestaurant,
  onDeleteRestaurant,
  onEditDish,
  onDeleteDish,
  onBookTimeSlot,
  onCancelBooking,
}: RestaurantCardProps) {
  const isAdmin = currentUser?.role === 'admin';
  const [selectedCategory, setSelectedCategory] = useState<DishCategory>('all');

  const filteredDishes = restaurant.dishes.filter(dish => 
    selectedCategory === 'all' ? true : dish.category === selectedCategory
  );

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <img
        src={restaurant.image}
        alt={restaurant.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-semibold">{restaurant.name}</h3>
            <p className="text-gray-600">{restaurant.description}</p>
            <div className="mt-3 space-y-2">
              <div className="flex items-center gap-2 text-gray-600">
                <Phone size={16} />
                <span>{restaurant.contact.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Mail size={16} />
                <span>{restaurant.contact.email}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin size={16} />
                <span>{restaurant.contact.address}</span>
              </div>
            </div>
          </div>
          {isAdmin && (
            <div className="flex gap-2">
              <button
                onClick={() => onEditRestaurant(restaurant)}
                className="flex items-center gap-2 px-3 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
              >
                <Pencil size={18} />
                Edit
              </button>
              <button
                onClick={() => onDeleteRestaurant(restaurant.id)}
                className="flex items-center gap-2 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <Trash2 size={18} />
                Delete
              </button>
              <button
                onClick={() => onAddDish(restaurant.id)}
                className="flex items-center gap-2 px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <PlusCircle size={18} />
                Add Dish
              </button>
            </div>
          )}
        </div>

        {/* Time Slots */}
        <div className="mt-6">
          <h4 className="text-lg font-medium mb-3">Available Time Slots</h4>
          <div className="grid grid-cols-3 gap-3">
            {restaurant.timeSlots.map((slot) => (
              <button
                key={slot.id}
                onClick={() => 
                  slot.isBooked && slot.bookedBy === currentUser?._id
                    ? onCancelBooking(restaurant.id, slot.id)
                    : onBookTimeSlot(restaurant.id, slot.id)
                }
                disabled={slot.isBooked && slot.bookedBy !== currentUser?._id}
                className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg ${
                  slot.isBooked
                    ? slot.bookedBy === currentUser?._id
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
                }`}
              >
                <Calendar size={16} />
                {slot.time}
              </button>
            ))}
          </div>
        </div>
        
        <div className="mt-6 space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="text-lg font-medium">Menu</h4>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-lg ${
                  selectedCategory === 'all'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedCategory('veg')}
                className={`px-4 py-2 rounded-lg ${
                  selectedCategory === 'veg'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                }`}
              >
                Veg
              </button>
              <button
                onClick={() => setSelectedCategory('non-veg')}
                className={`px-4 py-2 rounded-lg ${
                  selectedCategory === 'non-veg'
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                }`}
              >
                Non-Veg
              </button>
            </div>
          </div>
          {filteredDishes.map((dish) => (
            <div key={dish.id} className="border-t pt-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">{dish.name}</h4>
                  <p className="text-sm text-gray-600">{dish.description}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      dish.category === 'veg' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {dish.category === 'veg' ? 'Vegetarian' : 'Non-Vegetarian'}
                    </span>
                    <span className="px-2 py-1 bg-gray-100 rounded-full text-sm text-gray-600 capitalize">
                      {dish.cuisine}
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="font-medium">₹{dish.price}</span>
                  {isAdmin && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => onEditDish(restaurant.id, dish)}
                        className="text-amber-600 hover:text-amber-700"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => onDeleteDish(restaurant.id, dish.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}