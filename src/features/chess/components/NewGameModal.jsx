/**
 * Modal Pengaturan & Pemilihan Game Baru (Pilih Sisi & Tingkat Kesulitan)
 */

import { Check, Swords, X } from 'lucide-react'
import { useState } from 'react'
import { DIFFICULTY_LEVELS } from '../constants/chessConstants'
import { ChessPiece } from './ChessPiece'

export const NewGameModal = ({
  isOpen = false,
  onClose = () => {},
  currentSide = 'w',
  currentDifficulty = 'medium',
  onStartGame = () => {},
}) => {
  const [selectedSide, setSelectedSide] = useState(currentSide)
  const [selectedDifficulty, setSelectedDifficulty] = useState(currentDifficulty)

  if (!isOpen) return null

  const handleStart = () => {
    onStartGame(selectedSide, selectedDifficulty)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-lg rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-2xl relative text-left">
        {/* Tombol Tutup */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-slate-100 transition-colors"
          aria-label="Tutup modal"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <Swords className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-100">Mulai Game Baru</h2>
            <p className="text-xs text-slate-400">Faqih Chess • Atur warna bidak dan tingkat kecerdasan komputer.</p>
          </div>
        </div>

        {/* 1. Pilih Sisi Bidak */}
        <div className="mt-6">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            1. Pilih Warna Bidak Anda
          </label>
          <div className="mt-2.5 grid grid-cols-2 gap-3">
            {/* Opsi Putih */}
            <button
              type="button"
              onClick={() => setSelectedSide('w')}
              className={`relative flex items-center gap-3 rounded-xl border p-3.5 text-left transition-all ${
                selectedSide === 'w'
                  ? 'border-amber-500 bg-amber-500/10 ring-1 ring-amber-500/50 shadow-md shadow-amber-500/10'
                  : 'border-slate-800 bg-slate-800/60 hover:bg-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="h-10 w-10 flex-shrink-0 rounded-lg bg-slate-200 p-1 shadow">
                <ChessPiece type="k" color="w" className="h-full w-full drop-shadow" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-slate-100">Bidak Putih</span>
                  {selectedSide === 'w' && <Check className="h-4 w-4 text-amber-400" />}
                </div>
                <span className="text-[11px] text-slate-400">Melangkah Pertama</span>
              </div>
            </button>

            {/* Opsi Hitam */}
            <button
              type="button"
              onClick={() => setSelectedSide('b')}
              className={`relative flex items-center gap-3 rounded-xl border p-3.5 text-left transition-all ${
                selectedSide === 'b'
                  ? 'border-amber-500 bg-amber-500/10 ring-1 ring-amber-500/50 shadow-md shadow-amber-500/10'
                  : 'border-slate-800 bg-slate-800/60 hover:bg-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="h-10 w-10 flex-shrink-0 rounded-lg bg-slate-950 p-1 border border-slate-700 shadow">
                <ChessPiece type="k" color="b" className="h-full w-full drop-shadow" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-slate-100">Bidak Hitam</span>
                  {selectedSide === 'b' && <Check className="h-4 w-4 text-amber-400" />}
                </div>
                <span className="text-[11px] text-slate-400">Komputer Gerak Duluan</span>
              </div>
            </button>
          </div>
        </div>

        {/* 2. Pilih Tingkat Kesulitan */}
        <div className="mt-6">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            2. Tingkat Kesulitan AI Komputer
          </label>
          <div className="mt-2.5 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {Object.values(DIFFICULTY_LEVELS).map((level) => {
              const isSelected = selectedDifficulty === level.id

              return (
                <button
                  key={level.id}
                  type="button"
                  onClick={() => setSelectedDifficulty(level.id)}
                  className={`relative flex flex-col justify-between rounded-xl border p-3 text-left transition-all ${
                    isSelected
                      ? 'border-amber-500 bg-amber-500/10 ring-1 ring-amber-500/50 shadow-md shadow-amber-500/10'
                      : 'border-slate-800 bg-slate-800/50 hover:bg-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-slate-100">{level.name}</span>
                    <span className={`rounded-md px-1.5 py-0.5 text-[10px] font-semibold border ${level.badgeColor}`}>
                      {level.subtitle}
                    </span>
                  </div>
                  <p className="mt-1.5 text-[11px] text-slate-400 leading-relaxed line-clamp-2">
                    {level.description}
                  </p>
                </button>
              )
            })}
          </div>
        </div>

        {/* Tombol Mulai */}
        <div className="mt-7 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-700 px-4 py-2.5 text-xs font-semibold text-slate-300 hover:bg-slate-800 transition-colors"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={handleStart}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 py-2.5 px-4 font-bold text-sm text-slate-950 shadow-lg shadow-amber-500/20 transition-all active:scale-95"
          >
            <Swords className="h-4 w-4" />
            Mulai Pertandingan Sekarang
          </button>
        </div>
      </div>
    </div>
  )
}
