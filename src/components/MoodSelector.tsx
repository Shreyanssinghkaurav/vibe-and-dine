import React from 'react';
import { Smile, Frown, Compass, Heart, Brain } from 'lucide-react';
import type { Mood } from '../types';

interface MoodSelectorProps {
  selectedMood: Mood | null;
  onMoodSelect: (mood: Mood) => void;
}

const moods: { type: Mood; icon: React.ReactNode; label: string; color: string }[] = [
  { type: 'happy', icon: <Smile size={32} />, label: 'Happy', color: 'bg-yellow-100 hover:bg-yellow-200' },
  { type: 'sad', icon: <Frown size={32} />, label: 'Comfort Food', color: 'bg-blue-100 hover:bg-blue-200' },
  { type: 'adventurous', icon: <Compass size={32} />, label: 'Adventurous', color: 'bg-green-100 hover:bg-green-200' },
  { type: 'romantic', icon: <Heart size={32} />, label: 'Romantic', color: 'bg-pink-100 hover:bg-pink-200' },
  { type: 'stressed', icon: <Brain size={32} />, label: 'Stressed', color: 'bg-purple-100 hover:bg-purple-200' },
];

export function MoodSelector({ selectedMood, onMoodSelect }: MoodSelectorProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {moods.map(({ type, icon, label, color }) => (
        <button
          key={type}
          onClick={() => onMoodSelect(type)}
          className={`${color} ${
            selectedMood === type ? 'ring-2 ring-offset-2 ring-indigo-500' : ''
          } p-6 rounded-xl flex flex-col items-center justify-center transition-all duration-200 hover:scale-105`}
        >
          <div className="mb-2">{icon}</div>
          <span className="text-sm font-medium">{label}</span>
        </button>
      ))}
    </div>
  );
}