import React, { useState, useMemo } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Plus, Check, MoreVertical, Flame, StickyNote } from 'lucide-react';
import { categories, timesOfDay } from '../mock';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';

const HabitList = ({ habits, onAddHabit, onEditHabit, onDeleteHabit, onToggleComplete, onAddNote, selectedDate }) => {
  const [filter, setFilter] = useState('all');
  const [timeFilter, setTimeFilter] = useState('all');
  const [expandedHabit, setExpandedHabit] = useState(null);
  const [noteText, setNoteText] = useState('');

  const dateStr = selectedDate.toISOString().split('T')[0];
  
  const filteredHabits = useMemo(() => {
    return habits.filter(habit => {
      const categoryMatch = filter === 'all' || habit.category === filter;
      const timeMatch = timeFilter === 'all' || habit.timeOfDay === timeFilter;
      return categoryMatch && timeMatch;
    });
  }, [habits, filter, timeFilter]);

  const isCompleted = (habit) => {
    return habit.completedDates?.includes(dateStr) || false;
  };

  const getCategoryColor = (categoryId) => {
    return categories.find(c => c.id === categoryId)?.color || '#E0E0E0';
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-light mb-6" style={{ color: '#5A4A6A' }}>
          {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </h2>
        
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
          <Button
            onClick={() => setFilter('all')}
            className="rounded-full px-4 py-2 text-sm font-light transition-all duration-200"
            style={{
              backgroundColor: filter === 'all' ? '#E8D5F2' : '#F5F0FA',
              color: filter === 'all' ? '#5A4A6A' : '#9B8AA8',
              border: 'none'
            }}
          >
            All
          </Button>
          {categories.map(cat => (
            <Button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className="rounded-full px-4 py-2 text-sm font-light whitespace-nowrap transition-all duration-200"
              style={{
                backgroundColor: filter === cat.id ? cat.color : '#F5F0FA',
                color: '#5A4A6A',
                border: 'none'
              }}
            >
              {cat.name}
            </Button>
          ))}
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2">
          <Button
            onClick={() => setTimeFilter('all')}
            className="rounded-full px-4 py-2 text-sm font-light transition-all duration-200"
            style={{
              backgroundColor: timeFilter === 'all' ? '#C8E6C9' : '#F5F0FA',
              color: '#5A4A6A',
              border: 'none'
            }}
          >
            All Times
          </Button>
          {timesOfDay.map(time => (
            <Button
              key={time.value}
              onClick={() => setTimeFilter(time.value)}
              className="rounded-full px-4 py-2 text-sm font-light whitespace-nowrap transition-all duration-200"
              style={{
                backgroundColor: timeFilter === time.value ? '#C8E6C9' : '#F5F0FA',
                color: '#5A4A6A',
                border: 'none'
              }}
            >
              {time.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-3 mb-6">
        {filteredHabits.map(habit => {
          const completed = isCompleted(habit);
          return (
            <Card
              key={habit.id}
              className="p-4 transition-all duration-200 hover:shadow-md"
              style={{
                backgroundColor: completed ? getCategoryColor(habit.category) : '#FFFFFF',
                border: '2px solid',
                borderColor: getCategoryColor(habit.category),
                borderRadius: '16px'
              }}
            >
              <div className="flex items-center gap-4">
                <Button
                  onClick={() => onToggleComplete(habit.id, dateStr)}
                  className="w-12 h-12 rounded-full flex-shrink-0 transition-all duration-200 hover:scale-110"
                  style={{
                    backgroundColor: completed ? '#FFFFFF' : getCategoryColor(habit.category),
                    border: '2px solid',
                    borderColor: completed ? getCategoryColor(habit.category) : '#E0E0E0'
                  }}
                >
                  {completed && <Check className="w-5 h-5" style={{ color: '#5A4A6A' }} />}
                </Button>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl">{habit.emoji}</span>
                    <h3 className="text-base font-normal" style={{ color: '#5A4A6A' }}>
                      {habit.name}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 text-xs" style={{ color: '#9B8AA8' }}>
                    <span className="px-2 py-1 rounded-full" style={{ backgroundColor: '#FFFFFF50' }}>
                      {timesOfDay.find(t => t.value === habit.timeOfDay)?.label}
                    </span>
                    {habit.streak > 0 && (
                      <span className="flex items-center gap-1">
                        <Flame className="w-3 h-3" style={{ color: '#FF9F7F' }} />
                        {habit.streak} days
                      </span>
                    )}
                  </div>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      className="w-8 h-8 rounded-full flex-shrink-0"
                      style={{ backgroundColor: 'transparent', border: 'none' }}
                    >
                      <MoreVertical className="w-4 h-4" style={{ color: '#9B8AA8' }} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => onEditHabit(habit)}>Edit</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onDeleteHabit(habit.id)} style={{ color: '#E57373' }}>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </Card>
          );
        })}
      </div>

      <Button
        onClick={onAddHabit}
        className="w-full py-6 rounded-2xl text-base font-light transition-all duration-200 hover:shadow-lg"
        style={{
          backgroundColor: '#E8D5F2',
          color: '#5A4A6A',
          border: 'none'
        }}
      >
        <Plus className="w-5 h-5 mr-2" />
        Add New Habit
      </Button>
    </div>
  );
};

export default HabitList;