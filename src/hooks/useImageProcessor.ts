import { useState, useCallback, useEffect } from 'react';
import { processImageApi } from '../utils/api';
import type { ProcessResult } from '../types';

const STORAGE_KEY = 'bg-remover-usage';
const DAILY_LIMIT = 5;

interface UseImageProcessorReturn {
  processImage: (file: File) => Promise<string | null>;
  isProcessing: boolean;
  error: string | null;
  remainingUses: number;
  decrementUsage: () => void;
  resetUsage: () => void;
}

export function useImageProcessor(): UseImageProcessorReturn {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [remainingUses, setRemainingUses] = useState(DAILY_LIMIT);

  // Load usage from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const { count, date } = JSON.parse(stored);
        const today = new Date().toDateString();
        
        if (date === today) {
          setRemainingUses(Math.max(0, DAILY_LIMIT - count));
        } else {
          // Reset for new day
          localStorage.setItem(STORAGE_KEY, JSON.stringify({ count: 0, date: today }));
          setRemainingUses(DAILY_LIMIT);
        }
      } catch {
        setRemainingUses(DAILY_LIMIT);
      }
    }
  }, []);

  const decrementUsage = useCallback(() => {
    setRemainingUses(prev => {
      const newCount = Math.max(0, prev - 1);
      const today = new Date().toDateString();
      const stored = localStorage.getItem(STORAGE_KEY);
      let count = 1;
      
      if (stored) {
        const { count: storedCount, date } = JSON.parse(stored);
        if (date === today) {
          count = storedCount + 1;
        }
      }
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ count, date: today }));
      return newCount;
    });
  }, []);

  const resetUsage = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ count: 0, date: new Date().toDateString() }));
    setRemainingUses(DAILY_LIMIT);
  }, []);

  const processImage = useCallback(async (file: File): Promise<string | null> => {
    setIsProcessing(true);
    setError(null);

    try {
      const result: ProcessResult = await processImageApi(file);
      
      if (result.success && result.data) {
        return result.data;
      } else {
        setError(result.error || 'Failed to process image');
        return null;
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      return null;
    } finally {
      setIsProcessing(false);
    }
  }, []);

  return {
    processImage,
    isProcessing,
    error,
    remainingUses,
    decrementUsage,
    resetUsage,
  };
}
