'use client'

interface UsageLimitProps {
  remaining: number;
}

function UsageLimit({ remaining }: UsageLimitProps) {
  const isLow = remaining <= 1;
  const isEmpty = remaining === 0;

  return (
    <div className={`
      glass rounded-xl p-4 flex items-center justify-between
      ${isEmpty ? 'border-red-500/30' : isLow ? 'border-yellow-500/30' : 'border-dark-600'}
    `}>
      <div className="flex items-center gap-3">
        <div className={`
          w-10 h-10 rounded-lg flex items-center justify-center
          ${isEmpty ? 'bg-red-500/20 text-red-400' : isLow ? 'bg-yellow-500/20 text-yellow-400' : 'bg-blue-500/20 text-blue-400'}
        `}>
          <span className="text-lg font-bold">{remaining}</span>
        </div>
        <div>
          <div className="text-white font-medium">
            {isEmpty ? 'No uses remaining' : `${remaining} free uses left`}
          </div>
          <div className="text-dark-500 text-sm">
            Daily limit • Resets at midnight
          </div>
        </div>
      </div>
      
      {isLow && !isEmpty && (
        <div className="text-yellow-400 text-sm">
          ⚡ Running low!
        </div>
      )}
    </div>
  );
}

export default UsageLimit;
