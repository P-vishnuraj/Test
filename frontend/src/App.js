import React, { useState, useEffect } from 'react';
import './App.css';
import PinLock from './components/PinLock';
import HabitList from './components/HabitList';
import HabitModal from './components/HabitModal';
import CalendarView from './components/CalendarView';
import TemplateManager from './components/TemplateManager';
import { Button } from './components/ui/button';
import { Calendar, List, Sparkles, LogOut } from 'lucide-react';
import { mockHabits } from './mock';

function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [habits, setHabits] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState('list'); // 'list' or 'calendar'
  const [isHabitModalOpen, setIsHabitModalOpen] = useState(false);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [editingHabit, setEditingHabit] = useState(null);

  useEffect(() => {
    if (isUnlocked) {
      // Load habits from localStorage or use mock data
      const saved = localStorage.getItem('habit_tracker_habits');
      if (saved) {
        setHabits(JSON.parse(saved));
      } else {
        setHabits(mockHabits);
      }
    }
  }, [isUnlocked]);

  useEffect(() => {
    if (isUnlocked && habits.length > 0) {
      localStorage.setItem('habit_tracker_habits', JSON.stringify(habits));
    }
  }, [habits, isUnlocked]);

  const handleToggleComplete = (habitId, dateStr) => {
    setHabits(habits.map(habit => {
      if (habit.id === habitId) {
        const isCurrentlyCompleted = habit.completedDates.includes(dateStr);
        const newCompletedDates = isCurrentlyCompleted
          ? habit.completedDates.filter(d => d !== dateStr)
          : [...habit.completedDates, dateStr].sort();
        
        // Calculate streak
        let streak = 0;
        const today = new Date();
        for (let i = 0; i < 365; i++) {
          const checkDate = new Date(today);
          checkDate.setDate(today.getDate() - i);
          const checkDateStr = checkDate.toISOString().split('T')[0];
          if (newCompletedDates.includes(checkDateStr)) {
            streak++;
          } else {
            break;
          }
        }
        
        return {
          ...habit,
          completedDates: newCompletedDates,
          streak
        };
      }
      return habit;
    }));
  };

  const handleSaveHabit = (habitData) => {
    if (editingHabit) {
      setHabits(habits.map(h => h.id === habitData.id ? habitData : h));
    } else {
      setHabits([...habits, habitData]);
    }
    setEditingHabit(null);
  };

  const handleDeleteHabit = (habitId) => {
    setHabits(habits.filter(h => h.id !== habitId));
  };

  const handleAddNote = (habitId, dateStr, note) => {
    setHabits(habits.map(habit => {
      if (habit.id === habitId) {
        return {
          ...habit,
          notes: {
            ...habit.notes,
            [dateStr]: note
          }
        };
      }
      return habit;
    }));
  };

  const handleApplyTemplate = (template) => {
    const newHabits = template.habits.map(h => ({
      ...h,
      id: Date.now().toString() + Math.random(),
      streak: 0,
      completedDates: [],
      notes: {}
    }));
    setHabits([...habits, ...newHabits]);
  };

  const handleLogout = () => {
    setIsUnlocked(false);
  };

  if (!isUnlocked) {
    return <PinLock onUnlock={() => setIsUnlocked(true)} />;
  }

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #FFF8E7 0%, #F5F0FA 50%, #E8F4F8 100%)' }}>
      {/* Header */}
      <div className="sticky top-0 z-10 backdrop-blur-sm" style={{ backgroundColor: '#FFFFFF95', borderBottom: '1px solid #E8D5F2' }}>
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-light" style={{ color: '#5A4A6A' }}>My Habits</h1>
            
            <div className="flex items-center gap-2">
              <Button
                onClick={() => setIsTemplateModalOpen(true)}
                className="rounded-full px-4 py-2 transition-all duration-200 hover:scale-105"
                style={{ backgroundColor: '#C8E6C9', color: '#5A4A6A', border: 'none' }}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Templates
              </Button>
              
              <Button
                onClick={() => setView(view === 'list' ? 'calendar' : 'list')}
                className="w-10 h-10 rounded-full transition-all duration-200 hover:scale-105"
                style={{ backgroundColor: '#E8D5F2', border: 'none' }}
              >
                {view === 'list' ? (
                  <Calendar className="w-5 h-5" style={{ color: '#5A4A6A' }} />
                ) : (
                  <List className="w-5 h-5" style={{ color: '#5A4A6A' }} />
                )}
              </Button>
              
              <Button
                onClick={handleLogout}
                className="w-10 h-10 rounded-full transition-all duration-200 hover:scale-105"
                style={{ backgroundColor: '#FFE5EC', border: 'none' }}
              >
                <LogOut className="w-4 h-4" style={{ color: '#9B8AA8' }} />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pb-8">
        {view === 'list' ? (
          <HabitList
            habits={habits}
            onAddHabit={() => setIsHabitModalOpen(true)}
            onEditHabit={(habit) => {
              setEditingHabit(habit);
              setIsHabitModalOpen(true);
            }}
            onDeleteHabit={handleDeleteHabit}
            onToggleComplete={handleToggleComplete}
            selectedDate={selectedDate}
          />
        ) : (
          <CalendarView
            habits={habits}
            selectedDate={selectedDate}
            onDateSelect={(date) => {
              setSelectedDate(date);
              setView('list');
            }}
          />
        )}
      </div>

      {/* Modals */}
      <HabitModal
        isOpen={isHabitModalOpen}
        onClose={() => {
          setIsHabitModalOpen(false);
          setEditingHabit(null);
        }}
        onSave={handleSaveHabit}
        habit={editingHabit}
      />
      
      <TemplateManager
        isOpen={isTemplateModalOpen}
        onClose={() => setIsTemplateModalOpen(false)}
        onApplyTemplate={handleApplyTemplate}
      />
    </div>
  );
}

export default App;