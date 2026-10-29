# 👑 Faqih Chess — Arena Catur Modern Human vs AI

**Faqih Chess** adalah aplikasi permainan catur web generasi baru yang interaktif, mewah, dan responsif. Dirancang dengan **React 19**, **Tailwind CSS v4**, dan **Vite 8**, aplikasi ini menghadirkan pengalaman bermain catur *Human vs Computer* dengan mesin kecerdasan buatan (*AI*) yang cerdas dan adaptif dari tingkat pemula hingga *expert*.

---

## 🌟 Fitur Utama

### 1. 🤖 4 Tingkat Kesulitan AI Komputer
- **Mudah (*Easy*):** AI kedalaman 1 ply dengan 35% peluang langkah acak santai. Sangat bersahabat bagi pemula yang sedang mempelajari dasar pergerakan catur.
- **Sedang (*Medium*):** AI kedalaman 2 ply dengan evaluasi material dan posisi (*Piece-Square Tables*). Bermain solid tanpa blunder ceroboh.
- **Sulit (*Hard*):** AI kedalaman 3 ply memanfaatkan algoritma *Minimax* dan *Alpha-Beta Pruning*. Memiliki pemahaman taktik dan perlindungan raja yang kuat.
- **Expert (*Grandmaster*):** AI kedalaman 4 ply dilengkapi *Move Ordering* (evaluasi ancaman skak dan capture bernilai tinggi diprioritaskan). Menghadirkan tantangan kompetitif kelas master!

### 2. ♟️ Fleksibilitas Sisi Bidak & Auto-Flip
- Pemain bebas memilih bermain sebagai **Bidak Putih** (melangkah lebih dulu) atau **Bidak Hitam** (komputer melangkah pertama).
- Orientasi papan otomatis memutar (*auto-flip*) agar sudut pandang pemain selalu berada di baris bawah.
- Tersedia tombol cepat untuk membalikkan posisi papan catur secara manual kapan saja.

### 3. 🔊 Efek Suara Realistis (Web Audio API)
- Disintesis langsung di peramban menggunakan **Web Audio API** tanpa memerlukan berkas `.mp3` eksternal.
- Efek suara mencakup:
  - Ketukan kayu lembut saat melangkah biasa.
  - Hentakan ganda tajam saat memakan (*capture*) bidak lawan.
  - Denting peringatan saat Raja terancam **Skak (*Check*)**.
  - Melodi ceria korda mayor saat meraih kemenangan.
  - Nada melankolis saat mengalami kekalahan.
- Opsi *Mute / Unmute* dengan sekali klik pada *toolbar*.

### 4. 🎨 Visual Mewah & Animasi Halus
- **Vektor SVG Presisi Tinggi:** Bidak catur berbasis SVG tajam dengan pencahayaan dan bayangan halus.
- **Panduan Langkah Legal:** Titik fokus lembut untuk petak kosong dan cincin lingkaran luar untuk petak memakan bidak.
- **Animasi Skak (*Check Pulse*):** Petak Raja yang terancam skak akan berdenyut merah terang.
- **Highlight Terakhir:** Petak asal dan petak tujuan dari langkah terakhir disorot dengan warna kuning keemasan.
- **Selebrasi Kemenangan:** Ledakan kembang api (*confetti*) ceria saat pemain berhasil men-skakmat lawan.

### 5. 📊 Panel Permainan Lengkap & Bar Evaluasi Real-time
- **Bar Evaluasi Real-time (*Evaluation Bar*):** Bar vertikal dinamis ala Lichess/Chess.com di samping papan catur yang bergeser secara halus mengikuti keunggulan posisi pemain vs komputer (misal: `+1.5`, `-2.0`, `0.0`, atau `M` jika skakmat).
- **Pemantau Bidak Tangkapan & Selisih Materi:** Deretan bidak yang telah dimakan beserta skor keunggulan poin materi (+1, +3, dst).
- **Notasi Langkah Catur:** Riwayat notasi resmi langkah pertandingan (contoh: `1. e4 e5`, `2. Nf3 Nc6`) yang otomatis bergulir ke langkah terbaru.
- **Dialog Promosi Pion:** Pilihan modal elegan saat pion mencapai baris akhir (Ratu, Benteng, Gajah, atau Kuda).
- **Fitur Undo (Batal Langkah):** Membatalkan 1 pasang langkah (langkah AI dan langkah pemain) untuk mencoba skenario lain.

### 6. 📱 Desain Responsif & Adaptif
- Menggunakan pendekatan *Mobile-First Design* dengan Tailwind CSS v4.
- Tampilan navbar adaptif: teks dan ikon terorganisasi rapi tanpa terpotong di layar ponsel (320px–420px), tablet, hingga monitor resolusi tinggi.

---

## 🛠️ Tumpukan Teknologi (*Tech Stack*)

| Kategori | Teknologi | Deskripsi |
| :--- | :--- | :--- |
| **Framework** | [React 19](https://react.dev/) | Framework UI modern dengan performa tinggi |
| **Compiler** | [React Compiler](https://react.dev/learn/react-compiler) | Optimasi render otomatis tanpa boilerplate memoization manual |
| **Bundler** | [Vite 8](https://vite.dev/) | Alat build kilat dengan modul ESM native |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) | Styling utility-first berbasis CSS konfigurasi murni (`@import "tailwindcss"`) |
| **Catur Engine** | [chess.js](https://github.com/jhlywa/chess.js) | Validasi aturan catur internasional, status skakmat, FEN, dan PGN |
| **Efek Audio** | [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) | Sintesis audio real-time tanpa file aset eksternal |
| **Ikon** | [lucide-react](https://lucide.dev/) | Set ikon modern dan ringan |
| **Selebrasi** | [canvas-confetti](https://www.npmjs.com/package/canvas-confetti) | Animasi ledakan konfeti kemenangan |
| **Bahasa** | JavaScript (ESM) | Menggunakan ekstensi `.jsx` untuk komponen dan `.js` untuk logika murni |

---

## 📂 Struktur Direktori Proyek

Proyek ini menerapkan arsitektur modular (*Feature-Sliced Design*) yang rapi dan terisolasi:

```text
catur-ui/
├── .agents/                    # Konfigurasi persona dan aturan agen AI
│   └── rules/                  # Panduan arsitektur, tailwind v4, javascript, memory bank
├── docs/                       # Dokumentasi dan riwayat proyek
│   ├── MEMORY.md               # Catatan memori teknis & arsitektur proyek
│   ├── TODO.md                 # Pelacak prioritas fitur
│   └── task/                   # Log harian pekerjaan
├── public/                     # Aset statis publik
├── src/
│   ├── assets/                 # Gambar dan stylesheet utama
│   │   └── index.css           # Konfigurasi Tailwind CSS v4 & theme
│   ├── features/
│   │   └── chess/              # [MODUL UTAMA CATUR]
│   │       ├── components/     # Komponen UI spesifik catur
│   │       │   ├── CapturedPieces.jsx  # Tampilan bidak yang ditangkap
│   │       │   ├── ChessBoard.jsx      # Papan catur 8x8 interaktif
│   │       │   ├── ChessNavbar.jsx     # Navigasi atas responsif Faqih Chess
│   │       │   ├── ChessPiece.jsx      # Render vektor SVG semua bidak
│   │       │   ├── EvaluationBar.jsx   # Bar evaluasi posisi real-time
│   │       │   ├── GameControls.jsx    # Toolbar kontrol (Undo, Flip, Mute, New Game)
│   │       │   ├── GameOverModal.jsx   # Modal hasil skakmat/remis
│   │       │   ├── MoveHistory.jsx     # Panel notasi langkah PGN
│   │       │   ├── NewGameModal.jsx    # Dialog pilihan warna & tingkat kesulitan
│   │       │   ├── PlayerCard.jsx      # Kartu info pemain & indikator giliran
│   │       │   └── PromotionModal.jsx   # Dialog promosi pion
│   │       ├── constants/
│   │       │   └── chessConstants.js   # Konfigurasi level AI, nilai bidak, warna
│   │       ├── hooks/
│   │       │   └── useChessGame.js     # Custom hook state catur murni reaktif
│   │       └── utils/
│   │           ├── ai.js               # Algoritma AI Minimax, Alpha-Beta & PST
│   │           ├── audio.js            # Sintesis Web Audio API
│   │           ├── chessHelpers.js     # Kalkulasi selisih materi & format langkah
│   │           └── evaluation.js       # Kalkulasi matematis bar evaluasi & sigmoid
│   ├── pages/
│   │   └── ChessGamePage.jsx   # Halaman utama arena pertandingan
│   ├── utils/
│   │   └── cn.js               # Utilitas penggabungan kelas Tailwind
│   ├── App.jsx                 # Komponen akar aplikasi
│   └── main.jsx                # Titik masuk render React DOM
├── index.html                  # Dokumen HTML dasar
├── package.json                # Ketergantungan dan script proyek
└── vite.config.js              # Konfigurasi Vite, Tailwind v4, & React Compiler
```

---

## 🚀 Memulai Aplikasi

### Prasyarat
Pastikan Anda telah menginstal **Node.js** (versi 18 ke atas) di perangkat Anda.

### 1. Instalasi Dependensi
Jalankan perintah berikut di direktori proyek:
```bash
npm install
```

### 2. Menjalankan Server Pengembangan (Dev)
Untuk memulai server lokal dengan Hot Module Replacement (HMR):
```bash
npm run dev
```
Buka peramban di alamat [http://localhost:5173](http://localhost:5173).

### 3. Memeriksa Kerapian Kode (Linting)
```bash
npm run lint
```

### 4. Membangun untuk Produksi (Build)
Untuk membuat berkas rilis teroptimasi di folder `dist/`:
```bash
npm run build
```

Untuk melihat pratinjau hasil build produksi:
```bash
npm run preview
```

---

## 🧠 Cara Kerja Mesin AI Catur

Mesin AI pada **Faqih Chess** memanfaatkan kombinasi beberapa teknik optimasi permainan:

1. **Evaluasi Posisi (*Piece-Square Tables* / PST):**  
   Setiap jenis bidak memiliki tabel bobot posisi masing-masing. Kuda diprioritaskan menguasai pusat petak (*center control*), pion didorong mengamankan ruang, benteng ditempatkan di baris terbuka, dan raja dilindungi saat fase pembukaan/tengah babak.
2. **Minimax dengan Alpha-Beta Pruning:**  
   Pencarian langkah dilakukan secara rekursif hingga kedalaman tertentu. Nilai cabang yang terbukti lebih buruk dari langkah terbaik sebelumnya akan langsung dipangkas (*cutoff*) sehingga pencarian berjalan sangat cepat tanpa membebani browser.
3. **Pengurutan Langkah (*Move Ordering*):**  
   Langkah memakan bidak (*captures*) dengan perbandingan nilai penyerang terendah vs korban tertinggi (*MVV-LVA*) serta ancaman skak dievaluasi terlebih dahulu guna mempercepat pemangkasan *Alpha-Beta*.

---

## 📜 Lisensi & Pengembang

Dikembangkan dengan dedikasi untuk penggemar catur dan komunitas pengembang perangkat lunak modern.  
© 2026 **Faqih Chess**. Seluruh hak cipta dilindungi.
