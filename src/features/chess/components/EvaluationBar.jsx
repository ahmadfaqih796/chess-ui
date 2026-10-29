/**
 * Komponen Bar Evaluasi Real-time (Evaluation Bar)
 * Menampilkan bar vertikal keunggulan posisi ala Lichess/Chess.com
 */

export const EvaluationBar = ({ evaluation, isFlipped = false }) => {
  const { score, formatted, whitePercentage } = evaluation || {
    score: 0,
    formatted: '0.0',
    whitePercentage: 50,
  }

  // Jika papan dibalik (Hitam di bawah), urutan warna bar dibalik
  // Normal (Putih di bawah): Atas = Hitam, Bawah = Putih
  // Flipped (Hitam di bawah): Atas = Putih, Bawah = Hitam
  const topPercentage = isFlipped ? whitePercentage : 100 - whitePercentage
  const bottomPercentage = isFlipped ? 100 - whitePercentage : whitePercentage

  const topIsWhite = isFlipped
  const bottomIsWhite = !isFlipped

  // Tentukan apakah teks skor ditampilkan di bagian atas atau bawah
  // Skor positif menguntungkan Putih, negatif menguntungkan Hitam
  const isWhiteAdvantage = score >= 0
  const showTextOnTop = isFlipped ? isWhiteAdvantage : !isWhiteAdvantage
  const showTextOnBottom = !showTextOnTop

  // Teks pembantu untuk tooltip
  let tooltipText = 'Posisi Seimbang (0.0)'
  if (score > 50) {
    tooltipText = `Keunggulan Bidak Putih (${formatted})`
  } else if (score < -50) {
    tooltipText = `Keunggulan Bidak Hitam (${formatted})`
  }

  return (
    <div
      className="relative flex self-stretch w-4 sm:w-6 flex-shrink-0 flex-col overflow-hidden rounded-xl border border-slate-700/80 bg-slate-950 shadow-xl ring-1 ring-white/5 select-none"
      title={tooltipText}
      aria-label={tooltipText}
    >
      {/* Segmen Atas */}
      <div
        style={{ flex: `${topPercentage} 1 0%` }}
        className={`relative w-full transition-[flex] duration-500 ease-out flex items-start justify-center pt-1.5 overflow-hidden ${
          topIsWhite ? 'bg-slate-100' : 'bg-slate-900'
        }`}
      >
        {showTextOnTop && (
          <span
            className={`text-[9px] sm:text-[10px] font-black tracking-tight leading-none px-0.5 select-none ${
              topIsWhite ? 'text-slate-950' : 'text-slate-100'
            }`}
          >
            {formatted}
          </span>
        )}
      </div>

      {/* Segmen Bawah */}
      <div
        style={{ flex: `${bottomPercentage} 1 0%` }}
        className={`relative w-full transition-[flex] duration-500 ease-out flex items-end justify-center pb-1.5 overflow-hidden ${
          bottomIsWhite ? 'bg-slate-100' : 'bg-slate-900'
        }`}
      >
        {showTextOnBottom && (
          <span
            className={`text-[9px] sm:text-[10px] font-black tracking-tight leading-none px-0.5 select-none ${
              bottomIsWhite ? 'text-slate-950' : 'text-slate-100'
            }`}
          >
            {formatted}
          </span>
        )}
      </div>
    </div>
  )
}
