import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { Plus, Trash2, Sparkles } from 'lucide-react';
import { mockTemplates, presetEmojis, categories, timesOfDay } from '../mock';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const TemplateManager = ({ isOpen, onClose, onApplyTemplate }) => {
  const [templates, setTemplates] = useState(mockTemplates);
  const [isCreating, setIsCreating] = useState(false);
  const [newTemplate, setNewTemplate] = useState({
    name: '',
    habits: []
  });
  const [newHabit, setNewHabit] = useState({
    name: '',
    emoji: '✨',
    category: 'personal',
    timeOfDay: 'anytime'
  });

  const handleApplyTemplate = (template) => {
    onApplyTemplate(template);
    onClose();
  };

  const handleDeleteTemplate = (templateId) => {
    setTemplates(templates.filter(t => t.id !== templateId));
  };

  const handleAddHabitToTemplate = () => {
    if (!newHabit.name.trim()) return;
    
    setNewTemplate({
      ...newTemplate,
      habits: [...newTemplate.habits, { ...newHabit }]
    });
    
    setNewHabit({
      name: '',
      emoji: '✨',
      category: 'personal',
      timeOfDay: 'anytime'
    });
  };

  const handleRemoveHabitFromTemplate = (index) => {
    setNewTemplate({
      ...newTemplate,
      habits: newTemplate.habits.filter((_, i) => i !== index)
    });
  };

  const handleSaveTemplate = () => {
    if (!newTemplate.name.trim() || newTemplate.habits.length === 0) return;
    
    const template = {
      ...newTemplate,
      id: 't' + Date.now()
    };
    
    setTemplates([...templates, template]);
    setNewTemplate({ name: '', habits: [] });
    setIsCreating(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto" style={{ backgroundColor: '#FFFFFF', borderRadius: '24px', border: '2px solid #E8D5F2' }}>
        <DialogHeader>
          <DialogTitle className="text-2xl font-light flex items-center gap-2" style={{ color: '#5A4A6A' }}>
            <Sparkles className="w-6 h-6" style={{ color: '#9C6FB7' }} />
            Habit Templates
          </DialogTitle>
        </DialogHeader>
        
        {!isCreating ? (
          <div className="space-y-4 mt-4">
            {templates.map(template => (
              <Card key={template.id} className="p-4" style={{ backgroundColor: '#F5F0FA', borderRadius: '16px', border: '2px solid #E8D5F2' }}>
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-normal" style={{ color: '#5A4A6A' }}>{template.name}</h3>
                  <Button
                    onClick={() => handleDeleteTemplate(template.id)}
                    className="w-8 h-8 rounded-full"
                    style={{ backgroundColor: 'transparent', border: 'none' }}
                  >
                    <Trash2 className="w-4 h-4" style={{ color: '#E57373' }} />
                  </Button>
                </div>
                
                <div className="space-y-2 mb-4">
                  {template.habits.map((habit, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm" style={{ color: '#5A4A6A' }}>
                      <span className="text-lg">{habit.emoji}</span>
                      <span>{habit.name}</span>
                    </div>
                  ))}
                </div>
                
                <Button
                  onClick={() => handleApplyTemplate(template)}
                  className="w-full py-2 rounded-xl font-light transition-all duration-200"
                  style={{ backgroundColor: '#E8D5F2', color: '#5A4A6A', border: 'none' }}
                >
                  Apply Template
                </Button>
              </Card>
            ))}
            
            <Button
              onClick={() => setIsCreating(true)}
              className="w-full py-4 rounded-xl font-light transition-all duration-200"
              style={{ backgroundColor: '#C8E6C9', color: '#5A4A6A', border: 'none' }}
            >
              <Plus className="w-5 h-5 mr-2" />
              Create New Template
            </Button>
          </div>
        ) : (
          <div className="space-y-6 mt-4">
            <div>
              <Label className="text-sm font-light mb-2" style={{ color: '#5A4A6A' }}>Template Name</Label>
              <Input
                value={newTemplate.name}
                onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })}
                placeholder="e.g., My Morning Routine"
                className="mt-2 rounded-xl"
                style={{ borderColor: '#E8D5F2' }}
              />
            </div>
            
            <div>
              <Label className="text-sm font-light mb-2" style={{ color: '#5A4A6A' }}>Habits in Template</Label>
              {newTemplate.habits.length > 0 && (
                <div className="space-y-2 mb-3">
                  {newTemplate.habits.map((habit, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 rounded-xl" style={{ backgroundColor: '#F5F0FA' }}>
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{habit.emoji}</span>
                        <span className="text-sm" style={{ color: '#5A4A6A' }}>{habit.name}</span>
                      </div>
                      <Button
                        onClick={() => handleRemoveHabitFromTemplate(idx)}
                        className="w-6 h-6 rounded-full"
                        style={{ backgroundColor: 'transparent', border: 'none' }}
                      >
                        <Trash2 className="w-3 h-3" style={{ color: '#E57373' }} />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <Card className="p-4" style={{ backgroundColor: '#F5F0FA', borderRadius: '16px', border: '2px solid #E8D5F2' }}>
              <h4 className="text-sm font-light mb-3" style={{ color: '#5A4A6A' }}>Add Habit</h4>
              
              <div className="space-y-3">
                <div className="flex gap-2">
                  <Input
                    value={newHabit.emoji}
                    onChange={(e) => setNewHabit({ ...newHabit, emoji: e.target.value })}
                    placeholder="😊"
                    className="w-16 text-center rounded-xl"
                    style={{ borderColor: '#E8D5F2' }}
                  />
                  <Input
                    value={newHabit.name}
                    onChange={(e) => setNewHabit({ ...newHabit, name: e.target.value })}
                    placeholder="Habit name"
                    className="flex-1 rounded-xl"
                    style={{ borderColor: '#E8D5F2' }}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <Select value={newHabit.category} onValueChange={(val) => setNewHabit({ ...newHabit, category: val })}>
                    <SelectTrigger className="rounded-xl" style={{ borderColor: '#E8D5F2' }}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(cat => (
                        <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Select value={newHabit.timeOfDay} onValueChange={(val) => setNewHabit({ ...newHabit, timeOfDay: val })}>
                    <SelectTrigger className="rounded-xl" style={{ borderColor: '#E8D5F2' }}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {timesOfDay.map(time => (
                        <SelectItem key={time.value} value={time.value}>{time.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <Button
                  onClick={handleAddHabitToTemplate}
                  className="w-full py-2 rounded-xl font-light transition-all duration-200"
                  style={{ backgroundColor: '#E8D5F2', color: '#5A4A6A', border: 'none' }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add to Template
                </Button>
              </div>
            </Card>
            
            <div className="flex gap-3 pt-4">
              <Button
                onClick={() => {
                  setIsCreating(false);
                  setNewTemplate({ name: '', habits: [] });
                }}
                className="flex-1 py-3 rounded-xl font-light transition-all duration-200"
                style={{ backgroundColor: '#F5F0FA', color: '#9B8AA8', border: 'none' }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSaveTemplate}
                disabled={!newTemplate.name.trim() || newTemplate.habits.length === 0}
                className="flex-1 py-3 rounded-xl font-light transition-all duration-200"
                style={{ 
                  backgroundColor: !newTemplate.name.trim() || newTemplate.habits.length === 0 ? '#E0E0E0' : '#C8E6C9', 
                  color: '#5A4A6A', 
                  border: 'none' 
                }}
              >
                Save Template
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default TemplateManager;