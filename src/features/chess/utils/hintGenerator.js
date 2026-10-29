/**
 * Generator Petunjuk Cerdas (Smart Hint Generator)
 * Menganalisis posisi papan dan merumuskan saran taktik terbaik beserta penjelasannya.
 */

import { PIECE_NAMES, PIECE_VALUES } from '../constants/chessConstants'
import { findBestMove } from './ai'

/**
 * Menghasilkan teks penjelasan taktis berdasarkan karakteristik langkah
 */
const getHintExplanation = (bestMove, pieceName, targetPieceName) => {
  // 1. Promosi Pion
  if (bestMove.promotion) {
    return `Dorong ${pieceName} ke petak ${bestMove.to} untuk promosi menjadi Ratu dan raih keunggulan materi mutlak!`
  }

  // 2. Rokade (Castling)
  if (bestMove.san === 'O-O' || bestMove.san === 'O-O-O') {
    return `Lakukan Rokade (${bestMove.san === 'O-O' ? 'Sayap Raja' : 'Sayap Ratu'}) untuk mengamankan posisi Raja Anda ke sudut dan mengaktifkan Benteng.`
  }

  // 3. Skakmat atau Skak
  if (bestMove.san.includes('#')) {
    return `Langkahkan ${pieceName} ke ${bestMove.to} untuk memberikan SKAKMAT langsung pada Raja lawan!`
  }
  if (bestMove.san.includes('+')) {
    return `Langkahkan ${pieceName} ke ${bestMove.to} untuk memberi Skak dan memaksa Raja lawan bergerak dari posisinya.`
  }

  // 4. Memakan Bidak Bernilai Lebih Tinggi (Taktik Menguntungkan)
  if (bestMove.captured) {
    const myPieceVal = PIECE_VALUES[bestMove.piece] || 0
    const targetPieceVal = PIECE_VALUES[bestMove.captured] || 0

    if (targetPieceVal > myPieceVal) {
      return `Makan ${targetPieceName} lawan di ${bestMove.to} menggunakan ${pieceName}! Pertukaran materi ini sangat menguntungkan Anda.`
    }
    return `Rebut ${targetPieceName} lawan di petak ${bestMove.to} untuk memenangkan materi dan mengurangi kekuatan lawan.`
  }

  // 5. Penguasaan Petak Pusat (e4, d4, e5, d5)
  if (['e4', 'd4', 'e5', 'd5'].includes(bestMove.to)) {
    return `Kembangkan ${pieceName} ke petak tengah ${bestMove.to} untuk mendominasi pusat papan dan membuka ruang serangan.`
  }

  // 6. Manuver Kuda & Gajah di Awal Permainan
  if (['n', 'b'].includes(bestMove.piece) && ['3', '6'].includes(bestMove.to[1])) {
    return `Aktifkan ${pieceName} ke petak ${bestMove.to} untuk meningkatkan mobilitas perwira dan menekan petak-petak penting lawan.`
  }

  // 7. Penguasaan Baris Terbuka oleh Benteng
  if (bestMove.piece === 'r' && ['d', 'e'].includes(bestMove.to[0])) {
    return `Posisikan Benteng di lajur tengah ${bestMove.to} untuk menguasai jalur terbuka ke daerah pertahanan lawan.`
  }

  // 8. Taktik Posisi Umum
  return `Langkahkan ${pieceName} dari ${bestMove.from} ke ${bestMove.to} untuk memperbaiki struktur koordinasi bidak dan mempersiapkan serangan.`
}

/**
 * Menghasilkan petunjuk langkah terbaik beserta penjelasan taktis berbahasa Indonesia
 * @param {object} chess - Instance chess.js
 * @returns {object|null} Objek petunjuk atau null jika tidak ada langkah legal
 */
export const generateHint = (chess) => {
  if (!chess || chess.isGameOver()) return null

  // Cari langkah taktis terbaik secara kilat (tanpa membekukan UI thread)
  const bestMove = findBestMove(chess, 'hard')
  if (!bestMove) return null

  const pieceName = PIECE_NAMES[bestMove.piece] || 'Bidak'
  const targetPieceName = bestMove.captured ? PIECE_NAMES[bestMove.captured] : null
  const explanation = getHintExplanation(bestMove, pieceName, targetPieceName)

  return {
    from: bestMove.from,
    to: bestMove.to,
    san: bestMove.san,
    piece: bestMove.piece,
    pieceName,
    captured: bestMove.captured,
    explanation,
  }
}
