import React, { useState, useEffect } from 'react';
import './App.css';
import PinLock from './components/PinLock';
import TemplateCardView from './components/TemplateCardView';
import TemplateHabitList from './components/TemplateHabitList';
import HabitModal from './components/HabitModal';
import TemplateManager from './components/TemplateManager';
import { Button } from './components/ui/button';
import { Calendar, LogOut } from 'lucide-react';
import { mockTemplates } from './mock';

function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isHabitModalOpen, setIsHabitModalOpen] = useState(false);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [editingHabit, setEditingHabit] = useState(null);
  const [editingTemplateId, setEditingTemplateId] = useState(null);

  useEffect(() => {
    if (isUnlocked) {
      const saved = localStorage.getItem('habit_tracker_templates');
      if (saved) {
        setTemplates(JSON.parse(saved));
      } else {
        setTemplates(mockTemplates);
      }
    }
  }, [isUnlocked]);

  useEffect(() => {
    if (isUnlocked && templates.length > 0) {
      localStorage.setItem('habit_tracker_templates', JSON.stringify(templates));
    }
  }, [templates, isUnlocked]);

  const handleToggleComplete = (templateId, habitId, dateStr) => {
    setTemplates(templates.map(template => {
      if (template.id === templateId) {
        return {
          ...template,
          habits: template.habits.map(habit => {
            if (habit.id === habitId) {
              const isCurrentlyCompleted = habit.completedDates.includes(dateStr);
              const newCompletedDates = isCurrentlyCompleted
                ? habit.completedDates.filter(d => d !== dateStr)
                : [...habit.completedDates, dateStr].sort();
              
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
          })
        };
      }
      return template;
    }));

    if (selectedTemplate) {
      const updated = templates.find(t => t.id === templateId);
      if (updated) {
        setSelectedTemplate(updated);
      }
    }
  };

  const handleAddNote = (templateId, habitId, dateStr, note) => {
    setTemplates(templates.map(template => {
      if (template.id === templateId) {
        return {
          ...template,
          habits: template.habits.map(habit => {
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
          })
        };
      }
      return template;
    }));
  };

  const handleSaveHabit = (habitData) => {
    const templateId = editingTemplateId;
    
    setTemplates(templates.map(template => {
      if (template.id === templateId) {
        if (editingHabit) {
          return {
            ...template,
            habits: template.habits.map(h => h.id === habitData.id ? habitData : h)
          };
        } else {
          return {
            ...template,
            habits: [...template.habits, habitData]
          };
        }
      }
      return template;
    }));

    setEditingHabit(null);
    setEditingTemplateId(null);
  };

  const handleDeleteHabit = (templateId, habitId) => {
    setTemplates(templates.map(template => {
      if (template.id === templateId) {
        return {
          ...template,
          habits: template.habits.filter(h => h.id !== habitId)
        };
      }
      return template;
    }));
  };

  const handleApplyTemplate = (template) => {
    const newTemplate = {
      ...template,
      id: 't' + Date.now(),
      habits: template.habits.map(h => ({
        ...h,
        id: 'h' + Date.now() + Math.random(),
        streak: 0,
        completedDates: [],
        notes: {}
      }))
    };
    setTemplates([...templates, newTemplate]);
  };

  const handleSelectTemplate = (template) => {
    const current = templates.find(t => t.id === template.id);
    setSelectedTemplate(current || template);
  };

  const handleLogout = () => {
    setIsUnlocked(false);
    setSelectedTemplate(null);
  };

  if (!isUnlocked) {
    return <PinLock onUnlock={() => setIsUnlocked(true)} />;
  }

  return (
    <div className="min-h-screen app-container" style={{ background: 'linear-gradient(135deg, #FFF8E7 0%, #F5F0FA 50%, #E8F4F8 100%)' }}>
      <div className="sticky top-0 z-10 backdrop-blur-sm" style={{ backgroundColor: '#FFFFFF95', borderBottom: '1px solid #E8D5F2' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl sm:text-2xl font-light" style={{ color: '#5A4A6A' }}>
              {selectedTemplate ? selectedTemplate.name : 'My Habits'}
            </h1>
            
            <div className="flex items-center gap-2">
              <Button
                onClick={handleLogout}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full transition-all duration-200 hover:scale-105"
                style={{ backgroundColor: '#FFE5EC', border: 'none' }}
              >
                <LogOut className="w-3 h-3 sm:w-4 sm:h-4" style={{ color: '#9B8AA8' }} />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="pb-8">
        {!selectedTemplate ? (
          <TemplateCardView
            templates={templates}
            selectedDate={selectedDate}
            onSelectTemplate={handleSelectTemplate}
            onManageTemplates={() => setIsTemplateModalOpen(true)}
            onCreateTemplate={() => setIsTemplateModalOpen(true)}
          />
        ) : (
          <TemplateHabitList
            template={selectedTemplate}
            selectedDate={selectedDate}
            onBack={() => setSelectedTemplate(null)}
            onToggleComplete={handleToggleComplete}
            onAddNote={handleAddNote}
            onEditHabit={(templateId, habit) => {
              setEditingHabit(habit);
              setEditingTemplateId(templateId);
              setIsHabitModalOpen(true);
            }}
            onDeleteHabit={handleDeleteHabit}
            onAddHabit={(templateId) => {
              setEditingTemplateId(templateId);
              setIsHabitModalOpen(true);
            }}
          />
        )}
      </div>

      <HabitModal
        isOpen={isHabitModalOpen}
        onClose={() => {
          setIsHabitModalOpen(false);
          setEditingHabit(null);
          setEditingTemplateId(null);
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
