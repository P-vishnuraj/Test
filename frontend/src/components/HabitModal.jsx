import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { categories, timesOfDay, presetEmojis } from '../mock';

const HabitModal = ({ isOpen, onClose, onSave, habit }) => {
  const [formData, setFormData] = useState({
    name: '',
    emoji: '✨',
    category: 'personal',
    timeOfDay: 'anytime'
  });
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [customEmoji, setCustomEmoji] = useState('');

  useEffect(() => {
    if (habit) {
      setFormData({
        name: habit.name,
        emoji: habit.emoji,
        category: habit.category,
        timeOfDay: habit.timeOfDay
      });
    } else {
      setFormData({
        name: '',
        emoji: '✨',
        category: 'personal',
        timeOfDay: 'anytime'
      });
    }
  }, [habit, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;
    
    const habitData = {
      ...formData,
      id: habit?.id || Date.now().toString(),
      streak: habit?.streak || 0,
      completedDates: habit?.completedDates || [],
      notes: habit?.notes || {}
    };
    
    onSave(habitData);
    onClose();
  };

  const handleEmojiSelect = (emoji) => {
    setFormData({ ...formData, emoji });
    setShowEmojiPicker(false);
  };

  const handleCustomEmoji = () => {
    if (customEmoji.trim()) {
      setFormData({ ...formData, emoji: customEmoji.trim() });
      setCustomEmoji('');
      setShowEmojiPicker(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md" style={{ backgroundColor: '#FFFFFF', borderRadius: '24px', border: '2px solid #E8D5F2' }}>
        <DialogHeader>
          <DialogTitle className="text-2xl font-light" style={{ color: '#5A4A6A' }}>
            {habit ? 'Edit Habit' : 'New Habit'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div>
            <Label className="text-sm font-light mb-2" style={{ color: '#5A4A6A' }}>Emoji</Label>
            <div className="mt-2">
              <Button
                type="button"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="w-16 h-16 text-3xl rounded-2xl transition-all duration-200"
                style={{ backgroundColor: '#F5F0FA', border: '2px solid #E8D5F2' }}
              >
                {formData.emoji}
              </Button>
              
              {showEmojiPicker && (
                <div className="mt-3 p-4 rounded-2xl" style={{ backgroundColor: '#F5F0FA', border: '2px solid #E8D5F2' }}>
                  <div className="grid grid-cols-8 gap-2 mb-3">
                    {presetEmojis.map((emoji, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleEmojiSelect(emoji)}
                        className="w-10 h-10 text-2xl rounded-lg hover:bg-white transition-colors duration-200"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      value={customEmoji}
                      onChange={(e) => setCustomEmoji(e.target.value)}
                      placeholder="Or paste custom emoji"
                      className="flex-1"
                      style={{ borderColor: '#E8D5F2' }}
                    />
                    <Button
                      type="button"
                      onClick={handleCustomEmoji}
                      className="px-4"
                      style={{ backgroundColor: '#E8D5F2', color: '#5A4A6A' }}
                    >
                      Add
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="name" className="text-sm font-light mb-2" style={{ color: '#5A4A6A' }}>Habit Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Morning meditation"
              className="mt-2 rounded-xl"
              style={{ borderColor: '#E8D5F2' }}
              required
            />
          </div>

          <div>
            <Label className="text-sm font-light mb-2" style={{ color: '#5A4A6A' }}>Category</Label>
            <Select value={formData.category} onValueChange={(val) => setFormData({ ...formData, category: val })}>
              <SelectTrigger className="mt-2 rounded-xl" style={{ borderColor: '#E8D5F2' }}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map(cat => (
                  <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-sm font-light mb-2" style={{ color: '#5A4A6A' }}>Time of Day</Label>
            <Select value={formData.timeOfDay} onValueChange={(val) => setFormData({ ...formData, timeOfDay: val })}>
              <SelectTrigger className="mt-2 rounded-xl" style={{ borderColor: '#E8D5F2' }}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {timesOfDay.map(time => (
                  <SelectItem key={time.value} value={time.value}>{time.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl font-light transition-all duration-200"
              style={{ backgroundColor: '#F5F0FA', color: '#9B8AA8', border: 'none' }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 py-3 rounded-xl font-light transition-all duration-200"
              style={{ backgroundColor: '#E8D5F2', color: '#5A4A6A', border: 'none' }}
            >
              {habit ? 'Save Changes' : 'Create Habit'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default HabitModal;