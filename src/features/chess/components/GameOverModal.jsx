/**
 * Modal Hasil Akhir Pertandingan (Game Over)
 */

import { RotateCcw, Settings, Timer, Trophy, XCircle } from 'lucide-react'

export const GameOverModal = ({
  gameResult,
  playerColor = 'w',
  onRestartSame = () => {},
  onOpenNewGame = () => {},
}) => {
  if (!gameResult?.isOver) return null

  const isPlayerWinner = gameResult.winner === playerColor
  const isDraw = gameResult.winner === 'draw'
  const isTimeout = gameResult.reason?.includes('Waktu') || gameResult.reason?.includes('Timeout')

  let title = 'Kemenangan Gemilang!'
  let subtext = 'Selamat! Anda berhasil menaklukkan AI komputer dengan strategi yang luar biasa.'
  let badgeColor = 'bg-amber-500/20 text-amber-300 border-amber-500/40'

  if (isDraw) {
    title = 'Pertandingan Seri (Remis)'
    subtext = 'Kedua pihak bermain seimbang tanpa celah untuk meraih kemenangan.'
    badgeColor = 'bg-blue-500/20 text-blue-300 border-blue-500/40'
  } else if (isTimeout) {
    if (isPlayerWinner) {
      title = 'Menang Karena Waktu Lawan Habis!'
      subtext = 'AI komputer kehabisan waktu berpikir pada jam catur. Kemenangan taktis milik Anda!'
      badgeColor = 'bg-amber-500/20 text-amber-300 border-amber-500/40'
    } else {
      title = 'Waktu Berpikir Anda Habis'
      subtext = 'Jam catur Anda mencapai 00:00. Di format waktu cepat, manajemen waktu adalah kunci utama.'
      badgeColor = 'bg-rose-500/20 text-rose-300 border-rose-500/40'
    }
  } else if (!isPlayerWinner) {
    title = 'Komputer Memenangkan Laga'
    subtext = 'Lawan berhasil menemukan celah taktis. Jangan menyerah, coba lagi!'
    badgeColor = 'bg-rose-500/20 text-rose-300 border-rose-500/40'
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4 animate-in fade-in duration-300">
      <div className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 p-6 sm:p-8 shadow-2xl text-center">
        {/* Ikon Banner */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/25">
          {isPlayerWinner ? (
            <Trophy className="h-9 w-9 animate-bounce" />
          ) : isTimeout ? (
            <Timer className="h-9 w-9 text-rose-200 animate-pulse" />
          ) : isDraw ? (
            <RotateCcw className="h-9 w-9" />
          ) : (
            <XCircle className="h-9 w-9 text-rose-200" />
          )}
        </div>

        <h2 className="mt-4 text-2xl font-black text-slate-100">{title}</h2>

        <div className="mt-2 inline-block rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider">
          <span className={`rounded-full px-2 py-0.5 ${badgeColor}`}>{gameResult.reason}</span>
        </div>

        <p className="mt-3 text-sm text-slate-300">{subtext}</p>

        {/* Tombol Aksi */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={onRestartSame}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-400 py-3 px-4 font-semibold text-slate-950 transition-all hover:shadow-lg hover:shadow-amber-500/30 active:scale-95 cursor-pointer"
          >
            <RotateCcw className="h-4 w-4" />
            Tanding Ulang
          </button>

          <button
            type="button"
            onClick={onOpenNewGame}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 py-3 px-4 font-semibold text-slate-200 transition-all active:scale-95 cursor-pointer"
          >
            <Settings className="h-4 w-4" />
            Atur Ulang Game
          </button>
        </div>
      </div>
    </div>
  )
}

