import React, { useState } from 'react';
import { AuthForms } from './components/AuthForms';
import { RestaurantCard } from './components/RestaurantCard';
import { AddRestaurantForm } from './components/AddRestaurantForm';
import { AddDishForm } from './components/AddDishForm';
import { Filters } from './components/Filters';
import type { Restaurant, User, Dish, Cuisine, DietaryRestriction } from './types';
import { PlusCircle, LogOut } from 'lucide-react';

const mockRestaurants: Restaurant[] = [
  {
    id: '2',
    name: 'Pizza Bakers',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGl6emF8ZW58MHx8MHx8fDA%3D',
    description: 'Delicious pizzas with fresh ingredients',
    contact: {
      phone: '+91 73000 42775',
      email: 'contact@pizzabakers.com',
      address: 'Near B1'
    },
    dishes: [
      { id: '2', name: 'MARGHERITA CHEESE', price: 239, description: 'Classic cheese pizza', cuisine: 'italian', category: 'veg', dietaryRestrictions: ['vegetarian'], restaurantId: '2' },
      { id: '3', name: 'CHEESE & TOMATO', price: 239, description: 'Cheese and fresh tomato topping', cuisine: 'italian', category: 'veg', dietaryRestrictions: ['vegetarian'], restaurantId: '2' },
      { id: '4', name: 'DOUBLE CHEESE MARGHERITA', price: 409, description: 'Extra cheese for extra flavor', cuisine: 'italian', category: 'veg', dietaryRestrictions: ['vegetarian'], restaurantId: '2' },
      { id: '5', name: 'VEGGIE FRESH', price: 409, description: 'Loaded with fresh vegetables', cuisine: 'italian', category: 'veg', dietaryRestrictions: ['vegetarian'], restaurantId: '2' },
      { id: '6', name: 'COUNTRY SPECIAL', price: 409, description: 'Special country-style pizza', cuisine: 'italian', category: 'veg', dietaryRestrictions: ['vegetarian'], restaurantId: '2' },
      { id: '7', name: 'PANEER DO PYAZA', price: 409, description: 'Paneer and onion delight', cuisine: 'italian', category: 'veg', dietaryRestrictions: ['vegetarian'], restaurantId: '2' },
      { id: '8', name: 'GARDEN FARM', price: 489, description: 'Fresh garden veggies', cuisine: 'italian', category: 'veg', dietaryRestrictions: ['vegetarian'], restaurantId: '2' },
      { id: '9', name: 'GOURMET VEG', price: 489, description: 'Premium veg toppings', cuisine: 'italian', category: 'veg', dietaryRestrictions: ['vegetarian'], restaurantId: '2' },
      { id: '10', name: 'PEPPY PANEER', price: 489, description: 'Paneer with spices', cuisine: 'italian', category: 'veg', dietaryRestrictions: ['vegetarian'], restaurantId: '2' },
      { id: '11', name: 'EXOTICA PARADISE', price: 489, description: 'Exotic veggie mix', cuisine: 'italian', category: 'veg', dietaryRestrictions: ['vegetarian'], restaurantId: '2' },
      { id: '12', name: 'VEG. MEXICAN GREEN WAVE', price: 489, description: 'Mexican-style veg pizza', cuisine: 'italian', category: 'veg', dietaryRestrictions: ['vegetarian'], restaurantId: '2' },
      { id: '13', name: 'PANEER TIKKA', price: 609, description: 'Tandoori paneer pizza', cuisine: 'italian', category: 'veg', dietaryRestrictions: ['vegetarian'], restaurantId: '2' },
      { id: '14', name: 'TANDOORI KADHAI PANEER', price: 609, description: 'Spicy tandoori paneer', cuisine: 'italian', category: 'veg', dietaryRestrictions: ['vegetarian'], restaurantId: '2' },
      { id: '15', name: 'VEG EXTRAVAGANZA', price: 609, description: 'Loaded with veg toppings', cuisine: 'italian', category: 'veg', dietaryRestrictions: ['vegetarian'], restaurantId: '2' },
      { id: '16', name: 'PEPPER BARBEQUE CHICKEN CHEESE AND SPICY CHICKEN', price: 429, description: 'Spicy BBQ chicken with cheese', cuisine: 'italian', category: 'non-veg', dietaryRestrictions: ['non-vegetarian'], restaurantId: '2' },
      { id: '17', name: 'BARBEQUE CHICKEN & ONION', price: 429, description: 'BBQ chicken with onion topping', cuisine: 'italian', category: 'non-veg', dietaryRestrictions: ['non-vegetarian'], restaurantId: '2' },
      { id: '18', name: 'SPICY CHICKEN PEPRIKA', price: 619, description: 'Spicy chicken with paprika', cuisine: 'italian', category: 'non-veg', dietaryRestrictions: ['non-vegetarian'], restaurantId: '2' },
      { id: '19', name: 'TEXAS BARBEQUE CHICKEN', price: 619, description: 'BBQ chicken Texas style', cuisine: 'italian', category: 'non-veg', dietaryRestrictions: ['non-vegetarian'], restaurantId: '2' },
      { id: '20', name: 'CHICKEN TIKKA', price: 619, description: 'Tandoori chicken on a pizza', cuisine: 'italian', category: 'non-veg', dietaryRestrictions: ['non-vegetarian'], restaurantId: '2' },
      { id: '21', name: 'CHICKEN MEXICAN RED WAVE', price: 779, description: 'Mexican-style spicy chicken pizza', cuisine: 'italian', category: 'non-veg', dietaryRestrictions: ['non-vegetarian'], restaurantId: '2' },
      { id: '22', name: 'GOLDEN DELIGHT CHICKEN', price: 779, description: 'Golden-crusted chicken pizza', cuisine: 'italian', category: 'non-veg', dietaryRestrictions: ['non-vegetarian'], restaurantId: '2' },
      { id: '23', name: 'KEEMA DO PYAZA', price: 779, description: 'Spicy keema with onion', cuisine: 'italian', category: 'non-veg', dietaryRestrictions: ['non-vegetarian'], restaurantId: '2' },
      { id: '24', name: 'TANDOORI KADHAI CHICKEN', price: 779, description: 'Tandoori chicken with special spices', cuisine: 'italian', category: 'non-veg', dietaryRestrictions: ['non-vegetarian'], restaurantId: '2' },
      { id: '25', name: 'CHICKEN PEPPERONI', price: 799, description: 'Classic pepperoni with chicken', cuisine: 'italian', category: 'non-veg', dietaryRestrictions: ['non-vegetarian'], restaurantId: '2' },
      { id: '26', name: 'OVERLOADED SUPREME CHICKEN', price: 799, description: 'Fully loaded supreme chicken pizza', cuisine: 'italian', category: 'non-veg', dietaryRestrictions: ['non-vegetarian'], restaurantId: '2' }
    ],
    timeSlots: [
      { id: '1', time: '12:00 PM', isBooked: false },
      { id: '2', time: '1:00 PM', isBooked: false },
      { id: '3', time: '2:00 PM', isBooked: false }
    ]
  },
  {
    id: '3',
    name: 'Chatkara',
    image: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bm9vZGxlfGVufDB8fDB8fHww',
    description: 'Authentic North Indian cuisine with a modern twist',
    contact: {
      phone: '+91 89059 62406',
      email: 'contact@chatkara.com',
      address: 'Near B1'
    },
    dishes: [
      { id: '27', name: 'Masala Chaap', price: 220, description: 'Spicy soya chaap', cuisine: 'indian', category: 'veg', dietaryRestrictions: ['vegetarian'], restaurantId: '3' },
      { id: '28', name: 'Punjabi Chaap', price: 220, description: 'Punjabi style soya chaap', cuisine: 'indian', category: 'veg', dietaryRestrictions: ['vegetarian'], restaurantId: '3' },
      { id: '29', name: 'Achari Chaap', price: 220, description: 'Pickle flavored chaap', cuisine: 'indian', category: 'veg', dietaryRestrictions: ['vegetarian'], restaurantId: '3' },
      { id: '30', name: 'Tandoori Chaap', price: 230, description: 'Tandoor cooked chaap', cuisine: 'indian', category: 'veg', dietaryRestrictions: ['vegetarian'], restaurantId: '3' },
      { id: '31', name: 'Malai Chaap', price: 230, description: 'Creamy chaap', cuisine: 'indian', category: 'veg', dietaryRestrictions: ['vegetarian'], restaurantId: '3' },
      { id: '32', name: 'Afghani Chaap', price: 230, description: 'Afghani style chaap', cuisine: 'indian', category: 'veg', dietaryRestrictions: ['vegetarian'], restaurantId: '3' },
      { id: '33', name: 'Veg Chicken Tikka', price: 240, description: 'Vegetarian version of chicken tikka', cuisine: 'indian', category: 'veg', dietaryRestrictions: ['vegetarian'], restaurantId: '3' },
      { id: '34', name: 'Veg Fish Tikka', price: 240, description: 'Vegetarian version of fish tikka', cuisine: 'indian', category: 'veg', dietaryRestrictions: ['vegetarian'], restaurantId: '3' },
      { id: '35', name: 'Veg Masala Kaleji', price: 250, description: 'Vegetarian version of masala kaleji', cuisine: 'indian', category: 'veg', dietaryRestrictions: ['vegetarian'], restaurantId: '3' },
      { id: '36', name: 'Veg Afghani Kaleji', price: 250, description: 'Vegetarian version of afghani kaleji', cuisine: 'indian', category: 'veg', dietaryRestrictions: ['vegetarian'], restaurantId: '3' }
    ],
    timeSlots: [
      { id: '1', time: '12:00 PM', isBooked: false },
      { id: '2', time: '1:00 PM', isBooked: false },
      { id: '3', time: '2:00 PM', isBooked: false }
    ]
  },
  {
    id: '4',
    name: 'Divine Signature',
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGFzdGF8ZW58MHx8MHx8fDA%3D',
    description: 'Multi-cuisine restaurant offering street food to fine dining',
    contact: {
      phone: '+91 73405 88261',
      email: 'contact@divinesignature.com',
      address: 'Near G1'
    },
    dishes: [
      { id: '37', name: 'Chatori Samosa Chaat', price: 40, description: 'Crispy samosa with tangy chutneys', cuisine: 'street-food', category: 'veg', dietaryRestrictions: ['vegetarian'], restaurantId: '4' },
      { id: '38', name: 'Chatpati Kachori Chaat', price: 50, description: 'Spicy kachori with chutneys', cuisine: 'street-food', category: 'veg', dietaryRestrictions: ['vegetarian'], restaurantId: '4' },
      { id: '39', name: 'Classic Indori Poha', price: 50, description: 'Authentic Indori style poha', cuisine: 'street-food', category: 'veg', dietaryRestrictions: ['vegetarian'], restaurantId: '4' },
      { id: '40', name: 'Mumbaiya Bhel Puri', price: 60, description: 'Mumbai style bhel puri', cuisine: 'street-food', category: 'veg', dietaryRestrictions: ['vegetarian'], restaurantId: '4' },
      { id: '41', name: 'Veg Chowmein', price: 70, description: 'Vegetable noodles', cuisine: 'chinese', category: 'veg', dietaryRestrictions: ['vegetarian'], restaurantId: '4' },
      { id: '42', name: 'Paneer Chowmein', price: 90, description: 'Noodles with paneer', cuisine: 'chinese', category: 'veg', dietaryRestrictions: ['vegetarian'], restaurantId: '4' },
      { id: '43', name: 'Egg Chowmein', price: 90, description: 'Noodles with egg', cuisine: 'chinese', category: 'non-veg', dietaryRestrictions: ['non-vegetarian'], restaurantId: '4' },
      { id: '44', name: 'Red Sauce Pasta', price: 90, description: 'Pasta in tomato sauce', cuisine: 'italian', category: 'veg', dietaryRestrictions: ['vegetarian'], restaurantId: '4' },
      { id: '45', name: 'White Sauce Pasta', price: 110, description: 'Pasta in creamy sauce', cuisine: 'italian', category: 'veg', dietaryRestrictions: ['vegetarian'], restaurantId: '4' },
      { id: '46', name: 'Mix Sauce Pasta', price: 130, description: 'Pasta in mixed sauce', cuisine: 'italian', category: 'veg', dietaryRestrictions: ['vegetarian'], restaurantId: '4' }
    ],
    timeSlots: [
      { id: '1', time: '12:00 PM', isBooked: false },
      { id: '2', time: '1:00 PM', isBooked: false },
      { id: '3', time: '2:00 PM', isBooked: false }
    ]
  }
];

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [restaurants, setRestaurants] = useState<Restaurant[]>(mockRestaurants);
  const [showAddRestaurant, setShowAddRestaurant] = useState(false);
  const [showAddDish, setShowAddDish] = useState(false);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<string | null>(null);
  const [editingRestaurant, setEditingRestaurant] = useState<Restaurant | undefined>();
  const [editingDish, setEditingDish] = useState<Dish | undefined>();
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1500]);
  const [selectedCuisines, setSelectedCuisines] = useState<Cuisine[]>([]);
  const [dietaryRestrictions, setDietaryRestrictions] = useState<DietaryRestriction[]>([]);

  const handleLogin = (username: string, password: string) => {
    if (username === 'admin' && password === 'admin') {
      setUser({
        _id: '1',
        username,
        password,
        role: 'admin'
      });
    } else {
      setUser({
        _id: Date.now().toString(),
        username,
        password,
        role: 'user'
      });
    }
  };

  const handleSignup = (username: string, password: string) => {
    setUser({
      _id: Date.now().toString(),
      username,
      password,
      role: 'user'
    });
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleAddRestaurant = (restaurantData: Omit<Restaurant, 'id' | 'dishes' | 'timeSlots'>) => {
    const newRestaurant: Restaurant = {
      id: Date.now().toString(),
      ...restaurantData,
      dishes: [],
      timeSlots: [
        { id: '1', time: '12:00 PM', isBooked: false },
        { id: '2', time: '1:00 PM', isBooked: false },
        { id: '3', time: '2:00 PM', isBooked: false },
        { id: '4', time: '6:00 PM', isBooked: false },
        { id: '5', time: '7:00 PM', isBooked: false },
        { id: '6', time: '8:00 PM', isBooked: false }
      ]
    };
    
    setRestaurants(prevRestaurants => [...prevRestaurants, newRestaurant]);
    setShowAddRestaurant(false);
  };

  const handleAddDish = (dishData: Omit<Dish, 'id'>) => {
    const newDish: Dish = {
      id: Date.now().toString(),
      ...dishData
    };
    setRestaurants(prevRestaurants =>
      prevRestaurants.map((restaurant) =>
        restaurant.id === selectedRestaurantId
          ? { ...restaurant, dishes: [...restaurant.dishes, newDish] }
          : restaurant
      )
    );
    setShowAddDish(false);
  };

  const filteredRestaurants = restaurants.filter(restaurant => {
    // If no filters are applied, show all restaurants
    if (selectedCuisines.length === 0 && dietaryRestrictions.length === 0 && priceRange[0] === 0 && priceRange[1] === 1500) {
      return true;
    }

    // Check if the restaurant has any dishes that match all the filters
    return restaurant.dishes.some(dish => {
      // Check price range
      const matchesPrice = dish.price >= priceRange[0] && dish.price <= priceRange[1];

      // Check cuisine
      const matchesCuisine = selectedCuisines.length === 0 || selectedCuisines.includes(dish.cuisine);

      // Check dietary restrictions
      let matchesDietary = true;
      if (dietaryRestrictions.length > 0) {
        // Handle 'none' case
        if (dietaryRestrictions.includes('none')) {
          matchesDietary = true;
        } else {
          matchesDietary = dietaryRestrictions.every(restriction => {
            if (restriction === 'vegetarian') {
              return dish.category === 'veg';
            }
            if (restriction === 'non-vegetarian') {
              return dish.category === 'non-veg';
            }
            // For other restrictions (vegan, gluten-free, dairy-free)
            return dish.dietaryRestrictions.includes(restriction);
          });
        }
      }

      return matchesPrice && matchesCuisine && matchesDietary;
    });
  });

  if (!user) {
    return <AuthForms onLogin={handleLogin} onSignup={handleSignup} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-indigo-600">Vibe and Dine</h1>
            <div className="flex items-center gap-4">
              <span className="text-gray-600">Welcome, {user.username}</span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900"
              >
                <LogOut size={20} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-semibold text-gray-900">Restaurants</h2>
          {user.role === 'admin' && (
            <button
              onClick={() => setShowAddRestaurant(true)}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <PlusCircle size={20} />
              Add Restaurant
            </button>
          )}
        </div>

        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-3">
            <Filters
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              selectedCuisines={selectedCuisines}
              setSelectedCuisines={setSelectedCuisines}
              dietaryRestrictions={dietaryRestrictions}
              setDietaryRestrictions={setDietaryRestrictions}
            />
          </div>

          <div className="col-span-9 space-y-6">
            {filteredRestaurants.map((restaurant) => (
              <RestaurantCard
                key={restaurant.id}
                restaurant={restaurant}
                currentUser={user}
                onAddDish={(id) => {
                  setSelectedRestaurantId(id);
                  setShowAddDish(true);
                }}
                onEditRestaurant={(restaurant) => {
                  setEditingRestaurant(restaurant);
                  setShowAddRestaurant(true);
                }}
                onDeleteRestaurant={(id) => {
                  setRestaurants(prevRestaurants => prevRestaurants.filter((r) => r.id !== id));
                }}
                onEditDish={(restaurantId, dish) => {
                  setSelectedRestaurantId(restaurantId);
                  setEditingDish(dish);
                  setShowAddDish(true);
                }}
                onDeleteDish={(restaurantId, dishId) => {
                  setRestaurants(prevRestaurants =>
                    prevRestaurants.map((restaurant) =>
                      restaurant.id === restaurantId
                        ? {
                            ...restaurant,
                            dishes: restaurant.dishes.filter((d) => d.id !== dishId)
                          }
                        : restaurant
                    )
                  );
                }}
                onBookTimeSlot={(restaurantId, slotId) => {
                  setRestaurants(prevRestaurants =>
                    prevRestaurants.map((restaurant) =>
                      restaurant.id === restaurantId
                        ? {
                            ...restaurant,
                            timeSlots: restaurant.timeSlots.map((slot) =>
                              slot.id === slotId
                                ? { ...slot, isBooked: true, bookedBy: user._id }
                                : slot
                            )
                          }
                        : restaurant
                    )
                  );
                }}
                onCancelBooking={(restaurantId, slotId) => {
                  setRestaurants(prevRestaurants =>
                    prevRestaurants.map((restaurant) =>
                      restaurant.id === restaurantId
                        ? {
                            ...restaurant,
                            timeSlots: restaurant.timeSlots.map((slot) =>
                              slot.id === slotId
                                ? { ...slot, isBooked: false, bookedBy: undefined }
                                : slot
                            )
                          }
                        : restaurant
                    )
                  );
                }}
              />
            ))}
          </div>
        </div>

        {showAddRestaurant && (
          <AddRestaurantForm
            onAdd={handleAddRestaurant}
            onEdit={(restaurant) => {
              setRestaurants(prevRestaurants =>
                prevRestaurants.map((r) => (r.id === restaurant.id ? restaurant : r))
              );
              setShowAddRestaurant(false);
              setEditingRestaurant(undefined);
            }}
            onClose={() => {
              setShowAddRestaurant(false);
              setEditingRestaurant(undefined);
            }}
            editingRestaurant={editingRestaurant}
          />
        )}

        {showAddDish && selectedRestaurantId && (
          <AddDishForm
            restaurantId={selectedRestaurantId}
            onAdd={handleAddDish}
            onEdit={(dish) => {
              setRestaurants(prevRestaurants =>
                prevRestaurants.map((restaurant) =>
                  restaurant.id === selectedRestaurantId
                    ? {
                        ...restaurant,
                        dishes: restaurant.dishes.map((d) =>
                          d.id === dish.id ? dish : d
                        )
                      }
                    : restaurant
                )
              );
              setShowAddDish(false);
              setEditingDish(undefined);
            }}
            onClose={() => {
              setShowAddDish(false);
              setEditingDish(undefined);
            }}
            editingDish={editingDish}
          />
        )}
      </div>
    </div>
  );
}

export default App;