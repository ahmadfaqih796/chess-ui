/**
 * Modal Pemilihan Tema Visual Papan Catur (Board Theme Selector)
 * Memungkinkan pemain memilih antara tema Zamrud, Kayu Klasik, Midnight, Marmer, atau Amethyst.
 */

import { Check, Palette, X } from 'lucide-react'
import { BOARD_THEMES } from '../constants/chessConstants'
import { ChessPiece } from './ChessPiece'

export const ThemeModal = ({
  isOpen = false,
  onClose = () => {},
  currentTheme = 'emerald',
  onSelectTheme = () => {},
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-lg rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-2xl relative text-left">
        {/* Tombol Tutup */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-slate-100 transition-colors"
          aria-label="Tutup modal tema"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header Modal */}
        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <Palette className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-100">Tema Papan Catur</h2>
            <p className="text-xs text-slate-400">Sesuaikan estetika visual arena catur sesuai kenyamanan Anda.</p>
          </div>
        </div>

        {/* Daftar Pilihan Tema */}
        <div className="mt-5 space-y-2.5 max-h-[60vh] overflow-y-auto pr-1">
          {Object.values(BOARD_THEMES).map((theme) => {
            const isSelected = currentTheme === theme.id

            return (
              <button
                key={theme.id}
                type="button"
                onClick={() => {
                  onSelectTheme(theme.id)
                  onClose()
                }}
                className={`w-full flex items-center justify-between gap-3.5 rounded-xl border p-3 text-left transition-all ${
                  isSelected
                    ? 'border-amber-500 bg-amber-500/10 ring-1 ring-amber-500/50 shadow-md shadow-amber-500/10'
                    : 'border-slate-800 bg-slate-800/50 hover:bg-slate-800 hover:border-slate-700'
                }`}
              >
                {/* Pratinjau Petak Mini (Mini Preview 2x2 Grid) */}
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-slate-600 shadow-inner grid grid-cols-2 grid-rows-2">
                  <div style={{ backgroundColor: theme.lightBg }} className="flex items-center justify-center">
                    <div className="h-4 w-4">
                      <ChessPiece type="p" color="b" className="h-full w-full" />
                    </div>
                  </div>
                  <div style={{ backgroundColor: theme.darkBg }} />
                  <div style={{ backgroundColor: theme.darkBg }} />
                  <div style={{ backgroundColor: theme.lightBg }} className="flex items-center justify-center">
                    <div className="h-4 w-4">
                      <ChessPiece type="n" color="w" className="h-full w-full" />
                    </div>
                  </div>
                </div>

                {/* Deskripsi Tema */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-100">{theme.name}</span>
                    <span className="text-[10px] text-slate-400 font-medium">({theme.subtitle})</span>
                  </div>
                  <p className="mt-0.5 text-xs text-slate-400 line-clamp-1">{theme.description}</p>
                </div>

                {/* Indikator Pilihan */}
                {isSelected ? (
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500 text-slate-950 shadow-sm">
                    <Check className="h-3.5 w-3.5 stroke-[3]" />
                  </div>
                ) : (
                  <div className="h-5 w-5 shrink-0 rounded-full border border-slate-700" />
                )}
              </button>
            )
          })}
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-700 transition-colors"
          >
            Selesai
          </button>
        </div>
      </div>
    </div>
  )
}

