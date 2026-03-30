'use client'

import type { ImageFile } from '../types';
import { DownloadIcon, RefreshIcon, MagicWandIcon, AlertIcon } from './Icons';

interface ResultViewProps {
  originalImage: ImageFile;
  processedImage: string | null;
  isProcessing: boolean;
  error: string | null;
  onProcess: () => void;
  onReset: () => void;
  onDownload: () => void;
}

function ResultView({
  originalImage,
  processedImage,
  isProcessing,
  error,
  onProcess,
  onReset,
  onDownload,
}: ResultViewProps) {
  return (
    <div className="mt-8 fade-in">
      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center gap-3">
          <AlertIcon className="w-5 h-5 text-red-400 flex-shrink-0" />
          <span className="text-red-300">{error}</span>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {/* Original Image */}
        <div className="glass rounded-2xl p-4">
          <h3 className="text-dark-400 text-sm font-medium mb-3">Original</h3>
          <div className="relative aspect-square rounded-xl overflow-hidden bg-dark-800">
            <img
              src={originalImage.preview}
              alt="Original"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="mt-3 text-dark-500 text-sm truncate">
            {originalImage.name} ({(originalImage.size / 1024 / 1024).toFixed(2)} MB)
          </div>
        </div>

        {/* Processed Image */}
        <div className="glass rounded-2xl p-4">
          <h3 className="text-dark-400 text-sm font-medium mb-3">
            {processedImage ? 'Result' : 'Result (after processing)'}
          </h3>
          <div className={`relative aspect-square rounded-xl overflow-hidden ${processedImage ? 'checkerboard' : 'bg-dark-800'}`}>
            {processedImage ? (
              <img
                src={processedImage}
                alt="Processed"
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-dark-600">
                <div className="text-center">
                  <MagicWandIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <span>Ready to remove background</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex flex-wrap gap-4 justify-center">
        {!processedImage ? (
          <button
            onClick={onProcess}
            disabled={isProcessing}
            className="
              px-8 py-4 rounded-xl
              bg-gradient-to-r from-blue-500 to-purple-600
              text-white font-semibold text-lg
              flex items-center gap-3
              hover:opacity-90 transition-all
              disabled:opacity-50 disabled:cursor-not-allowed
              shadow-lg shadow-blue-500/25
            "
          >
            {isProcessing ? (
              <>
                <div className="spinner" />
                Processing...
              </>
            ) : (
              <>
                <MagicWandIcon className="w-6 h-6" />
                Remove Background
              </>
            )}
          </button>
        ) : (
          <>
            <button
              onClick={onDownload}
              className="
                px-6 py-3 rounded-xl
                bg-green-500 hover:bg-green-600
                text-white font-medium
                flex items-center gap-2
                transition-colors
              "
            >
              <DownloadIcon className="w-5 h-5" />
              Download PNG
            </button>
            <button
              onClick={onReset}
              className="
                px-6 py-3 rounded-xl
                bg-dark-700 hover:bg-dark-600
                text-white font-medium
                flex items-center gap-2
                transition-colors
              "
            >
              <RefreshIcon className="w-5 h-5" />
              Process Another
            </button>
          </>
        )}
      </div>

      {processedImage && (
        <p className="mt-4 text-center text-dark-500 text-sm">
          Your image has transparent background. Download as PNG to keep the transparency.
        </p>
      )}
    </div>
  );
}

export default ResultView;
