/**
 * Komponen Kartu Info Pemain (Human vs Computer)
 */

import { Bot, CheckCircle2, Loader2, User } from 'lucide-react'
import { DIFFICULTY_LEVELS } from '../constants/chessConstants'
import { CapturedPieces } from './CapturedPieces'

export const PlayerCard = ({
  isAI = false,
  color = 'w',
  isCurrentTurn = false,
  isThinking = false,
  difficulty = 'medium',
  capturedPieces = [],
  advantage = '',
}) => {
  const isWhite = color === 'w'
  const diffInfo = DIFFICULTY_LEVELS[difficulty.toUpperCase()] || DIFFICULTY_LEVELS.MEDIUM

  return (
    <div
      className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-xl p-3 transition-all duration-300 border ${
        isCurrentTurn
          ? 'bg-slate-800/90 border-amber-500/50 shadow-lg shadow-amber-500/10 ring-1 ring-amber-500/30'
          : 'bg-slate-900/60 border-slate-800 text-slate-400'
      }`}
    >
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div
          className={`relative flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl font-bold shadow-md ${
            isAI
              ? 'bg-gradient-to-tr from-indigo-600 to-purple-600 text-white'
              : 'bg-gradient-to-tr from-amber-500 to-emerald-600 text-white'
          }`}
        >
          {isAI ? <Bot className="h-6 w-6" /> : <User className="h-6 w-6" />}

          {/* Indikator Titik Giliran Aktif */}
          {isCurrentTurn && (
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-amber-500 border-2 border-slate-900" />
            </span>
          )}
        </div>

        {/* Info Nama & Badge */}
        <div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-100 text-sm sm:text-base">
              {isAI ? 'Komputer (AI)' : 'Anda'}
            </span>

            {/* Label Warna Bidak */}
            <span
              className={`inline-flex items-center rounded-md px-1.5 py-0.5 text-[11px] font-medium border ${
                isWhite
                  ? 'bg-slate-200 text-slate-900 border-slate-300'
                  : 'bg-slate-800 text-slate-200 border-slate-700'
              }`}
            >
              {isWhite ? 'Bidak Putih' : 'Bidak Hitam'}
            </span>

            {/* Badge Tingkat Kesulitan untuk AI */}
            {isAI && (
              <span
                className={`rounded-md px-1.5 py-0.5 text-[11px] font-semibold border ${diffInfo.badgeColor}`}
              >
                {diffInfo.name}
              </span>
            )}
          </div>

          {/* Status Berpikir / Giliran */}
          <div className="flex items-center gap-1.5 mt-0.5 text-xs">
            {isCurrentTurn ? (
              isThinking ? (
                <span className="inline-flex items-center gap-1 text-purple-400 font-medium">
                  <Loader2 className="h-3 w-3 animate-spin" />
                  Menganalisis langkah...
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-amber-400 font-medium">
                  <CheckCircle2 className="h-3 w-3" />
                  Giliran melangkah
                </span>
              )
            ) : (
              <span className="text-slate-400">Menunggu lawan...</span>
            )}
          </div>
        </div>
      </div>

      {/* Daftar Bidak yang Ditangkap Lawan */}
      <div className="flex justify-start sm:justify-end">
        <CapturedPieces
          pieces={capturedPieces}
          advantage={advantage}
          color={isWhite ? 'b' : 'w'} // Tampilkan bidak lawan yang dimakan
        />
      </div>
    </div>
  )
}

