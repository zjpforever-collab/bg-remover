'use client'

import { SparklesIcon, PhotoIcon } from './Icons';
import { useState, useEffect } from 'react';

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    // Check login status from localStorage
    const email = localStorage.getItem('user_email');
    if (email) {
      setIsLoggedIn(true);
      setUserEmail(email);
    }
  }, []);

  const handleLoginClick = () => {
    if (isLoggedIn) {
      // Logout
      localStorage.removeItem('user_email');
      setIsLoggedIn(false);
      setUserEmail('');
    } else {
      setShowLoginModal(true);
    }
  };

  const handleLogin = (email: string) => {
    localStorage.setItem('user_email', email);
    setIsLoggedIn(true);
    setUserEmail(email);
    setShowLoginModal(false);
  };

  return (
    <header className="glass sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 max-w-4xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <SparklesIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">BG Remover</h1>
              <p className="text-xs text-dark-400">AI-Powered</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-dark-400">
              <PhotoIcon className="w-5 h-5" />
              <span className="text-sm">Remove backgrounds instantly</span>
            </div>
            
            <button
              onClick={handleLoginClick}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
            >
              {isLoggedIn ? 'Logout' : 'Login'}
            </button>
          </div>
        </div>
      </div>

      {/* Simple Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md mx-4">
            <h2 className="text-xl font-bold text-white mb-4">Login</h2>
            <p className="text-gray-400 mb-4">Enter your email to continue</p>
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
                  className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;