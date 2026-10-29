# 🧠 Memory Bank - Catur UI

## Current State
- Mengembangkan fitur Game Catur Human vs Computer lengkap dengan:
  - 4 tingkat kesulitan AI (Mudah, Sedang, Sulit, Expert) berbasis Minimax + Alpha-Beta Pruning + Piece-Square Tables (PST) + Move Ordering.
  - Pilihan warna bidak (Putih / Hitam) dengan auto-flip papan dan auto-first-move untuk AI jika pemain memilih Hitam.
  - Efek suara sintetis realistis via Web Audio API (gerak kayu, memakan bidak, skak, kemenangan, kekalahan).
  - Animasi skak (Check pulse), dot langkah legal, ring capture, serta konfeti selebrasi saat menang.
  - Notasi langkah catur (PGN/history) dan pemantau bidak yang dimakan beserta selisih poin materi (+1, +3, dll).
  - Fitur Undo (Batal Langkah), Putar Papan (Flip Board), dan Bisu Suara (Mute/Unmute).
  - Bar Evaluasi Posisi Real-time (Evaluation Bar) dan Pemilih Tema Papan Catur (5 tema mewah).
  - Sistem Petunjuk Cerdas (Smart Hint) dengan visualisasi petak asal/tujuan neon dan ulasan taktis master.
  - Jam Catur Kompetitif (Chess Clock) dengan 4 mode (Rapid 10m, Blitz 5m, Bullet 3m, Santai), timer countdown real-time, peringatan audio detak jam dan bel timeout, serta penentuan kalah waktu otomatis.

## Tech Stack & Config
- **Frontend Framework**: React 19 (`react`, `react-dom`)
- **Build Tool**: Vite 8 (`@vitejs/plugin-react` + `@rolldown/plugin-babel`)
- **Compiler**: React Compiler (`babel-plugin-react-compiler`)
- **Styling**: Tailwind CSS v4 via `src/index.css` (`@import "tailwindcss";`)
- **Language**: JavaScript murni (ESM, ekstensi `.jsx` untuk komponen & `.js` untuk fungsi/hooks/utils)
- **Game Engine & Audio**: `chess.js` (validasi catur resmi), Web Audio API (efek suara tanpa file mp3 eksternal), `canvas-confetti` (selebrasi)
- **Icons & Styling Helpers**: `lucide-react`, `clsx`, `tailwind-merge`

## Architectural Decisions
- **Feature-Sliced Architecture (`src/features/chess/`)**:
  - `components/`: `ChessNavbar.jsx` (Navbar responsif dengan branding Faqih Chess), `EvaluationBar.jsx` (Bar evaluasi real-time ala Lichess/Chess.com), `ThemeModal.jsx` (Pemilihan tema visual papan), `HintBanner.jsx` (Banner saran langkah master), `ChessBoard.jsx`, `ChessPiece.jsx`, `CapturedPieces.jsx`, `PlayerCard.jsx`, `MoveHistory.jsx`, `PromotionModal.jsx`, `NewGameModal.jsx`, `GameOverModal.jsx`, `GameControls.jsx`.
  - `hooks/`: `useChessGame.js` (State murni reaktif sesuai Rules of React 19 dengan integrasi localStorage tema papan dan generator saran langkah).
  - `utils/`: `ai.js` (Mesin AI Minimax & PST), `audio.js` (Synthesizer Web Audio API), `chessHelpers.js` (Kalkulasi materi dan notasi langkah), `evaluation.js` (Kalkulasi bar evaluasi berbasis sigmoid), `hintGenerator.js` (Analisis langkah terbaik master & penjelasan taktis).
  - `constants/`: `chessConstants.js` (Tingkat kesulitan, nilai bidak, warna).
  - `pages/`: `ChessGamePage.jsx`.

## Known Gaps/Issues
- Pencarian langkah AI dikalibrasi pada kedalaman efisien (Depth 1-3) dengan string SAN cepat dan eksekusi asynchronous non-blocking agar tidak pernah membekukan thread UI browser.
