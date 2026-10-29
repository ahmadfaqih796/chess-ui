/**
 * Halaman Utama Game Catur (Human vs Computer)
 * Menyusun papan catur interaktif, kartu pemain, toolbar kontrol, dan riwayat langkah.
 */

import { Flame, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { ChessBoard } from '../features/chess/components/ChessBoard'
import { ChessNavbar } from '../features/chess/components/ChessNavbar'
import { EvaluationBar } from '../features/chess/components/EvaluationBar'
import { GameControls } from '../features/chess/components/GameControls'
import { GameOverModal } from '../features/chess/components/GameOverModal'
import { MoveHistory } from '../features/chess/components/MoveHistory'
import { NewGameModal } from '../features/chess/components/NewGameModal'
import { PlayerCard } from '../features/chess/components/PlayerCard'
import { PromotionModal } from '../features/chess/components/PromotionModal'
import { ThemeModal } from '../features/chess/components/ThemeModal'
import { useChessGame } from '../features/chess/hooks/useChessGame'

export const ChessGamePage = () => {
  const [isNewGameModalOpen, setIsNewGameModalOpen] = useState(false)
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false)

  const {
    chess,
    playerColor,
    difficulty,
    boardTheme,
    isFlipped,
    isMuted,
    selectedSquare,
    legalMoves,
    lastMove,
    pendingPromotion,
    isThinking,
    gameResult,
    history,
    formattedHistory,
    capturedData,
    evaluation,
    isCheck,
    turn,
    handleSquareClick,
    confirmPromotion,
    cancelPromotion,
    startNewGame,
    undoMove,
    toggleFlip,
    toggleMute,
    changeBoardTheme,
  } = useChessGame()

  const isHumanTurn = turn === playerColor

  // Tentukan pihak atas dan bawah berdasarkan orientasi papan (isFlipped)
  // Jika isFlipped = false (Putih di bawah), maka Bawah = Putih, Atas = Hitam
  // Jika isFlipped = true (Hitam di bawah), maka Bawah = Hitam, Atas = Putih
  const topColor = isFlipped ? 'w' : 'b'
  const bottomColor = isFlipped ? 'b' : 'w'

  const isTopAI = topColor !== playerColor
  const isBottomAI = bottomColor !== playerColor

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100 antialiased selection:bg-amber-500 selection:text-slate-950">
      {/* Header / Navbar Utama Responsif Faqih Chess */}
      <ChessNavbar
        difficulty={difficulty}
        onOpenNewGame={() => setIsNewGameModalOpen(true)}
      />

      {/* Konten Utama */}
      <main className="mx-auto max-w-7xl px-3 py-4 sm:px-6 sm:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 items-start">
          {/* Kolom Kiri: Papan Catur & Info Pemain */}
          <div className="flex flex-col items-center">
            <div className="w-full max-w-[585px] space-y-2.5">
              {/* Kartu Pemain Atas (Lawan / AI) */}
              <PlayerCard
                isAI={isTopAI}
                color={topColor}
                isCurrentTurn={turn === topColor}
                isThinking={isTopAI && isThinking}
                difficulty={difficulty}
                capturedPieces={
                  topColor === 'w' ? capturedData.whiteCaptured : capturedData.blackCaptured
                }
                advantage={topColor === 'w' ? capturedData.whiteAdvantage : capturedData.blackAdvantage}
              />

              {/* Papan Catur & Bar Evaluasi Posisi Real-time */}
              <div className="relative flex items-stretch justify-center gap-2 sm:gap-2.5 py-1">
                <EvaluationBar
                  evaluation={evaluation}
                  isFlipped={isFlipped}
                />

                <ChessBoard
                  chess={chess}
                  boardTheme={boardTheme}
                  isFlipped={isFlipped}
                  selectedSquare={selectedSquare}
                  legalMoves={legalMoves}
                  lastMove={lastMove}
                  onSquareClick={handleSquareClick}
                />
              </div>

              {/* Kartu Pemain Bawah (Anda / Human) */}
              <PlayerCard
                isAI={isBottomAI}
                color={bottomColor}
                isCurrentTurn={turn === bottomColor}
                isThinking={isBottomAI && isThinking}
                difficulty={difficulty}
                capturedPieces={
                  bottomColor === 'w' ? capturedData.whiteCaptured : capturedData.blackCaptured
                }
                advantage={bottomColor === 'w' ? capturedData.whiteAdvantage : capturedData.blackAdvantage}
              />
            </div>
          </div>

          {/* Kolom Kanan: Toolbar, Status Pertandingan & Riwayat Langkah */}
          <div className="flex flex-col gap-4">
            {/* Toolbar Kontrol */}
            <GameControls
              onOpenNewGame={() => setIsNewGameModalOpen(true)}
              onOpenThemeModal={() => setIsThemeModalOpen(true)}
              onUndo={undoMove}
              onToggleFlip={toggleFlip}
              onToggleMute={toggleMute}
              canUndo={history.length > 0}
              isMuted={isMuted}
              isThinking={isThinking}
            />

            {/* Banner Status Pertandingan */}
            <div
              className={`rounded-xl border p-4 shadow-lg transition-all ${
                isCheck
                  ? 'border-rose-500/50 bg-rose-950/30 ring-1 ring-rose-500/30'
                  : 'border-slate-800 bg-slate-900/60'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Status Pertandingan
                </span>
                {isCheck && (
                  <span className="flex items-center gap-1 rounded-full bg-rose-500/20 px-2.5 py-0.5 text-xs font-bold text-rose-300 border border-rose-500/40 animate-pulse">
                    <Flame className="h-3 w-3" /> SKAK (CHECK)!
                  </span>
                )}
              </div>

              <div className="mt-2 flex items-center justify-between">
                <div>
                  <h4 className="text-base font-bold text-slate-100">
                    {turn === 'w' ? 'Giliran Bidak Putih' : 'Giliran Bidak Hitam'}
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {isHumanTurn
                      ? 'Silakan klik bidak Anda untuk melihat langkah legal.'
                      : 'Komputer sedang menghitung langkah terbaik...'}
                  </p>
                </div>
              </div>
            </div>

            {/* Riwayat Notasi Langkah */}
            <MoveHistory formattedHistory={formattedHistory} />

            {/* Panduan Taktik Singkat */}
            <div className="rounded-xl border border-slate-800/80 bg-slate-900/40 p-3.5 text-xs text-slate-400">
              <div className="font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                Tips Bermain:
              </div>
              <ul className="list-disc pl-4 space-y-1">
                <li>Kuasai 4 petak tengah (e4, d4, e5, d5) di awal permainan.</li>
                <li>Lakukan *Castling* (rokade) lebih awal untuk mengamankan Raja Anda.</li>
                <li>Aktifkan perwira ringan (Kuda dan Gajah) sebelum meluncurkan Ratu.</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* Modal Promosi Pion */}
      {pendingPromotion && (
        <PromotionModal
          color={playerColor}
          onSelect={confirmPromotion}
          onCancel={cancelPromotion}
        />
      )}

      {/* Modal Pengaturan Game Baru */}
      <NewGameModal
        isOpen={isNewGameModalOpen}
        onClose={() => setIsNewGameModalOpen(false)}
        currentSide={playerColor}
        currentDifficulty={difficulty}
        onStartGame={startNewGame}
      />

      {/* Modal Game Over */}
      <GameOverModal
        gameResult={gameResult}
        playerColor={playerColor}
        onRestartSame={() => startNewGame(playerColor, difficulty)}
        onOpenNewGame={() => setIsNewGameModalOpen(true)}
      />

      {/* Modal Pemilihan Tema Papan */}
      <ThemeModal
        isOpen={isThemeModalOpen}
        onClose={() => setIsThemeModalOpen(false)}
        currentTheme={boardTheme}
        onSelectTheme={changeBoardTheme}
      />
    </div>
  )
}

