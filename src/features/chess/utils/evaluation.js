/**
 * Utilitas untuk Menghitung Bar Evaluasi (Evaluation Bar)
 * Menerjemahkan skor posisional ke dalam persentase bar dan teks keunggulan.
 */

import { evaluateBoard } from './ai'

/**
 * Menghitung status evaluasi keunggulan posisi papan saat ini
 * @param {object} chess - Instance chess.js
 * @returns {object} Objek evaluasi { score, formatted, whitePercentage, isCheckmate }
 */
export const calculateEvaluation = (chess) => {
  if (!chess) {
    return {
      score: 0,
      formatted: '0.0',
      whitePercentage: 50,
      isCheckmate: false,
    }
  }

  // Jika kondisi skakmat
  if (chess.isCheckmate()) {
    const isWhiteWon = chess.turn() === 'b'
    return {
      score: isWhiteWon ? Infinity : -Infinity,
      formatted: isWhiteWon ? 'M' : '-M',
      whitePercentage: isWhiteWon ? 100 : 0,
      isCheckmate: true,
    }
  }

  // Jika remis
  if (chess.isDraw() || chess.isStalemate() || chess.isThreefoldRepetition()) {
    return {
      score: 0,
      formatted: '0.0',
      whitePercentage: 50,
      isCheckmate: false,
    }
  }

  // Skor statis dari AI (centipawns: 100 poin = 1 pion)
  const totalScore = evaluateBoard(chess)
  const scoreInPawns = totalScore / 100

  // Format teks keunggulan (misal: +1.5, -2.0, 0.0)
  let formatted = '0.0'
  if (scoreInPawns > 0.05) {
    formatted = `+${scoreInPawns.toFixed(1)}`
  } else if (scoreInPawns < -0.05) {
    formatted = scoreInPawns.toFixed(1)
  }

  // Konversi skor ke persentase bar menggunakan fungsi logistik (sigmoid)
  // Skor 0 = 50%, Skor +300 (+3 pion) ~ 74%, Skor +600 (+6 pion) ~ 89%
  const rawPercentage = 100 / (1 + Math.exp(-0.0035 * totalScore))

  // Batasi rentang antara 4% dan 96% agar bar lawan tidak hilang sama sekali sebelum skakmat
  const whitePercentage = Math.min(Math.max(rawPercentage, 4), 96)

  return {
    score: totalScore,
    formatted,
    whitePercentage,
    isCheckmate: false,
  }
}

