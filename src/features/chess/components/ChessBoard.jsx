/**
 * Komponen Papan Catur Utama
 * Menangani render petak 8x8, penyesuaian tema warna dinamis, highlight langkah, indikator skak, dan interaksi sentuh/klik.
 */

import { BOARD_THEMES } from '../constants/chessConstants'
import { ChessPiece } from './ChessPiece'

export const ChessBoard = ({
  chess,
  boardTheme = 'emerald',
  isFlipped = false,
  selectedSquare = null,
  legalMoves = [],
  lastMove = null,
  hint = null,
  onSquareClick = () => {},
}) => {
  const currentTheme = BOARD_THEMES[boardTheme] || BOARD_THEMES.emerald

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
            const isHintFrom = hint && hint.from === square
            const isHintTo = hint && hint.to === square

            // Tentukan warna latar petak berdasarkan tema aktif
            let squareBg = isLight ? currentTheme.lightBg : currentTheme.darkBg
            if (isSelected) {
              squareBg = isLight ? currentTheme.selectedLight : currentTheme.selectedDark
            } else if (isLastMove) {
              squareBg = isLight ? currentTheme.lastMoveLight : currentTheme.lastMoveDark
            }

            // Kelas efek ring untuk skak dan petunjuk
            let statusRing = ''
            if (isCheckedKing) {
              statusRing = 'ring-4 ring-rose-500 ring-inset animate-pulse z-20'
            } else if (isHintFrom) {
              statusRing = 'ring-4 ring-cyan-400 ring-inset shadow-lg shadow-cyan-400/50 animate-pulse z-20'
            } else if (isHintTo) {
              statusRing = 'ring-4 ring-emerald-400 ring-inset shadow-lg shadow-emerald-400/50 animate-pulse z-20'
            }

            return (
              <button
                key={square}
                type="button"
                onClick={() => onSquareClick(square)}
                style={{ backgroundColor: squareBg }}
                className={`relative flex aspect-square w-full items-center justify-center p-1 transition-colors duration-150 focus:outline-none ${statusRing}`}
                aria-label={`Petak ${square} ${piece ? `${piece.color} ${piece.type}` : 'kosong'}`}
              >
                {/* Badge Label Petunjuk */}
                {isHintFrom && (
                  <span className="absolute top-0.5 right-0.5 z-30 rounded bg-cyan-400 px-1 py-0.2 text-[7px] sm:text-[9px] font-black text-slate-950 pointer-events-none shadow">
                    ASAL
                  </span>
                )}
                {isHintTo && (
                  <span className="absolute top-0.5 right-0.5 z-30 rounded bg-emerald-400 px-1 py-0.2 text-[7px] sm:text-[9px] font-black text-slate-950 pointer-events-none shadow">
                    TUJUAN
                  </span>
                )}
                {/* Notasi Koordinat di Petak Tepi */}
                {fileIdx === 0 && (
                  <span
                    style={{ color: isLight ? currentTheme.darkBg : currentTheme.lightBg }}
                    className="absolute top-0.5 left-1 text-[9px] font-bold sm:text-[11px] pointer-events-none opacity-85"
                  >
                    {rank}
                  </span>
                )}
                {rankIdx === 7 && (
                  <span
                    style={{ color: isLight ? currentTheme.darkBg : currentTheme.lightBg }}
                    className="absolute right-1 bottom-0.5 text-[9px] font-bold sm:text-[11px] pointer-events-none opacity-85"
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
