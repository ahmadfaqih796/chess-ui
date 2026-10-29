/**
 * Komponen Tombol Kontrol Permainan (Toolbar Catur)
 */

import {
  ArrowLeftRight,
  Palette,
  PlusCircle,
  RotateCcw,
  Volume2,
  VolumeX,
} from 'lucide-react'

export const GameControls = ({
  onOpenNewGame = () => {},
  onOpenThemeModal = () => {},
  onUndo = () => {},
  onToggleFlip = () => {},
  onToggleMute = () => {},
  canUndo = false,
  isMuted = false,
  isThinking = false,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-slate-800 bg-slate-900/80 p-2.5 shadow-lg backdrop-blur-md">
      <div className="flex items-center gap-2">
        {/* Tombol Game Baru */}
        <button
          type="button"
          onClick={onOpenNewGame}
          className="inline-flex items-center gap-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 px-3 py-2 text-xs font-bold text-slate-950 transition-all hover:shadow-md hover:shadow-amber-500/20 active:scale-95 cursor-pointer"
        >
          <PlusCircle className="h-4 w-4" />
          <span>Game Baru</span>
        </button>

        {/* Tombol Undo */}
        <button
          type="button"
          onClick={onUndo}
          disabled={!canUndo || isThinking}
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-xs font-semibold text-slate-200 transition-all hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 cursor-pointer"
          title="Batalkan 1 langkah ke belakang"
        >
          <RotateCcw className="h-4 w-4" />
          <span>Batal (Undo)</span>
        </button>
      </div>

      <div className="flex items-center gap-1.5">
        {/* Tombol Pemilihan Tema Papan */}
        <button
          type="button"
          onClick={onOpenThemeModal}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700/80 bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-amber-400 transition-colors cursor-pointer"
          title="Ubah Tema Warna Papan"
          aria-label="Ubah Tema Warna Papan"
        >
          <Palette className="h-4 w-4" />
        </button>

        {/* Tombol Putar Papan */}
        <button
          type="button"
          onClick={onToggleFlip}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700/80 bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-slate-100 transition-colors cursor-pointer"
          title="Putar Orientasi Papan"
          aria-label="Putar Orientasi Papan"
        >
          <ArrowLeftRight className="h-4 w-4" />
        </button>

        {/* Tombol Suara (Mute/Unmute) */}
        <button
          type="button"
          onClick={onToggleMute}
          className={`flex h-9 w-9 items-center justify-center rounded-lg border transition-colors cursor-pointer ${
            isMuted
              ? 'border-rose-500/40 bg-rose-500/10 text-rose-400'
              : 'border-slate-700/80 bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-slate-100'
          }`}
          title={isMuted ? 'Nyalakan Efek Suara' : 'Matikan Efek Suara'}
          aria-label="Toggle Suara"
        >
          {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </button>
      </div>
    </div>
  )
}

