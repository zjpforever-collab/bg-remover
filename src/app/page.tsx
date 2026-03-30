'use client';

import { useState, useCallback } from 'react';
import Header from '@/components/Header';
import UploadArea from '@/components/UploadArea';
import ResultView from '@/components/ResultView';
import ProcessingModal from '@/components/ProcessingModal';
import UsageLimit from '@/components/UsageLimit';
import { useImageProcessor } from '@/hooks/useImageProcessor';
import type { ImageFile } from '@/types';

export default function Home() {
  const [originalImage, setOriginalImage] = useState<ImageFile | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const { processImage, isProcessing, error, remainingUses, decrementUsage } = useImageProcessor();

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
      <Header />
      
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

      <footer className="py-6 text-center text-gray-400 text-sm">
        <p>Powered by Remove.bg API</p>
      </footer>
    </div>
  );
}
