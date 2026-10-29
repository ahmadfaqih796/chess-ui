/**
 * Komponen Navbar / Header Utama "Faqih Chess"
 * Didesain modern, mewah, dan sepenuhnya responsif di semua ukuran layar (Mobile hingga Desktop).
 */

import { Crown, Sparkles } from 'lucide-react'
import { DIFFICULTY_LEVELS } from '../constants/chessConstants'

export const ChessNavbar = ({
  difficulty = 'medium',
  onOpenNewGame = () => {},
}) => {
  const diffInfo = DIFFICULTY_LEVELS[difficulty.toUpperCase()] || DIFFICULTY_LEVELS.MEDIUM

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md shadow-lg shadow-black/20">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-3 py-2.5 sm:px-6 sm:py-3.5">
        {/* Brand Faqih Chess & Logo */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-500 via-amber-400 to-amber-600 text-slate-950 shadow-md shadow-amber-500/25 ring-1 ring-amber-300/40">
            <Crown className="h-5 w-5 sm:h-6 sm:w-6 drop-shadow-sm" />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <h1 className="text-base sm:text-lg font-black tracking-wider text-slate-100 truncate m-0">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500">
                  FAQIH
                </span>{' '}
                CHESS
              </h1>
              <span className="shrink-0 rounded-md bg-amber-500/10 px-1.5 py-0.5 text-[9px] sm:text-[10px] font-bold text-amber-400 border border-amber-500/20">
                PRO AI
              </span>
            </div>
            <p className="hidden xs:block text-[10px] sm:text-xs text-slate-400 truncate tracking-tight">
              Human vs Computer Chess Engine
            </p>
          </div>
        </div>

        {/* Info Mode & Tombol Aksi Header */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          {/* Badge Tingkat Kesulitan (Tetap terlihat rapi di layar mobile) */}
          <div className="flex items-center gap-1 sm:gap-2 rounded-lg sm:rounded-xl border border-slate-800 bg-slate-900/90 px-2 py-1 sm:px-3 sm:py-1.5 text-[11px] sm:text-xs">
            <span className="hidden md:inline text-slate-400 font-medium">Level:</span>
            <span className={`font-bold rounded px-1.5 py-0.5 border ${diffInfo.badgeColor}`}>
              {diffInfo.name}
            </span>
          </div>

          {/* Tombol Pengaturan Game Baru */}
          <button
            type="button"
            onClick={onOpenNewGame}
            className="inline-flex items-center gap-1 sm:gap-1.5 rounded-lg sm:rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 px-2.5 py-1.5 sm:px-3.5 sm:py-2 text-[11px] sm:text-xs font-bold text-slate-950 shadow-md sm:shadow-lg shadow-amber-500/20 transition-all hover:scale-102 active:scale-95 cursor-pointer"
          >
            <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Pengaturan Game</span>
            <span className="sm:hidden">Game Baru</span>
          </button>
        </div>
      </div>
    </header>
  )
}
