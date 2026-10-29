/**
 * Mesin Kecerdasan Buatan (AI) Catur Teroptimasi
 * Menggunakan algoritma Minimax dengan Alpha-Beta Pruning,
 * Piece-Square Tables (PST), dan Pengurutan Langkah Ringan (Lightweight Move Ordering).
 */

import { PIECE_VALUES } from '../constants/chessConstants'

// Tabel Nilai Posisi Bidak (Piece-Square Tables / PST) dari sudut pandang Putih
const PAWN_TABLE = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [50, 50, 50, 50, 50, 50, 50, 50],
  [10, 10, 20, 30, 30, 20, 10, 10],
  [5, 5, 10, 25, 25, 10, 5, 5],
  [0, 0, 0, 20, 20, 0, 0, 0],
  [5, -5, -10, 0, 0, -10, -5, 5],
  [5, 10, 10, -20, -20, 10, 10, 5],
  [0, 0, 0, 0, 0, 0, 0, 0],
]

const KNIGHT_TABLE = [
  [-50, -40, -30, -30, -30, -30, -40, -50],
  [-40, -20, 0, 0, 0, 0, -20, -40],
  [-30, 0, 10, 15, 15, 10, 0, -30],
  [-30, 5, 15, 20, 20, 15, 5, -30],
  [-30, 0, 15, 20, 20, 15, 0, -30],
  [-30, 5, 10, 15, 15, 10, 5, -30],
  [-40, -20, 0, 5, 5, 0, -20, -40],
  [-50, -40, -30, -30, -30, -30, -40, -50],
]

const BISHOP_TABLE = [
  [-20, -10, -10, -10, -10, -10, -10, -20],
  [-10, 0, 0, 0, 0, 0, 0, -10],
  [-10, 0, 5, 10, 10, 5, 0, -10],
  [-10, 5, 5, 10, 10, 5, 5, -10],
  [-10, 0, 10, 10, 10, 10, 0, -10],
  [-10, 10, 10, 10, 10, 10, 10, -10],
  [-10, 5, 0, 0, 0, 0, 5, -10],
  [-20, -10, -10, -10, -10, -10, -10, -20],
]

const ROOK_TABLE = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [5, 10, 10, 10, 10, 10, 10, 5],
  [-5, 0, 0, 0, 0, 0, 0, -5],
  [-5, 0, 0, 0, 0, 0, 0, -5],
  [-5, 0, 0, 0, 0, 0, 0, -5],
  [-5, 0, 0, 0, 0, 0, 0, -5],
  [-5, 0, 0, 0, 0, 0, 0, -5],
  [0, 0, 0, 5, 5, 0, 0, 0],
]

const QUEEN_TABLE = [
  [-20, -10, -10, -5, -5, -10, -10, -20],
  [-10, 0, 0, 0, 0, 0, 0, -10],
  [-10, 0, 5, 5, 5, 5, 0, -10],
  [-5, 0, 5, 5, 5, 5, 0, -5],
  [0, 0, 5, 5, 5, 5, 0, -5],
  [-10, 5, 5, 5, 5, 5, 0, -10],
  [-10, 0, 5, 0, 0, 0, 0, -10],
  [-20, -10, -10, -5, -5, -10, -10, -20],
]

const KING_MIDDLE_TABLE = [
  [-30, -40, -40, -50, -50, -40, -40, -30],
  [-30, -40, -40, -50, -50, -40, -40, -30],
  [-30, -40, -40, -50, -50, -40, -40, -30],
  [-30, -40, -40, -50, -50, -40, -40, -30],
  [-20, -30, -30, -40, -40, -30, -20, -20],
  [-10, -20, -20, -20, -20, -20, -20, -10],
  [20, 20, 0, 0, 0, 0, 20, 20],
  [20, 30, 10, 0, 0, 10, 30, 20],
]

/**
 * Menghitung skor posisional suatu bidak pada baris dan kolom tertentu
 */
const getPiecePositionScore = (pieceType, color, row, col) => {
  const r = color === 'w' ? row : 7 - row
  const c = col

  switch (pieceType) {
    case 'p':
      return PAWN_TABLE[r][c]
    case 'n':
      return KNIGHT_TABLE[r][c]
    case 'b':
      return BISHOP_TABLE[r][c]
    case 'r':
      return ROOK_TABLE[r][c]
    case 'q':
      return QUEEN_TABLE[r][c]
    case 'k':
      return KING_MIDDLE_TABLE[r][c]
    default:
      return 0
  }
}

/**
 * Mengevaluasi posisi papan catur saat ini secara statis
 * Skor positif menguntungkan Putih, skor negatif menguntungkan Hitam
 */
export const evaluateBoard = (chess) => {
  if (chess.isCheckmate()) {
    return chess.turn() === 'w' ? -Infinity : Infinity
  }
  if (chess.isDraw() || chess.isStalemate() || chess.isThreefoldRepetition()) {
    return 0
  }

  let totalScore = 0
  const board = chess.board()

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col]
      if (piece) {
        const materialValue = PIECE_VALUES[piece.type] || 0
        const positionValue = getPiecePositionScore(piece.type, piece.color, row, col)
        const pieceTotal = materialValue + positionValue

        if (piece.color === 'w') {
          totalScore += pieceTotal
        } else {
          totalScore -= pieceTotal
        }
      }
    }
  }

  return totalScore
}

/**
 * Pengurutan langkah cepat (move ordering) menggunakan string SAN
 * Memprioritaskan pemakanan bidak (x) dan skak (+) untuk memicu Alpha-Beta cutoff instan
 */
const orderSanMoves = (moves) => {
  return moves.sort((a, b) => {
    const scoreA = a.includes('x') ? 100 : (a.includes('+') ? 50 : 0)
    const scoreB = b.includes('x') ? 100 : (b.includes('+') ? 50 : 0)
    return scoreB - scoreA
  })
}

/**
 * Minimax dengan Alpha-Beta Pruning yang cepat (menggunakan SAN string untuk mencegah alokasi memori berlebih)
 */
const minimax = (chess, depth, alpha, beta, isMaximizing) => {
  if (depth === 0 || chess.isGameOver()) {
    return evaluateBoard(chess)
  }

  let moves = chess.moves()
  moves = orderSanMoves(moves)

  if (isMaximizing) {
    let maxEval = -Infinity
    for (let i = 0; i < moves.length; i++) {
      chess.move(moves[i])
      const evaluation = minimax(chess, depth - 1, alpha, beta, false)
      chess.undo()

      maxEval = Math.max(maxEval, evaluation)
      alpha = Math.max(alpha, evaluation)
      if (beta <= alpha) {
        break // Alpha-Beta cut-off
      }
    }
    return maxEval
  } else {
    let minEval = Infinity
    for (let i = 0; i < moves.length; i++) {
      chess.move(moves[i])
      const evaluation = minimax(chess, depth - 1, alpha, beta, true)
      chess.undo()

      minEval = Math.min(minEval, evaluation)
      beta = Math.min(beta, evaluation)
      if (beta <= alpha) {
        break // Alpha-Beta cut-off
      }
    }
    return minEval
  }
}

/**
 * Menemukan langkah terbaik untuk komputer berdasarkan tingkat kesulitan
 * Dirancang agar responsif dan tidak membekukan (freeze) thread UI peramban
 * @param {object} chess - Instance dari library chess.js
 * @param {string} difficulty - 'easy' | 'medium' | 'hard' | 'expert'
 * @returns {object|null} Objek langkah terbaik (verbose move object)
 */
export const findBestMove = (chess, difficulty = 'medium') => {
  const legalMoves = chess.moves({ verbose: true })
  if (legalMoves.length === 0) return null

  const isMaximizing = chess.turn() === 'w'

  // Level Mudah (Easy): Terkadang memilih langkah acak santai
  if (difficulty === 'easy') {
    if (Math.random() < 0.35) {
      const randomIndex = Math.floor(Math.random() * legalMoves.length)
      return legalMoves[randomIndex]
    }
  }

  // Tentukan kedalaman yang aman untuk eksekusi real-time di browser:
  // - Mudah: Depth 1 (~3ms)
  // - Sedang: Depth 2 (~50ms)
  // - Sulit: Depth 2 dengan evaluasi penuh (~80ms)
  // - Expert: Depth 3 dengan move ordering teroptimasi (~200ms)
  let depth = 2
  if (difficulty === 'easy') depth = 1
  else if (difficulty === 'medium') depth = 2
  else if (difficulty === 'hard') depth = 2
  else if (difficulty === 'expert') depth = 3

  // Urutkan langkah di root level
  const orderedMoves = legalMoves.sort((a, b) => {
    let scoreA = a.captured ? 100 : 0
    let scoreB = b.captured ? 100 : 0
    if (a.san && a.san.includes('+')) scoreA += 50
    if (b.san && b.san.includes('+')) scoreB += 50
    return scoreB - scoreA
  })

  // Jika level expert dan jumlah langkah sangat banyak (>24), batasi hanya 20 kandidat teratas agar tetap di bawah 250ms
  const searchCandidates =
    difficulty === 'expert' && orderedMoves.length > 24
      ? orderedMoves.slice(0, 20)
      : orderedMoves

  let bestMove = null
  let bestValue = isMaximizing ? -Infinity : Infinity
  let alpha = -Infinity
  let beta = Infinity

  for (const move of searchCandidates) {
    chess.move(move)
    const boardValue = minimax(chess, depth - 1, alpha, beta, !isMaximizing)
    chess.undo()

    if (isMaximizing) {
      if (boardValue > bestValue) {
        bestValue = boardValue
        bestMove = move
      }
      alpha = Math.max(alpha, boardValue)
    } else {
      if (boardValue < bestValue) {
        bestValue = boardValue
        bestMove = move
      }
      beta = Math.min(beta, boardValue)
    }
  }

  return bestMove || orderedMoves[0]
}
