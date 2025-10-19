import React from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Plus, Settings } from 'lucide-react';
import { categories } from '../mock';

const TemplateCardView = ({ templates, onSelectTemplate, onManageTemplates, onCreateTemplate, selectedDate }) => {
  const dateStr = selectedDate.toISOString().split('T')[0];

  const getTemplateProgress = (template) => {
    const totalHabits = template.habits.length;
    if (totalHabits === 0) return { completed: 0, total: 0, percentage: 0 };
    
    const completedHabits = template.habits.filter(habit => 
      habit.completedDates?.includes(dateStr)
    ).length;
    
    return {
      completed: completedHabits,
      total: totalHabits,
      percentage: Math.round((completedHabits / totalHabits) * 100)
    };
  };

  const getCategoryColor = (categoryId) => {
    return categories.find(c => c.id === categoryId)?.color || '#E8D5F2';
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-light" style={{ color: '#5A4A6A' }}>
              {selectedDate.toLocaleDateString('en-US', { weekday: 'long' })}
            </h2>
            <p className="text-sm" style={{ color: '#9B8AA8' }}>
              {selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
            </p>
          </div>
          <Button
            onClick={onManageTemplates}
            className="rounded-full px-3 sm:px-4 py-2 transition-all duration-200 hover:scale-105"
            style={{ backgroundColor: '#E8D5F2', color: '#5A4A6A', border: 'none' }}
          >
            <Settings className="w-4 h-4 sm:mr-2" />
            <span className="hidden sm:inline">Manage</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {templates.map(template => {
            const progress = getTemplateProgress(template);
            const primaryCategory = template.habits[0]?.category || 'personal';
            const bgColor = getCategoryColor(primaryCategory);
            
            return (
              <Card
                key={template.id}
                onClick={() => onSelectTemplate(template)}
                className="p-5 cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105"
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '2px solid',
                  borderColor: bgColor,
                  borderRadius: '20px'
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-normal mb-1" style={{ color: '#5A4A6A' }}>
                      {template.name}
                    </h3>
                    <p className="text-xs" style={{ color: '#9B8AA8' }}>
                      {template.habits.length} habits
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-light" style={{ color: '#5A4A6A' }}>
                      {progress.percentage}%
                    </div>
                    <div className="text-xs" style={{ color: '#9B8AA8' }}>
                      {progress.completed}/{progress.total}
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  {template.habits.slice(0, 3).map((habit, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm" style={{ color: '#5A4A6A' }}>
                      <span className="text-base">{habit.emoji}</span>
                      <span className="truncate">{habit.name}</span>
                      {habit.completedDates?.includes(dateStr) && (
                        <span className="ml-auto text-xs" style={{ color: '#9C6FB7' }}>✓</span>
                      )}
                    </div>
                  ))}
                  {template.habits.length > 3 && (
                    <div className="text-xs text-center" style={{ color: '#9B8AA8' }}>
                      +{template.habits.length - 3} more
                    </div>
                  )}
                </div>

                <div className="w-full h-2 rounded-full overflow-hidden" style={{ backgroundColor: '#F5F0FA' }}>
                  <div
                    className="h-full transition-all duration-500"
                    style={{
                      width: `${progress.percentage}%`,
                      backgroundColor: bgColor
                    }}
                  />
                </div>
              </Card>
            );
          })}
        </div>

        <Button
          onClick={onCreateTemplate}
          className="w-full py-6 rounded-2xl text-base font-light transition-all duration-200 hover:shadow-lg"
          style={{
            backgroundColor: '#C8E6C9',
            color: '#5A4A6A',
            border: 'none'
          }}
        >
          <Plus className="w-5 h-5 mr-2" />
          Create New Template
        </Button>
      </div>
    </div>
  );
};

export default TemplateCardView;
