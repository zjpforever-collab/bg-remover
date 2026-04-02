'use client'

interface UsageLimitProps {
  remaining: number;
}

function UsageLimit({ remaining }: UsageLimitProps) {
  const isUnlimited = remaining >= 999;
  const isLow = remaining <= 1 && !isUnlimited;
  const isEmpty = remaining === 0;

  return (
    <div className={`
      glass rounded-xl p-4 flex items-center justify-between
      ${isUnlimited ? 'border-green-500/30' : isEmpty ? 'border-red-500/30' : isLow ? 'border-yellow-500/30' : 'border-gray-600'}
    `}>
      <div className="flex items-center gap-3">
        <div className={`
          w-10 h-10 rounded-lg flex items-center justify-center
          ${isUnlimited ? 'bg-green-500/20 text-green-400' : isEmpty ? 'bg-red-500/20 text-red-400' : isLow ? 'bg-yellow-500/20 text-yellow-400' : 'bg-blue-500/20 text-blue-400'}
        `}>
          <span className="text-lg font-bold">
            {isUnlimited ? '∞' : remaining}
          </span>
        </div>
        <div>
          <div className="text-white font-medium">
            {isUnlimited ? 'Unlimited Access' : isEmpty ? 'No uses remaining' : `${remaining} free uses left`}
          </div>
          <div className="text-gray-500 text-sm">
            {isUnlimited ? 'Registered user • No limits' : 'Daily limit • Resets at midnight'}
          </div>
        </div>
      </div>
      
      {isUnlimited && (
        <div className="text-green-400 text-sm">
          ✅ Unlocked!
        </div>
      )}
      {isLow && !isEmpty && !isUnlimited && (
        <div className="text-yellow-400 text-sm">
          ⚡ Running low!
        </div>
      )}
    </div>
  );
}

export default UsageLimit;
