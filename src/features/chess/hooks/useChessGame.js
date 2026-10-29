/**
 * Custom Hook untuk Logika Permainan Catur
 * Mengelola state papan secara fungsional & reaktif tanpa pelanggaran Rules of React.
 */

import confetti from 'canvas-confetti'
import { Chess } from 'chess.js'
import { useEffect, useState } from 'react'
import { findBestMove } from '../utils/ai'
import {
  playCaptureSound,
  playCheckSound,
  playDefeatSound,
  playHintSound,
  playMoveSound,
  playTickSound,
  playTimeoutSound,
  playVictorySound,
} from '../utils/audio'
import { calculateCapturedPieces, formatMoveHistory } from '../utils/chessHelpers'
import { calculateEvaluation } from '../utils/evaluation'
import { generateHint } from '../utils/hintGenerator'
import { TIME_CONTROLS } from '../constants/chessConstants'

export const useChessGame = () => {
  // Instance chess.js disimpan langsung sebagai state murni React
  const [game, setGame] = useState(() => new Chess())

  // Konfigurasi pemain & tema
  const [playerColor, setPlayerColor] = useState('w') // 'w' = Putih, 'b' = Hitam
  const [difficulty, setDifficulty] = useState('medium') // 'easy' | 'medium' | 'hard' | 'expert'
  const [isFlipped, setIsFlipped] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [boardTheme, setBoardTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('faqih_chess_theme') || 'emerald'
    }
    return 'emerald'
  })

  // Status interaksi papan
  const [selectedSquare, setSelectedSquare] = useState(null)
  const [legalMoves, setLegalMoves] = useState([])
  const [lastMove, setLastMove] = useState(null) // { from, to }
  const [pendingPromotion, setPendingPromotion] = useState(null) // { from, to }
  const [hint, setHint] = useState(null) // { from, to, san, pieceName, explanation }

  // Status AI & Permainan
  const [isThinking, setIsThinking] = useState(false)
  const [isHintLoading, setIsHintLoading] = useState(false)
  const [gameResult, setGameResult] = useState(null) // { isOver: boolean, winner: 'w'|'b'|'draw', reason: string }

  // Pengaturan Jam Catur (Chess Clock)
  const [timeControl, setTimeControl] = useState('rapid_10')
  const [whiteTime, setWhiteTime] = useState(600)
  const [blackTime, setBlackTime] = useState(600)
  const [isClockRunning, setIsClockRunning] = useState(false)

  // Pengatur detak jam catur aktif secara real-time
  useEffect(() => {
    if (gameResult?.isOver || !isClockRunning) return

    const currentConfig = TIME_CONTROLS[timeControl.toUpperCase()] || TIME_CONTROLS.RAPID_10
    if (!currentConfig.seconds) return // Mode Santai (Tanpa Batasan Waktu)

    const timer = setInterval(() => {
      const currentTurn = game.turn()

      if (currentTurn === 'w') {
        setWhiteTime((prev) => {
          if (prev === null) return null
          if (prev <= 1) {
            clearInterval(timer)
            const winner = 'b'
            const reason = 'Waktu Putih Habis (Timeout)'
            setGameResult({ isOver: true, winner, reason })
            playTimeoutSound(isMuted)
            if (playerColor === 'b') {
              playVictorySound(isMuted)
              confetti({
                particleCount: 120,
                spread: 70,
                origin: { y: 0.6 },
              })
            } else {
              playDefeatSound(isMuted)
            }
            return 0
          }
          if (playerColor === 'w' && prev <= 11) {
            playTickSound(isMuted)
          }
          return prev - 1
        })
      } else {
        setBlackTime((prev) => {
          if (prev === null) return null
          if (prev <= 1) {
            clearInterval(timer)
            const winner = 'w'
            const reason = 'Waktu Hitam Habis (Timeout)'
            setGameResult({ isOver: true, winner, reason })
            playTimeoutSound(isMuted)
            if (playerColor === 'w') {
              playVictorySound(isMuted)
              confetti({
                particleCount: 120,
                spread: 70,
                origin: { y: 0.6 },
              })
            } else {
              playDefeatSound(isMuted)
            }
            return 0
          }
          if (playerColor === 'b' && prev <= 11) {
            playTickSound(isMuted)
          }
          return prev - 1
        })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [game, gameResult, timeControl, isClockRunning, isMuted, playerColor])

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
            setIsClockRunning(true)
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
        setHint(null)

        if (nextGame.isCheck()) {
          playCheckSound(isMuted)
        } else if (moveResult.captured) {
          playCaptureSound(isMuted)
        } else {
          playMoveSound(isMuted)
        }

        setLastMove({ from: moveResult.from, to: moveResult.to })
        setGame(nextGame)
        setIsClockRunning(true)
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
  const startNewGame = (
    newPlayerColor = playerColor,
    newDifficulty = difficulty,
    newTimeControl = timeControl
  ) => {
    const freshGame = new Chess()
    const chosenTime = newTimeControl || timeControl
    const timeConfig = TIME_CONTROLS[chosenTime.toUpperCase()] || TIME_CONTROLS.RAPID_10

    setGame(freshGame)
    setPlayerColor(newPlayerColor)
    setDifficulty(newDifficulty)
    setTimeControl(chosenTime)
    setWhiteTime(timeConfig.seconds)
    setBlackTime(timeConfig.seconds)
    setIsClockRunning(false)
    setIsFlipped(newPlayerColor === 'b')
    setSelectedSquare(null)
    setLegalMoves([])
    setLastMove(null)
    setPendingPromotion(null)
    setHint(null)
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
          setIsClockRunning(true)
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
    setHint(null)
    setGameResult(null)
    setLastMove(null)

    if (undoneGame.history().length === 0) {
      setIsClockRunning(false)
    }
  }

  const toggleFlip = () => {
    setIsFlipped((prev) => !prev)
  }

  const toggleMute = () => {
    setIsMuted((prev) => !prev)
  }

  const changeBoardTheme = (themeId) => {
    setBoardTheme(themeId)
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('faqih_chess_theme', themeId)
      } catch (err) {
        console.warn('Gagal menyimpan tema ke localStorage:', err)
      }
    }
  }

  // Meminta saran langkah terbaik dari AI (Smart Hint) secara asynchronous tanpa memblokir UI
  const requestHint = () => {
    if (gameResult?.isOver || isThinking || isHintLoading) return
    if (game.turn() !== playerColor) return

    setIsHintLoading(true)

    // Berikan jeda 40ms agar browser merender status loading dan tidak pernah membeku
    setTimeout(() => {
      try {
        const generated = generateHint(game)
        if (generated) {
          setHint(generated)
          playHintSound(isMuted)
        }
      } catch (err) {
        console.error('Gagal memproses petunjuk:', err)
      } finally {
        setIsHintLoading(false)
      }
    }, 40)
  }

  // Menerapkan langkah saran secara langsung
  const applyHint = () => {
    if (!hint) return
    executeHumanMove(hint.from, hint.to)
    setHint(null)
  }

  // Menutup tampilan saran
  const clearHint = () => {
    setHint(null)
  }

  return {
    chess: game,
    playerColor,
    difficulty,
    boardTheme,
    timeControl,
    whiteTime,
    blackTime,
    isClockRunning,
    isFlipped,
    isMuted,
    selectedSquare,
    legalMoves,
    lastMove,
    pendingPromotion,
    hint,
    isThinking,
    isHintLoading,
    gameResult,
    history: game.history(),
    formattedHistory: formatMoveHistory(game.history()),
    capturedData: calculateCapturedPieces(game),
    evaluation: calculateEvaluation(game),
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
    setTimeControl,
    changeBoardTheme,
    requestHint,
    applyHint,
    clearHint,
  }
}
