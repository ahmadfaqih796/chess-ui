/**
 * Komponen Banner Saran Langkah Cerdas (Smart Hint Banner)
 * Menampilkan rekomendasi langkah terbaik dari AI beserta ulasan taktisnya.
 */

import { Check, Lightbulb, X } from 'lucide-react'

export const HintBanner = ({
  hint,
  onApply = () => {},
  onClose = () => {},
}) => {
  if (!hint) return null

  return (
    <div className="w-full rounded-xl border border-cyan-500/50 bg-gradient-to-r from-cyan-950/40 via-slate-900/95 to-slate-900/95 p-3.5 shadow-xl shadow-cyan-500/10 backdrop-blur-md animate-in fade-in slide-in-from-top-2 duration-200">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-2.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
            <Lightbulb className="h-5 w-5 animate-pulse" />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                Saran Langkah Master
              </span>
              <span className="rounded-md bg-cyan-400/15 border border-cyan-400/30 px-2 py-0.5 text-xs font-mono font-bold text-cyan-200">
                {hint.san} ({hint.from} ➔ {hint.to})
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-300 leading-relaxed">
              {hint.explanation}
            </p>
          </div>
        </div>

        {/* Tombol Tutup */}
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-slate-100 transition-colors shrink-0 cursor-pointer"
          aria-label="Tutup saran langkah"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Tombol Aksi Langsung */}
      <div className="mt-3 flex items-center justify-end gap-2 border-t border-slate-800/80 pt-2.5">
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg px-2.5 py-1 text-xs font-medium text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-colors cursor-pointer"
        >
          Abaikan
        </button>
        <button
          type="button"
          onClick={onApply}
          className="inline-flex items-center gap-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 px-3 py-1 text-xs font-bold text-slate-950 shadow-md shadow-cyan-500/20 transition-all hover:scale-102 active:scale-95 cursor-pointer"
        >
          <Check className="h-3.5 w-3.5 stroke-[2.5]" />
          <span>Terapkan Langkah</span>
        </button>
      </div>
    </div>
  )
}

