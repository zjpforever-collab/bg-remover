'use client'

import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadIcon, MagicWandIcon } from './Icons';
import { validateImageFile, createImagePreview } from '../utils/api';
import type { ImageFile } from '../types';

interface UploadAreaProps {
  onUpload: (image: ImageFile) => void;
}

function UploadArea({ onUpload }: UploadAreaProps) {
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    const validation = validateImageFile(file);
    if (!validation.valid) {
      alert(validation.error);
      return;
    }

    const preview = await createImagePreview(file);
    onUpload({
      file,
      name: file.name,
      size: file.size,
      preview,
    });
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/webp': ['.webp'],
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024,
  });

  return (
    <div className="mt-8">
      <div
        {...getRootProps()}
        className={`
          relative group cursor-pointer
          border-2 border-dashed rounded-2xl
          transition-all duration-300 ease-out
          ${isDragActive 
            ? 'border-blue-500 bg-blue-500/10 scale-[1.02]' 
            : 'border-dark-600 hover:border-dark-500 hover:bg-dark-800/50'
          }
        `}
      >
        <input {...getInputProps()} />
        
        <div className="flex flex-col items-center justify-center py-16 px-8">
          <div className={`
            w-20 h-20 mb-6 rounded-full 
            flex items-center justify-center
            bg-gradient-to-br from-blue-500/20 to-purple-500/20
            group-hover:from-blue-500/30 group-hover:to-purple-500/30
            transition-all duration-300
            ${isDragActive ? 'animate-bounce-subtle' : ''}
          `}>
            <UploadIcon className="w-10 h-10 text-blue-400" />
          </div>

          <h2 className="text-2xl font-semibold text-white mb-3">
            {isDragActive ? 'Drop your image here' : 'Upload your image'}
          </h2>
          
          <p className="text-dark-400 text-center mb-6 max-w-md">
            Drag and drop an image here, or click to select a file.
            Supports JPG, PNG, and WebP formats up to 10MB.
          </p>

          <button className="
            px-6 py-3 rounded-xl
            bg-gradient-to-r from-blue-500 to-purple-600
            text-white font-medium
            flex items-center gap-2
            hover:opacity-90 transition-opacity
          ">
            <MagicWandIcon className="w-5 h-5" />
            Choose Image
          </button>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { title: 'JPG', desc: 'JPEG images' },
          { title: 'PNG', desc: 'Transparent support' },
          { title: 'WebP', desc: 'Modern format' },
        ].map((format) => (
          <div 
            key={format.title}
            className="glass rounded-xl p-4 text-center"
          >
            <div className="text-blue-400 font-semibold">{format.title}</div>
            <div className="text-dark-500 text-sm">{format.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UploadArea;
