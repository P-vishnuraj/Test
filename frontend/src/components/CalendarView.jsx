import React from 'react';
import { Calendar } from './ui/calendar';
import { Card } from './ui/card';
import { ChevronLeft, ChevronRight, TrendingUp } from 'lucide-react';
import { Button } from './ui/button';

const CalendarView = ({ habits, selectedDate, onDateSelect }) => {
  const getCompletionForDate = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    const completed = habits.filter(h => h.completedDates?.includes(dateStr)).length;
    const total = habits.length;
    return { completed, total, percentage: total > 0 ? Math.round((completed / total) * 100) : 0 };
  };

  const modifiers = {
    completed: (date) => {
      const { percentage } = getCompletionForDate(date);
      return percentage === 100;
    },
    partial: (date) => {
      const { percentage } = getCompletionForDate(date);
      return percentage > 0 && percentage < 100;
    }
  };

  const modifiersStyles = {
    completed: {
      backgroundColor: '#C8E6C9',
      color: '#5A4A6A',
      fontWeight: '500'
    },
    partial: {
      backgroundColor: '#FFE0B2',
      color: '#5A4A6A',
      fontWeight: '500'
    }
  };

  const currentMonth = selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const { completed, total, percentage } = getCompletionForDate(selectedDate);

  const goToPreviousMonth = () => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() - 1);
    onDateSelect(newDate);
  };

  const goToNextMonth = () => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() + 1);
    onDateSelect(newDate);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="p-6 mb-6" style={{ backgroundColor: '#FFFFFF', borderRadius: '24px', border: '2px solid #E8D5F2' }}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-light" style={{ color: '#5A4A6A' }}>{currentMonth}</h2>
          <div className="flex gap-2">
            <Button
              onClick={goToPreviousMonth}
              className="w-10 h-10 rounded-full"
              style={{ backgroundColor: '#F5F0FA', border: 'none' }}
            >
              <ChevronLeft className="w-5 h-5" style={{ color: '#5A4A6A' }} />
            </Button>
            <Button
              onClick={goToNextMonth}
              className="w-10 h-10 rounded-full"
              style={{ backgroundColor: '#F5F0FA', border: 'none' }}
            >
              <ChevronRight className="w-5 h-5" style={{ color: '#5A4A6A' }} />
            </Button>
          </div>
        </div>

        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={onDateSelect}
          modifiers={modifiers}
          modifiersStyles={modifiersStyles}
          className="rounded-xl"
        />
      </Card>

      <Card className="p-6" style={{ backgroundColor: '#F5F0FA', borderRadius: '24px', border: '2px solid #E8D5F2' }}>
        <div className="flex items-center gap-3 mb-4">
          <TrendingUp className="w-5 h-5" style={{ color: '#9C6FB7' }} />
          <h3 className="text-lg font-light" style={{ color: '#5A4A6A' }}>Today's Progress</h3>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex-1">
            <div className="w-full h-3 rounded-full overflow-hidden" style={{ backgroundColor: '#E8D5F2' }}>
              <div
                className="h-full transition-all duration-500"
                style={{
                  width: `${percentage}%`,
                  backgroundColor: '#9C6FB7'
                }}
              />
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-light" style={{ color: '#5A4A6A' }}>{percentage}%</div>
            <div className="text-xs" style={{ color: '#9B8AA8' }}>{completed} of {total}</div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CalendarView;