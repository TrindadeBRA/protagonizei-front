"use client";

import { useEffect, useRef, useState } from "react";

interface TimerProps {
  initialTime: number; // tempo em segundos
  onTimeUp?: () => void;
  className?: string;
}

const Timer = ({ initialTime, onTimeUp, className = "" }: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
          }
          onTimeUp?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [onTimeUp]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`text-center ${className}`}>
      <p className="text-sm font-semibold text-red-600 mb-2">Validade do pagamento</p>
      <div className="inline-flex items-center justify-center px-4 py-2 bg-red-100 border border-red-300 rounded-full">
        <div className="w-3 h-3 bg-red-500 rounded-full mr-2 animate-pulse"></div>
        <span className="text-red-700 font-mono font-bold text-lg">
          {formatTime(timeLeft)}
        </span>
      </div>
    </div>
  );
};

export default Timer;
