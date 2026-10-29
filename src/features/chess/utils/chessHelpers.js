/**
 * Fungsi-fungsi pembantu untuk analisis status papan catur
 */

import { PIECE_VALUES } from '../constants/chessConstants'

const INITIAL_PIECES = {
  p: 8,
  n: 2,
  b: 2,
  r: 2,
  q: 1,
}

/**
 * Memformat detik menjadi string menit:detik digital (MM:SS)
 * @param {number|null} seconds - Jumlah detik tersisa
 * @returns {string} Contoh: "10:00", "04:25", "∞"
 */
export const formatTime = (seconds) => {
  if (seconds === null || seconds === undefined) return '∞'
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

/**
 * Menghitung daftar bidak yang sudah dimakan oleh masing-masing pihak
 * @param {object} chess - Instance chess.js
 * @returns {object} Objek { whiteCaptured: [], blackCaptured: [], materialDiff: number }
 */
export const calculateCapturedPieces = (chess) => {
  const currentWhiteCounts = { p: 0, n: 0, b: 0, r: 0, q: 0 }
  const currentBlackCounts = { p: 0, n: 0, b: 0, r: 0, q: 0 }

  const board = chess.board()
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const piece = board[r][c]
      if (piece && piece.type !== 'k') {
        if (piece.color === 'w') {
          currentWhiteCounts[piece.type] = (currentWhiteCounts[piece.type] || 0) + 1
        } else {
          currentBlackCounts[piece.type] = (currentBlackCounts[piece.type] || 0) + 1
        }
      }
    }
  }

  // Bidak Putih yang dimakan oleh Hitam
  const whiteLost = []
  // Bidak Hitam yang dimakan oleh Putih
  const blackLost = []

  let whiteLostScore = 0
  let blackLostScore = 0

  const order = ['q', 'r', 'b', 'n', 'p']

  for (const type of order) {
    const missingWhite = Math.max(0, INITIAL_PIECES[type] - currentWhiteCounts[type])
    for (let i = 0; i < missingWhite; i++) {
      whiteLost.push(type)
      whiteLostScore += PIECE_VALUES[type]
    }

    const missingBlack = Math.max(0, INITIAL_PIECES[type] - currentBlackCounts[type])
    for (let i = 0; i < missingBlack; i++) {
      blackLost.push(type)
      blackLostScore += PIECE_VALUES[type]
    }
  }

  // Material difference dari sudut pandang Putih (jika positif, Putih unggul)
  const scoreDifference = (blackLostScore - whiteLostScore) / 100

  return {
    whiteCaptured: blackLost, // Bidak Hitam yang berhasil dimakan oleh Putih
    blackCaptured: whiteLost, // Bidak Putih yang berhasil dimakan oleh Hitam
    whiteAdvantage: scoreDifference > 0 ? `+${scoreDifference}` : '',
    blackAdvantage: scoreDifference < 0 ? `+${Math.abs(scoreDifference)}` : '',
  }
}

/**
 * Mengelompokkan riwayat langkah menjadi pasangan langkah (Langkah 1: Putih, Hitam)
 * @param {Array} history - Array notasi SAN dari chess.history()
 * @returns {Array} Array objek { roundNumber, white, black }
 */
export const formatMoveHistory = (history = []) => {
  const formatted = []
  for (let i = 0; i < history.length; i += 2) {
    formatted.push({
      roundNumber: Math.floor(i / 2) + 1,
      white: history[i] || '',
      black: history[i + 1] || '',
    })
  }
  return formatted
}

