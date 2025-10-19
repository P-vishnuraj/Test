// Mock data for habit tracker

export const mockHabits = [
  {
    id: '1',
    name: 'Morning Meditation',
    emoji: '🧘',
    category: 'wellness',
    timeOfDay: 'morning',
    streak: 7,
    completedDates: ['2025-07-01', '2025-07-02', '2025-07-03', '2025-07-04', '2025-07-05', '2025-07-06', '2025-07-07'],
    notes: {}
  },
  {
    id: '2',
    name: 'Read 30 minutes',
    emoji: '📖',
    category: 'personal',
    timeOfDay: 'evening',
    streak: 3,
    completedDates: ['2025-07-05', '2025-07-06', '2025-07-07'],
    notes: {
      '2025-07-07': 'Finished chapter 5'
    }
  },
  {
    id: '3',
    name: 'Drink water',
    emoji: '💧',
    category: 'health',
    timeOfDay: 'anytime',
    streak: 15,
    completedDates: ['2025-06-23', '2025-06-24', '2025-06-25', '2025-06-26', '2025-06-27', '2025-06-28', '2025-06-29', '2025-06-30', '2025-07-01', '2025-07-02', '2025-07-03', '2025-07-04', '2025-07-05', '2025-07-06', '2025-07-07'],
    notes: {}
  }
];

export const mockTemplates = [
  {
    id: 't1',
    name: 'Daily Essentials',
    habits: [
      { id: 'h1', name: 'Morning stretch', emoji: '🤸', category: 'wellness', timeOfDay: 'morning', streak: 5, completedDates: ['2025-07-15', '2025-07-16', '2025-07-17', '2025-07-18', '2025-07-19'], notes: {} },
      { id: 'h2', name: 'Healthy breakfast', emoji: '🥗', category: 'health', timeOfDay: 'morning', streak: 3, completedDates: ['2025-07-17', '2025-07-18', '2025-07-19'], notes: {} },
      { id: 'h3', name: 'Gratitude journaling', emoji: '✨', category: 'personal', timeOfDay: 'evening', streak: 2, completedDates: ['2025-07-18', '2025-07-19'], notes: {} }
    ]
  },
  {
    id: 't2',
    name: 'Office Routine',
    habits: [
      { id: 'h4', name: 'Team standup', emoji: '👥', category: 'work', timeOfDay: 'morning', streak: 10, completedDates: ['2025-07-10', '2025-07-11', '2025-07-12', '2025-07-15', '2025-07-16', '2025-07-17', '2025-07-18', '2025-07-19'], notes: {} },
      { id: 'h5', name: 'Inbox zero', emoji: '📬', category: 'work', timeOfDay: 'afternoon', streak: 4, completedDates: ['2025-07-16', '2025-07-17', '2025-07-18', '2025-07-19'], notes: {} },
      { id: 'h6', name: 'End-of-day review', emoji: '📝', category: 'work', timeOfDay: 'evening', streak: 6, completedDates: ['2025-07-14', '2025-07-15', '2025-07-16', '2025-07-17', '2025-07-18', '2025-07-19'], notes: {} }
    ]
  }
];

export const presetEmojis = [
  '🧘', '📖', '💧', '🏃', '🎯', '✨', '🌱', '🎨', '🎵', '💪',
  '🥗', '☕', '🌅', '🌙', '⭐', '🌸', '🦋', '🌿', '🍃', '🌺',
  '📝', '✏️', '📚', '🎓', '💼', '📬', '👥', '🤸', '🧠', '❤️'
];

export const categories = [
  { id: 'wellness', name: 'Wellness', color: '#E8D5F2' },
  { id: 'health', name: 'Health', color: '#C8E6C9' },
  { id: 'personal', name: 'Personal', color: '#FFE0B2' },
  { id: 'work', name: 'Work', color: '#B3E5FC' },
  { id: 'creative', name: 'Creative', color: '#FFCDD2' }
];

export const timesOfDay = [
  { value: 'morning', label: 'Morning' },
  { value: 'afternoon', label: 'Afternoon' },
  { value: 'evening', label: 'Evening' },
  { value: 'anytime', label: 'Anytime' }
];