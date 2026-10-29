/**
 * Komponen untuk menampilkan daftar bidak yang berhasil ditangkap
 */

import { ChessPiece } from './ChessPiece'

export const CapturedPieces = ({ pieces = [], advantage = '', color = 'w' }) => {
  if (pieces.length === 0 && !advantage) {
    return <div className="h-6" />
  }

  return (
    <div className="flex min-h-7 items-center gap-1.5 overflow-x-auto py-0.5">
      <div className="flex -space-x-2 items-center">
        {pieces.map((type, idx) => (
          <div
            key={`${type}-${idx}`}
            className="h-6 w-6 sm:h-7 sm:w-7 flex-shrink-0 transition-transform hover:-translate-y-1"
          >
            <ChessPiece type={type} color={color} className="h-full w-full drop-shadow-sm" />
          </div>
        ))}
      </div>
      {advantage && (
        <span className="ml-2 rounded bg-amber-500/20 px-1.5 py-0.5 text-xs font-bold text-amber-300 border border-amber-500/30">
          {advantage}
        </span>
      )}
    </div>
  )
}

