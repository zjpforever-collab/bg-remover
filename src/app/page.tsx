'use client';

import { useState, useCallback, useEffect } from 'react';
import Header from '@/components/Header';
import UploadArea from '@/components/UploadArea';
import ResultView from '@/components/ResultView';
import ProcessingModal from '@/components/ProcessingModal';
import UsageLimit from '@/components/UsageLimit';
import EmailRegisterModal from '@/components/EmailRegisterModal';
import { useImageProcessor } from '@/hooks/useImageProcessor';
import type { ImageFile } from '@/types';

export default function Home() {
  const [originalImage, setOriginalImage] = useState<ImageFile | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { processImage, isProcessing, error, remainingUses, decrementUsage, isEmailRequired, setEmailRegistered } = useImageProcessor();

  useEffect(() => {
    const email = localStorage.getItem('user_email');
    if (email) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLoginClick = useCallback(() => {
    setShowLoginModal(true);
  }, []);

  const handleLogin = useCallback((email: string) => {
    localStorage.setItem('user_email', email);
    setIsLoggedIn(true);
    setShowLoginModal(false);
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem('user_email');
    setIsLoggedIn(false);
  }, []);

  const handleImageUpload = useCallback((file: ImageFile) => {
    setOriginalImage(file);
    setProcessedImage(null);
  }, []);

  const handleProcess = useCallback(async () => {
    if (!originalImage) return;
    
    const result = await processImage(originalImage.file);
    if (result) {
      setProcessedImage(result);
      decrementUsage();
    }
  }, [originalImage, processImage, decrementUsage]);

  const handleReset = useCallback(() => {
    setOriginalImage(null);
    setProcessedImage(null);
  }, []);

  const handleDownload = useCallback(() => {
    if (!processedImage || !originalImage) return;
    
    const link = document.createElement('a');
    link.href = processedImage;
    const fileName = originalImage.name.replace(/\.[^/.]+$/, '');
    link.download = `${fileName}-no-bg.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [processedImage, originalImage]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header onLoginClick={handleLoginClick} />
      
      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        <UsageLimit remaining={remainingUses} />
        
        {!originalImage ? (
          <UploadArea onUpload={handleImageUpload} />
        ) : (
          <ResultView
            originalImage={originalImage}
            processedImage={processedImage}
            isProcessing={isProcessing}
            error={error}
            onProcess={handleProcess}
            onReset={handleReset}
            onDownload={handleDownload}
          />
        )}
      </main>

      <ProcessingModal isOpen={isProcessing} />
      
      <EmailRegisterModal 
        isOpen={isEmailRequired} 
        onRegister={setEmailRegistered} 
      />

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-sm shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-2">Welcome</h2>
            <p className="text-gray-400 mb-6">Enter your email to continue</p>
            <form onSubmit={(e) => {
              e.preventDefault();
              const email = (e.target as HTMLFormElement).email.value;
              if (email) handleLogin(email);
            }}>
              <input
                type="email"
                name="email"
                placeholder="your@email.com"
                required
                className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none mb-4"
              />
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowLoginModal(false)}
                  className="flex-1 px-4 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Continue
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <footer className="py-6 text-center text-gray-400 text-sm">
        <p>Powered by Remove.bg API</p>
      </footer>
    </div>
  );
}
