import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Lock } from 'lucide-react';

const PinLock = ({ onUnlock }) => {
  const [pin, setPin] = useState('');
  const [savedPin, setSavedPin] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('habit_tracker_pin');
    if (!stored) {
      setIsCreating(true);
    } else {
      setSavedPin(stored);
    }
  }, []);

  const handleNumberClick = (num) => {
    if (pin.length < 4) {
      const newPin = pin + num;
      setPin(newPin);
      setError('');

      if (newPin.length === 4) {
        setTimeout(() => {
          if (isCreating) {
            localStorage.setItem('habit_tracker_pin', newPin);
            onUnlock();
          } else {
            if (newPin === savedPin) {
              onUnlock();
            } else {
              setError('Incorrect PIN');
              setPin('');
            }
          }
        }, 100);
      }
    }
  };

  const handleClear = () => {
    setPin('');
    setError('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #FFF8E7 0%, #FFE5EC 100%)' }}>
      <div className="w-full max-w-md p-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6" style={{ backgroundColor: '#E8D5F2' }}>
            <Lock className="w-10 h-10" style={{ color: '#9C6FB7' }} />
          </div>
          <h1 className="text-3xl font-light mb-2" style={{ color: '#5A4A6A' }}>Welcome Back</h1>
          <p className="text-sm" style={{ color: '#9B8AA8' }}>
            {isCreating ? 'Create your 4-digit PIN' : 'Enter your PIN to continue'}
          </p>
        </div>

        <div className="flex justify-center gap-3 mb-8">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-200"
              style={{
                backgroundColor: pin.length > i ? '#E8D5F2' : '#F5F0FA',
                border: '2px solid',
                borderColor: pin.length > i ? '#C8A8E0' : '#E8D5F2'
              }}
            >
              {pin.length > i && (
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#9C6FB7' }} />
              )}
            </div>
          ))}
        </div>

        {error && (
          <div className="text-center mb-4">
            <p className="text-sm" style={{ color: '#E57373' }}>{error}</p>
          </div>
        )}

        <div className="grid grid-cols-3 gap-4 mb-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <Button
              key={num}
              onClick={() => handleNumberClick(num.toString())}
              className="h-16 text-xl font-light rounded-2xl transition-all duration-200 hover:scale-105"
              style={{
                backgroundColor: '#FFFFFF',
                color: '#5A4A6A',
                border: '2px solid #E8D5F2'
              }}
            >
              {num}
            </Button>
          ))}
          <div />
          <Button
            onClick={() => handleNumberClick('0')}
            className="h-16 text-xl font-light rounded-2xl transition-all duration-200 hover:scale-105"
            style={{
              backgroundColor: '#FFFFFF',
              color: '#5A4A6A',
              border: '2px solid #E8D5F2'
            }}
          >
            0
          </Button>
          <Button
            onClick={handleClear}
            className="h-16 text-sm font-light rounded-2xl transition-all duration-200 hover:scale-105"
            style={{
              backgroundColor: '#FFE5EC',
              color: '#9B8AA8',
              border: '2px solid #FFD4E0'
            }}
          >
            Clear
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PinLock;