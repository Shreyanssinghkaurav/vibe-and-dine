import React from 'react';
import type { Cuisine, DietaryRestriction } from '../types';

interface FiltersProps {
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  selectedCuisines: Cuisine[];
  setSelectedCuisines: (cuisines: Cuisine[]) => void;
  dietaryRestrictions: DietaryRestriction[];
  setDietaryRestrictions: (restrictions: DietaryRestriction[]) => void;
}

const cuisines: Cuisine[] = ['italian', 'indian', 'japanese', 'mexican', 'american', 'chinese', 'street-food'];
const dietaryOptions: DietaryRestriction[] = ['vegetarian', 'non-vegetarian', 'vegan', 'gluten-free', 'dairy-free', 'none'];

export function Filters({
  priceRange,
  setPriceRange,
  selectedCuisines,
  setSelectedCuisines,
  dietaryRestrictions,
  setDietaryRestrictions,
}: FiltersProps) {
  const handleCuisineToggle = (cuisine: Cuisine) => {
    if (selectedCuisines.includes(cuisine)) {
      setSelectedCuisines(selectedCuisines.filter((c) => c !== cuisine));
    } else {
      setSelectedCuisines([...selectedCuisines, cuisine]);
    }
  };

  const handleDietaryToggle = (restriction: DietaryRestriction) => {
    if (restriction === 'none') {
      setDietaryRestrictions(['none']);
      return;
    }

    // Remove 'none' if selecting other options
    let newRestrictions = dietaryRestrictions.filter(r => r !== 'none');

    if (newRestrictions.includes(restriction)) {
      // If removing vegetarian, also remove vegan
      if (restriction === 'vegetarian') {
        newRestrictions = newRestrictions.filter(r => r !== 'vegetarian' && r !== 'vegan');
      } 
      // If removing non-vegetarian, just remove it
      else if (restriction === 'non-vegetarian') {
        newRestrictions = newRestrictions.filter(r => r !== 'non-vegetarian');
      }
      // For other restrictions
      else {
        newRestrictions = newRestrictions.filter(r => r !== restriction);
      }
    } else {
      // If adding vegetarian
      if (restriction === 'vegetarian') {
        // Remove non-vegetarian if present
        newRestrictions = newRestrictions.filter(r => r !== 'non-vegetarian');
        newRestrictions.push('vegetarian');
      }
      // If adding non-vegetarian
      else if (restriction === 'non-vegetarian') {
        // Remove vegetarian and vegan if present
        newRestrictions = newRestrictions.filter(r => r !== 'vegetarian' && r !== 'vegan');
        newRestrictions.push('non-vegetarian');
      }
      // If adding vegan
      else if (restriction === 'vegan') {
        // Add vegetarian if not present
        if (!newRestrictions.includes('vegetarian')) {
          newRestrictions.push('vegetarian');
        }
        newRestrictions.push('vegan');
      }
      // For other restrictions
      else {
        newRestrictions.push(restriction);
      }
    }

    setDietaryRestrictions(newRestrictions);
  };

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow-sm">
      <div>
        <h3 className="text-lg font-medium mb-3">Price Range (₹)</h3>
        <div className="space-y-2">
          <input
            type="range"
            min="0"
            max="1500"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([0, Number(e.target.value)])}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>₹0</span>
            <span>₹{priceRange[1]}</span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-3">Cuisine</h3>
        <div className="flex flex-wrap gap-2">
          {cuisines.map((cuisine) => (
            <button
              key={cuisine}
              onClick={() => handleCuisineToggle(cuisine)}
              className={`px-4 py-2 rounded-lg capitalize ${
                selectedCuisines.includes(cuisine)
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
              }`}
            >
              {cuisine.replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-3">Dietary Preferences</h3>
        <div className="flex flex-wrap gap-2">
          {dietaryOptions.map((restriction) => (
            <button
              key={restriction}
              onClick={() => handleDietaryToggle(restriction)}
              className={`px-4 py-2 rounded-lg capitalize ${
                dietaryRestrictions.includes(restriction)
                  ? restriction === 'non-vegetarian'
                    ? 'bg-red-600 text-white'
                    : restriction === 'vegetarian'
                    ? 'bg-green-600 text-white'
                    : 'bg-indigo-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
              }`}
            >
              {restriction.replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}