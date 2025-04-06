import React, { useState, useEffect } from 'react';
import type { Cuisine, DietaryRestriction, Dish, DishCategory } from '../types';

interface AddDishFormProps {
  restaurantId: string;
  onAdd: (dish: Omit<Dish, 'id'>) => void;
  onEdit?: (dish: Dish) => void;
  onClose: () => void;
  editingDish?: Dish;
}

const cuisines: Cuisine[] = ['italian', 'indian', 'japanese', 'mexican', 'american', 'chinese', 'street-food'];
const dietaryOptions: DietaryRestriction[] = ['vegan', 'vegetarian', 'non-vegetarian', 'gluten-free', 'dairy-free', 'none'];
const categories: DishCategory[] = ['veg', 'non-veg'];

export function AddDishForm({ restaurantId, onAdd, onEdit, onClose, editingDish }: AddDishFormProps) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [cuisine, setCuisine] = useState<Cuisine>('indian');
  const [category, setCategory] = useState<DishCategory>('veg');
  const [dietaryRestrictions, setDietaryRestrictions] = useState<DietaryRestriction[]>([]);

  useEffect(() => {
    if (editingDish) {
      setName(editingDish.name);
      setPrice(editingDish.price.toString());
      setDescription(editingDish.description);
      setCuisine(editingDish.cuisine);
      setCategory(editingDish.category);
      setDietaryRestrictions(editingDish.dietaryRestrictions);
    }
  }, [editingDish]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingDish && onEdit) {
      onEdit({
        ...editingDish,
        name,
        price: Number(price),
        description,
        cuisine,
        category,
        dietaryRestrictions,
      });
    } else {
      onAdd({
        name,
        price: Number(price),
        description,
        cuisine,
        category,
        dietaryRestrictions,
        restaurantId,
      });
    }
    onClose();
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">
          {editingDish ? 'Edit Dish' : 'Add New Dish'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Dish Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
              Price (₹)
            </label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              min="0"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              rows={3}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <div className="flex gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-2 rounded-lg capitalize ${
                    category === cat
                      ? cat === 'veg'
                        ? 'bg-green-600 text-white'
                        : 'bg-red-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cuisine Type
            </label>
            <select
              value={cuisine}
              onChange={(e) => setCuisine(e.target.value as Cuisine)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              {cuisines.map((c) => (
                <option key={c} value={c}>
                  {c.charAt(0).toUpperCase() + c.slice(1).replace('-', ' ')}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Dietary Restrictions
            </label>
            <div className="flex flex-wrap gap-2">
              {dietaryOptions.map((restriction) => (
                <button
                  key={restriction}
                  type="button"
                  onClick={() => handleDietaryToggle(restriction)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    dietaryRestrictions.includes(restriction)
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  {restriction.replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              {editingDish ? 'Save Changes' : 'Add Dish'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}