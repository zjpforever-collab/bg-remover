'use client';

import { useState } from 'react';

interface EmailRegisterModalProps {
  isOpen: boolean;
  onRegister: (email: string) => void;
}

function EmailRegisterModal({ isOpen, onRegister }: EmailRegisterModalProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setIsSubmitting(true);
    // Simulate a brief delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500));
    onRegister(email);
    // Don't set isSubmitting false here - we're closing the modal anyway
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      
      {/* Modal */}
      <div className="relative bg-gray-800 border border-gray-700 rounded-2xl p-8 max-w-md w-full shadow-2xl">
        <div className="text-center">
          {/* Icon */}
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          
          {/* Title */}
          <h2 className="text-2xl font-bold text-white mb-2">
            🔥 Free Trial Used!
          </h2>
          
          {/* Description */}
          <p className="text-gray-400 mb-6">
            You&apos;ve used your free image! Enter your email to unlock <span className="text-green-400 font-semibold">unlimited</span> processing.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
              required
            />
            
            <button
              type="submit"
              disabled={isSubmitting || !email.includes('@')}
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-600 text-white font-semibold rounded-xl transition-all transform hover:scale-[1.02] disabled:transform-none disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Unlocking...' : '🚀 Unlock Unlimited Access'}
            </button>
          </form>

          {/* Small text */}
          <p className="text-gray-500 text-xs mt-4">
            No spam, we promise! Just your email to track your account.
          </p>
        </div>
      </div>
    </div>
  );
}

export default EmailRegisterModal;