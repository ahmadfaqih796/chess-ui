/**
 * Modal Pilihan Promosi Pion (Queen, Rook, Bishop, Knight)
 */

import { ChessPiece } from './ChessPiece'

export const PromotionModal = ({ color = 'w', onSelect = () => {}, onCancel = () => {} }) => {
  const pieces = [
    { type: 'q', name: 'Ratu' },
    { type: 'r', name: 'Benteng' },
    { type: 'b', name: 'Gajah' },
    { type: 'n', name: 'Kuda' },
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-sm rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-2xl text-center">
        <h3 className="text-lg font-bold text-slate-100">Promosi Pion</h3>
        <p className="mt-1 text-xs text-slate-400">
          Pion Anda telah mencapai petak akhir! Pilih bidak pengganti yang diinginkan:
        </p>

        <div className="mt-5 grid grid-cols-4 gap-3">
          {pieces.map((item) => (
            <button
              key={item.type}
              type="button"
              onClick={() => onSelect(item.type)}
              className="group flex flex-col items-center justify-center rounded-xl border border-slate-700/80 bg-slate-800/80 p-3 transition-all hover:-translate-y-1 hover:border-amber-500/80 hover:bg-slate-700/80 hover:shadow-lg hover:shadow-amber-500/20 active:translate-y-0"
            >
              <div className="h-12 w-12 transition-transform group-hover:scale-110">
                <ChessPiece type={item.type} color={color} className="h-full w-full drop-shadow-md" />
              </div>
              <span className="mt-2 text-xs font-medium text-slate-300 group-hover:text-amber-400">
                {item.name}
              </span>
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={onCancel}
          className="mt-5 w-full rounded-lg border border-slate-700 py-2 text-xs font-medium text-slate-400 transition-colors hover:bg-slate-800 hover:text-slate-200"
        >
          Batalkan Langkah
        </button>
      </div>
    </div>
  )
}

