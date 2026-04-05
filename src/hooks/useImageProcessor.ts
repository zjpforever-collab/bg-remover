import { useState, useCallback, useEffect } from 'react';
import { processImageApi } from '../utils/api';
import type { ProcessResult } from '../types';

const STORAGE_KEY = 'bg-remover-usage';
const STORAGE_EMAIL_KEY = 'bg-remover-email';

interface UseImageProcessorReturn {
  processImage: (file: File) => Promise<string | null>;
  isProcessing: boolean;
  error: string | null;
  remainingUses: number;
  decrementUsage: () => void;
  resetUsage: () => void;
  isEmailRequired: boolean;
  setEmailRegistered: (email: string) => void;
}

export function useImageProcessor(): UseImageProcessorReturn {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [remainingUses, setRemainingUses] = useState(999);
  const [isEmailRequired, setIsEmailRequired] = useState(false);

  // Check if email is registered on mount
  useEffect(() => {
    const email = localStorage.getItem(STORAGE_EMAIL_KEY);
    if (!email) {
      // Check if free use has been used
      const freeUsed = localStorage.getItem(STORAGE_KEY);
      if (freeUsed === 'true') {
        setIsEmailRequired(true);
      }
    }
  }, []);

  const decrementUsage = useCallback(() => {
    // Mark that free use has been used
    localStorage.setItem(STORAGE_KEY, 'true');
    
    // If no email registered, require it for next use
    const email = localStorage.getItem(STORAGE_EMAIL_KEY);
    if (!email) {
      setIsEmailRequired(true);
      setRemainingUses(0);
    }
  }, []);

  const setEmailRegistered = useCallback((email: string) => {
    localStorage.setItem(STORAGE_EMAIL_KEY, email);
    setIsEmailRequired(false);
    setRemainingUses(999); // Unlimited after email registered
  }, []);

  const resetUsage = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(STORAGE_EMAIL_KEY);
    setRemainingUses(1);
    setIsEmailRequired(false);
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
    isEmailRequired,
    setEmailRegistered,
  };
}
