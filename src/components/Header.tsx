'use client'

import { SparklesIcon, PhotoIcon } from './Icons';

function Header() {
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
          
          <div className="flex items-center gap-2 text-dark-400">
            <PhotoIcon className="w-5 h-5" />
            <span className="text-sm hidden sm:inline">Remove backgrounds instantly</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
