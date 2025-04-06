import React from 'react';
import type { PriceRange, Cuisine, DietaryRestriction } from '../types';

interface PreferencesFormProps {
  priceRange: PriceRange | null;
  setPriceRange: (range: PriceRange) => void;
  selectedCuisines: Cuisine[];
  setCuisines: (cuisines: Cuisine[]) => void;
  dietaryRestrictions: DietaryRestriction[];
  setDietaryRestrictions: (restrictions: DietaryRestriction[]) => void;
}

const priceRanges: PriceRange[] = ['$', '$$', '$$$', '$$$$'];
const cuisines: Cuisine[] = ['italian', 'indian', 'japanese', 'mexican', 'american'];
const dietaryOptions: DietaryRestriction[] = ['vegan', 'vegetarian', 'gluten-free', 'dairy-free', 'none'];

export function PreferencesForm({
  priceRange,
  setPriceRange,
  selectedCuisines,
  setCuisines,
  dietaryRestrictions,
  setDietaryRestrictions,
}: PreferencesFormProps) {
  const handleCuisineToggle = (cuisine: Cuisine) => {
    if (selectedCuisines.includes(cuisine)) {
      setCuisines(selectedCuisines.filter((c) => c !== cuisine));
    } else {
      setCuisines([...selectedCuisines, cuisine]);
    }
  };

  const handleDietaryToggle = (restriction: DietaryRestriction) => {
    if (restriction === 'none') {
      setDietaryRestrictions(['none']);
      return;
    }
    if (dietaryRestrictions.includes(restriction)) {
      setDietaryRestrictions(dietaryRestrictions.filter((r) => r !== restriction));
    } else {
      setDietaryRestrictions([...dietaryRestrictions.filter((r) => r !== 'none'), restriction]);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-3">Price Range</h3>
        <div className="flex gap-2">
          {priceRanges.map((range) => (
            <button
              key={range}
              onClick={() => setPriceRange(range)}
              className={`px-4 py-2 rounded-lg ${
                priceRange === range
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-3">Cuisine Preferences</h3>
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
              {cuisine}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-3">Dietary Restrictions</h3>
        <div className="flex flex-wrap gap-2">
          {dietaryOptions.map((restriction) => (
            <button
              key={restriction}
              onClick={() => handleDietaryToggle(restriction)}
              className={`px-4 py-2 rounded-lg capitalize ${
                dietaryRestrictions.includes(restriction)
                  ? 'bg-indigo-600 text-white'
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