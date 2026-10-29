/**
 * Komponen Papan Catur Utama
 * Menangani render petak 8x8, highlight langkah, indikator skak, dan interaksi sentuh/klik.
 */

import { ChessPiece } from './ChessPiece'

export const ChessBoard = ({
  chess,
  isFlipped = false,
  selectedSquare = null,
  legalMoves = [],
  lastMove = null,
  onSquareClick = () => {},
}) => {
  const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
  const ranks = ['8', '7', '6', '5', '4', '3', '2', '1']

  // Orientasi papan jika dibalik (saat memainkan bidak hitam)
  const displayFiles = isFlipped ? [...files].reverse() : files
  const displayRanks = isFlipped ? [...ranks].reverse() : ranks

  // Petak yang merupakan target langkah legal
  const legalMoveSquares = new Set(legalMoves.map((m) => m.to))

  // Deteksi posisi raja yang sedang terkena skak
  let checkedKingSquare = null
  if (chess.isCheck()) {
    const currentTurn = chess.turn()
    for (const r of ranks) {
      for (const f of files) {
        const sq = `${f}${r}`
        const p = chess.get(sq)
        if (p && p.type === 'k' && p.color === currentTurn) {
          checkedKingSquare = sq
          break
        }
      }
      if (checkedKingSquare) break
    }
  }

  return (
    <div className="relative aspect-square w-full max-w-[560px] overflow-hidden rounded-2xl border-4 border-slate-700/80 bg-slate-900 shadow-2xl shadow-black/60 ring-1 ring-white/10 select-none">
      <div className="grid h-full w-full grid-cols-8 grid-rows-8">
        {displayRanks.map((rank, rankIdx) =>
          displayFiles.map((file, fileIdx) => {
            const square = `${file}${rank}`
            const piece = chess.get(square)

            // Hitung warna petak (genap/ganjil)
            const isLight = (rankIdx + fileIdx) % 2 === 0
            const isSelected = selectedSquare === square
            const isLastMove = lastMove && (lastMove.from === square || lastMove.to === square)
            const isLegal = legalMoveSquares.has(square)
            const isCheckedKing = checkedKingSquare === square

            // Gaya warna latar petak
            let bgClass = isLight ? 'bg-[#ebecd0]' : 'bg-[#739552]'

            if (isSelected) {
              bgClass = isLight ? 'bg-[#f7ec74]' : 'bg-[#dac33c]'
            } else if (isLastMove) {
              bgClass = isLight ? 'bg-[#f5f682]/90' : 'bg-[#b9ca43]/90'
            }

            return (
              <button
                key={square}
                type="button"
                onClick={() => onSquareClick(square)}
                className={`relative flex aspect-square w-full items-center justify-center p-1 transition-colors duration-150 focus:outline-none ${bgClass} ${
                  isCheckedKing ? 'ring-4 ring-rose-500 ring-inset animate-pulse' : ''
                }`}
                aria-label={`Petak ${square} ${piece ? `${piece.color} ${piece.type}` : 'kosong'}`}
              >
                {/* Notasi Koordinat di Petak Tepi */}
                {fileIdx === 0 && (
                  <span
                    className={`absolute top-0.5 left-1 text-[9px] font-bold sm:text-[11px] pointer-events-none ${
                      isLight ? 'text-[#739552]' : 'text-[#ebecd0]'
                    }`}
                  >
                    {rank}
                  </span>
                )}
                {rankIdx === 7 && (
                  <span
                    className={`absolute right-1 bottom-0.5 text-[9px] font-bold sm:text-[11px] pointer-events-none ${
                      isLight ? 'text-[#739552]' : 'text-[#ebecd0]'
                    }`}
                  >
                    {file}
                  </span>
                )}

                {/* Render Bidak Catur */}
                {piece && (
                  <div className="relative z-10 flex h-full w-full items-center justify-center transition-transform duration-100 hover:scale-105 active:scale-95">
                    <ChessPiece
                      type={piece.type}
                      color={piece.color}
                      className="h-full w-full drop-shadow-md"
                    />
                  </div>
                )}

                {/* Indikator Langkah Legal (Titik untuk petak kosong, Cincin untuk memakan) */}
                {isLegal && !piece && (
                  <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                    <div className="h-3.5 w-3.5 sm:h-4 sm:w-4 rounded-full bg-black/25 transition-transform hover:scale-125" />
                  </div>
                )}

                {isLegal && piece && (
                  <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                    <div className="h-full w-full rounded-full border-4 sm:border-[5px] border-black/30 bg-black/10 ring-2 ring-black/20" />
                  </div>
                )}
              </button>
            )
          })
        )}
      </div>
    </div>
  )
}

