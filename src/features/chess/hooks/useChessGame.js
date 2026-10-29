/**
 * Custom Hook untuk Logika Permainan Catur
 * Mengelola state papan secara fungsional & reaktif tanpa pelanggaran Rules of React.
 */

import confetti from 'canvas-confetti'
import { Chess } from 'chess.js'
import { useState } from 'react'
import { findBestMove } from '../utils/ai'
import {
  playCaptureSound,
  playCheckSound,
  playDefeatSound,
  playMoveSound,
  playVictorySound,
} from '../utils/audio'
import { calculateCapturedPieces, formatMoveHistory } from '../utils/chessHelpers'

export const useChessGame = () => {
  // Instance chess.js disimpan langsung sebagai state murni React
  const [game, setGame] = useState(() => new Chess())

  // Konfigurasi pemain & tema
  const [playerColor, setPlayerColor] = useState('w') // 'w' = Putih, 'b' = Hitam
  const [difficulty, setDifficulty] = useState('medium') // 'easy' | 'medium' | 'hard' | 'expert'
  const [isFlipped, setIsFlipped] = useState(false)
  const [isMuted, setIsMuted] = useState(false)

  // Status interaksi papan
  const [selectedSquare, setSelectedSquare] = useState(null)
  const [legalMoves, setLegalMoves] = useState([])
  const [lastMove, setLastMove] = useState(null) // { from, to }
  const [pendingPromotion, setPendingPromotion] = useState(null) // { from, to }

  // Status AI & Permainan
  const [isThinking, setIsThinking] = useState(false)
  const [gameResult, setGameResult] = useState(null) // { isOver: boolean, winner: 'w'|'b'|'draw', reason: string }

  // Cek apakah permainan telah berakhir
  const checkEndGame = (currentGame) => {
    if (currentGame.isGameOver()) {
      let winner = null
      let reason = 'Permainan Berakhir'

      if (currentGame.isCheckmate()) {
        winner = currentGame.turn() === 'w' ? 'b' : 'w'
        reason = 'Skakmat (Checkmate)'
      } else if (currentGame.isDraw()) {
        winner = 'draw'
        if (currentGame.isStalemate()) reason = 'Remis karena Pat (Stalemate)'
        else if (currentGame.isThreefoldRepetition()) reason = 'Remis karena Pengulangan Posisi 3 Kali'
        else if (currentGame.isInsufficientMaterial()) reason = 'Remis karena Materi Bidak Tidak Cukup'
        else reason = 'Remis (Aturan 50 Langkah)'
      }

      setGameResult({ isOver: true, winner, reason })

      if (winner === playerColor) {
        playVictorySound(isMuted)
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 },
        })
      } else if (winner === 'draw') {
        playMoveSound(isMuted)
      } else {
        playDefeatSound(isMuted)
      }
    }
  }

  // Memicu langkah AI komputer
  const triggerAIMove = (currentGame) => {
    if (currentGame.isGameOver()) return

    setIsThinking(true)

    // Jeda alami 450ms agar pergerakan komputer terasa nyata
    setTimeout(() => {
      const nextGame = new Chess()
      nextGame.loadPgn(currentGame.pgn())

      const bestMove = findBestMove(nextGame, difficulty)
      if (bestMove) {
        try {
          const moveResult = nextGame.move(bestMove)
          if (moveResult) {
            if (nextGame.isCheck()) {
              playCheckSound(isMuted)
            } else if (moveResult.captured) {
              playCaptureSound(isMuted)
            } else {
              playMoveSound(isMuted)
            }

            setLastMove({ from: moveResult.from, to: moveResult.to })
            setGame(nextGame)
            checkEndGame(nextGame)
          }
        } catch (error) {
          console.error('Error saat langkah AI:', error)
        }
      }
      setIsThinking(false)
    }, 450)
  }

  // Menjalankan langkah manusia
  const executeHumanMove = (from, to, promotion = 'q') => {
    try {
      const nextGame = new Chess()
      nextGame.loadPgn(game.pgn())

      const moveResult = nextGame.move({ from, to, promotion })
      if (moveResult) {
        setSelectedSquare(null)
        setLegalMoves([])

        if (nextGame.isCheck()) {
          playCheckSound(isMuted)
        } else if (moveResult.captured) {
          playCaptureSound(isMuted)
        } else {
          playMoveSound(isMuted)
        }

        setLastMove({ from: moveResult.from, to: moveResult.to })
        setGame(nextGame)
        checkEndGame(nextGame)

        // Jika giliran berikutnya milik AI dan game belum berakhir
        if (!nextGame.isGameOver() && nextGame.turn() !== playerColor) {
          triggerAIMove(nextGame)
        }
        return true
      }
    } catch {
      return false
    }
    return false
  }

  // Penanganan klik pada petak catur
  const handleSquareClick = (square) => {
    if (gameResult?.isOver || isThinking) return
    if (game.turn() !== playerColor) return

    if (selectedSquare === square) {
      setSelectedSquare(null)
      setLegalMoves([])
      return
    }

    const targetMove = legalMoves.find((m) => m.to === square)
    if (selectedSquare && targetMove) {
      const piece = game.get(selectedSquare)
      const isPawnPromotion =
        piece &&
        piece.type === 'p' &&
        ((piece.color === 'w' && square[1] === '8') ||
          (piece.color === 'b' && square[1] === '1'))

      if (isPawnPromotion) {
        setPendingPromotion({ from: selectedSquare, to: square })
        return
      }

      executeHumanMove(selectedSquare, square)
      return
    }

    const clickedPiece = game.get(square)
    if (clickedPiece && clickedPiece.color === playerColor) {
      setSelectedSquare(square)
      const moves = game.moves({ square, verbose: true })
      setLegalMoves(moves)
    } else {
      setSelectedSquare(null)
      setLegalMoves([])
    }
  }

  // Konfirmasi promosi pion dari modal pilihan
  const confirmPromotion = (pieceType) => {
    if (!pendingPromotion) return
    executeHumanMove(pendingPromotion.from, pendingPromotion.to, pieceType)
    setPendingPromotion(null)
  }

  // Pembatalan promosi pion
  const cancelPromotion = () => {
    setPendingPromotion(null)
    setSelectedSquare(null)
    setLegalMoves([])
  }

  // Memulai game baru
  const startNewGame = (newPlayerColor = playerColor, newDifficulty = difficulty) => {
    const freshGame = new Chess()
    setGame(freshGame)
    setPlayerColor(newPlayerColor)
    setDifficulty(newDifficulty)
    setIsFlipped(newPlayerColor === 'b')
    setSelectedSquare(null)
    setLegalMoves([])
    setLastMove(null)
    setPendingPromotion(null)
    setGameResult(null)
    setIsThinking(false)

    // Jika pemain memilih Hitam, AI (Putih) membuat langkah pembuka pertama
    if (newPlayerColor === 'b') {
      setIsThinking(true)
      setTimeout(() => {
        const openingGame = new Chess()
        const firstMove = findBestMove(openingGame, newDifficulty)
        if (firstMove) {
          const moveRes = openingGame.move(firstMove)
          playMoveSound(isMuted)
          setGame(openingGame)
          if (moveRes) {
            setLastMove({ from: moveRes.from, to: moveRes.to })
          }
        }
        setIsThinking(false)
      }, 500)
    }
  }

  // Membatalkan langkah (Undo)
  const undoMove = () => {
    if (isThinking || game.history().length === 0) return

    const undoneGame = new Chess()
    undoneGame.loadPgn(game.pgn())

    undoneGame.undo() // Langkah AI
    if (undoneGame.turn() !== playerColor) {
      undoneGame.undo() // Langkah Pemain
    }

    setGame(undoneGame)
    setSelectedSquare(null)
    setLegalMoves([])
    setPendingPromotion(null)
    setGameResult(null)
    setLastMove(null)
  }

  const toggleFlip = () => {
    setIsFlipped((prev) => !prev)
  }

  const toggleMute = () => {
    setIsMuted((prev) => !prev)
  }

  return {
    chess: game,
    playerColor,
    difficulty,
    isFlipped,
    isMuted,
    selectedSquare,
    legalMoves,
    lastMove,
    pendingPromotion,
    isThinking,
    gameResult,
    history: game.history(),
    formattedHistory: formatMoveHistory(game.history()),
    capturedData: calculateCapturedPieces(game),
    isCheck: game.isCheck(),
    turn: game.turn(),
    handleSquareClick,
    confirmPromotion,
    cancelPromotion,
    startNewGame,
    undoMove,
    toggleFlip,
    toggleMute,
    setDifficulty,
  }
}
