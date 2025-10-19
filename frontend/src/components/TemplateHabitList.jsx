import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { ArrowLeft, Check, Plus, MoreVertical, Flame, StickyNote } from 'lucide-react';
import { categories, timesOfDay } from '../mock';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';

const TemplateHabitList = ({ template, onBack, onToggleComplete, onAddNote, onEditHabit, onDeleteHabit, onAddHabit, selectedDate }) => {
  const [expandedHabit, setExpandedHabit] = useState(null);
  const [noteText, setNoteText] = useState('');

  const dateStr = selectedDate.toISOString().split('T')[0];

  const isCompleted = (habit) => {
    return habit.completedDates?.includes(dateStr) || false;
  };

  const getCategoryColor = (categoryId) => {
    return categories.find(c => c.id === categoryId)?.color || '#E0E0E0';
  };

  const handleNoteSubmit = (habitId) => {
    if (noteText.trim()) {
      onAddNote(template.id, habitId, dateStr, noteText.trim());
      setNoteText('');
      setExpandedHabit(null);
    }
  };

  const handleToggle = (habitId) => {
    onToggleComplete(template.id, habitId, dateStr);
    const habit = template.habits.find(h => h.id === habitId);
    const wasCompleted = habit.completedDates?.includes(dateStr);
    
    if (!wasCompleted) {
      setExpandedHabit(habitId);
      setNoteText(habit.notes?.[dateStr] || '');
    } else {
      setExpandedHabit(null);
      setNoteText('');
    }
  };

  const progress = {
    completed: template.habits.filter(h => h.completedDates?.includes(dateStr)).length,
    total: template.habits.length
  };
  const percentage = progress.total > 0 ? Math.round((progress.completed / progress.total) * 100) : 0;

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <div className="mb-6">
        <Button
          onClick={onBack}
          className="mb-4 rounded-full px-4 py-2 transition-all duration-200"
          style={{ backgroundColor: '#F5F0FA', color: '#5A4A6A', border: 'none' }}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-light" style={{ color: '#5A4A6A' }}>
              {template.name}
            </h2>
            <p className="text-sm" style={{ color: '#9B8AA8' }}>
              {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>

        <Card className="p-4 mb-6" style={{ backgroundColor: '#F5F0FA', borderRadius: '16px', border: '2px solid #E8D5F2' }}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-light" style={{ color: '#5A4A6A' }}>Today's Progress</span>
            <span className="text-xl font-light" style={{ color: '#5A4A6A' }}>{percentage}%</span>
          </div>
          <div className="w-full h-3 rounded-full overflow-hidden" style={{ backgroundColor: '#E8D5F2' }}>
            <div
              className="h-full transition-all duration-500"
              style={{
                width: `${percentage}%`,
                backgroundColor: '#9C6FB7'
              }}
            />
          </div>
          <div className="text-xs text-center mt-2" style={{ color: '#9B8AA8' }}>
            {progress.completed} of {progress.total} completed
          </div>
        </Card>
      </div>

      <div className="space-y-3 mb-6">
        {template.habits.map(habit => {
          const completed = isCompleted(habit);
          const hasNote = habit.notes?.[dateStr];
          const isExpanded = expandedHabit === habit.id;
          
          return (
            <Card
              key={habit.id}
              className="transition-all duration-200 hover:shadow-md"
              style={{
                backgroundColor: completed ? getCategoryColor(habit.category) : '#FFFFFF',
                border: '2px solid',
                borderColor: getCategoryColor(habit.category),
                borderRadius: '16px'
              }}
            >
              <div className="p-4">
                <div className="flex items-center gap-4">
                  <Button
                    onClick={() => handleToggle(habit.id)}
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
                      {hasNote && (
                        <StickyNote className="w-4 h-4" style={{ color: '#9C6FB7' }} />
                      )}
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
                    {hasNote && !isExpanded && (
                      <div className="mt-2 text-xs italic px-3 py-2 rounded-lg" style={{ backgroundColor: '#FFFFFF80', color: '#5A4A6A' }}>
                        {hasNote}
                      </div>
                    )}
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
                      <DropdownMenuItem onClick={() => {
                        setExpandedHabit(habit.id);
                        setNoteText(habit.notes?.[dateStr] || '');
                      }}>
                        {hasNote ? 'Edit Note' : 'Add Note'}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onEditHabit(template.id, habit)}>Edit Habit</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onDeleteHabit(template.id, habit.id)} style={{ color: '#E57373' }}>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {isExpanded && (
                  <div className="mt-3 pt-3 border-t" style={{ borderColor: '#E8D5F2' }}>
                    <div className="flex gap-2">
                      <Input
                        value={noteText}
                        onChange={(e) => setNoteText(e.target.value)}
                        placeholder="Add a note (e.g., book name, thoughts...)"
                        className="flex-1 rounded-xl text-sm"
                        style={{ borderColor: '#E8D5F2' }}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            handleNoteSubmit(habit.id);
                          }
                        }}
                      />
                      <Button
                        onClick={() => handleNoteSubmit(habit.id)}
                        className="px-4 rounded-xl"
                        style={{ backgroundColor: '#E8D5F2', color: '#5A4A6A', border: 'none' }}
                      >
                        Save
                      </Button>
                      <Button
                        onClick={() => {
                          setExpandedHabit(null);
                          setNoteText('');
                        }}
                        className="px-4 rounded-xl"
                        style={{ backgroundColor: '#F5F0FA', color: '#9B8AA8', border: 'none' }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      <Button
        onClick={() => onAddHabit(template.id)}
        className="w-full py-6 rounded-2xl text-base font-light transition-all duration-200 hover:shadow-lg"
        style={{
          backgroundColor: '#E8D5F2',
          color: '#5A4A6A',
          border: 'none'
        }}
      >
        <Plus className="w-5 h-5 mr-2" />
        Add Habit to Template
      </Button>
    </div>
  );
};

export default TemplateHabitList;
