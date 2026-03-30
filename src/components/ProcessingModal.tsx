'use client'

function ProcessingModal({ isOpen }: { isOpen: boolean }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-dark-950/80 backdrop-blur-sm" />
      
      {/* Modal */}
      <div className="relative glass rounded-2xl p-8 max-w-sm w-full mx-4 text-center">
        <div className="mb-6">
          <div className="spinner w-16 h-16 mx-auto border-4 border-dark-700 border-t-blue-500" />
        </div>
        
        <h3 className="text-xl font-semibold text-white mb-2">
          Processing Image
        </h3>
        <p className="text-dark-400">
          Removing background... This usually takes 2-5 seconds.
        </p>
        
        <div className="mt-6 flex justify-center gap-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-blue-500"
              style={{
                animation: 'bounce 1s infinite',
                animationDelay: `${i * 0.15}s`,
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-8px);
          }
        }
      `}</style>
    </div>
  );
}

export default ProcessingModal;
