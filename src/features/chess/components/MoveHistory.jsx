/**
 * Komponen Riwayat Langkah (Move History / Notasi Catur)
 */

import { ScrollText } from 'lucide-react'
import { useEffect, useRef } from 'react'

export const MoveHistory = ({ formattedHistory = [] }) => {
  const scrollRef = useRef(null)

  // Otomatis scroll ke langkah paling akhir
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [formattedHistory])

  return (
    <div className="flex h-full flex-col rounded-xl border border-slate-800 bg-slate-900/70 p-3 shadow-lg">
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2.5 text-slate-300">
        <ScrollText className="h-4 w-4 text-amber-400" />
        <h3 className="text-sm font-semibold tracking-wide">Notasi Langkah</h3>
        <span className="ml-auto rounded-full bg-slate-800 px-2 py-0.5 text-[11px] font-medium text-slate-400">
          {formattedHistory.length} Putaran
        </span>
      </div>

      <div
        ref={scrollRef}
        className="mt-2 max-h-56 min-h-[140px] overflow-y-auto pr-1 text-xs sm:text-sm font-mono scroll-smooth"
      >
        {formattedHistory.length === 0 ? (
          <div className="flex h-32 items-center justify-center text-center text-slate-400">
            <span>Permainan belum dimulai.<br />Lakukan langkah pertama Anda!</span>
          </div>
        ) : (
          <div className="space-y-1">
            {formattedHistory.map((item, idx) => {
              const isLast = idx === formattedHistory.length - 1

              return (
                <div
                  key={item.roundNumber}
                  className={`grid grid-cols-[36px_1fr_1fr] items-center rounded px-2 py-1 transition-colors ${
                    isLast ? 'bg-amber-500/10 text-amber-300 font-semibold' : 'hover:bg-slate-800/60 text-slate-300'
                  }`}
                >
                  <span className="text-slate-400 font-sans">{item.roundNumber}.</span>
                  <span>{item.white}</span>
                  <span className={item.black ? '' : 'text-slate-400'}>
                    {item.black || '-'}
                  </span>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

