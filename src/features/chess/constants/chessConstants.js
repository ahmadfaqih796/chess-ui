/**
 * Nilai konstanta dan konfigurasi modul catur
 */

// Tingkat kesulitan AI
export const DIFFICULTY_LEVELS = {
  EASY: {
    id: 'easy',
    name: 'Mudah',
    subtitle: 'Pemula (Santai)',
    depth: 1,
    randomChance: 0.35,
    badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
    description: 'AI sering membuat langkah santai dan terkadang melakukan blunder. Cocok untuk belajar.',
  },
  MEDIUM: {
    id: 'medium',
    name: 'Sedang',
    subtitle: 'Menengah',
    depth: 2,
    randomChance: 0.1,
    badgeColor: 'bg-blue-500/20 text-blue-400 border-blue-500/40',
    description: 'AI memahami taktik dasar dan nilai bidak. Sedikit ruang untuk kesalahan.',
  },
  HARD: {
    id: 'hard',
    name: 'Sulit',
    subtitle: 'Mahir (Taktis)',
    depth: 3,
    randomChance: 0,
    badgeColor: 'bg-amber-500/20 text-amber-400 border-amber-500/40',
    description: 'AI menganalisis 3 langkah ke depan dengan posisi taktis yang kuat.',
  },
  EXPERT: {
    id: 'expert',
    name: 'Expert',
    subtitle: 'Master (Grandmaster)',
    depth: 4,
    randomChance: 0,
    badgeColor: 'bg-rose-500/20 text-rose-400 border-rose-500/40',
    description: 'AI menggunakan pencarian mendalam dengan pengurutan langkah optimal. Sangat menantang!',
  },
}

// Nilai dasar tiap bidak untuk kalkulasi materi
export const PIECE_VALUES = {
  p: 100,
  n: 320,
  b: 330,
  r: 500,
  q: 900,
  k: 20000,
}

// Nama bidak dalam Bahasa Indonesia
export const PIECE_NAMES = {
  p: 'Pion',
  n: 'Kuda',
  b: 'Gajah',
  r: 'Benteng',
  q: 'Ratu',
  k: 'Raja',
}

// Opsi Batasan Waktu (Chess Clock)
export const TIME_CONTROLS = {
  RAPID_10: {
    id: 'rapid_10',
    name: 'Rapid',
    subtitle: '10 Menit',
    seconds: 600,
    badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
    description: 'Format catur cepat standar turnamen. Cukup waktu untuk merancang strategi matang.',
  },
  BLITZ_5: {
    id: 'blitz_5',
    name: 'Blitz',
    subtitle: '5 Menit',
    seconds: 300,
    badgeColor: 'bg-amber-500/20 text-amber-400 border-amber-500/40',
    description: 'Cepat & penuh adrenalin! Menguji kecepatan kalkulasi taktik dan insting Anda.',
  },
  BULLET_3: {
    id: 'bullet_3',
    name: 'Bullet',
    subtitle: '3 Menit',
    seconds: 180,
    badgeColor: 'bg-rose-500/20 text-rose-400 border-rose-500/40',
    description: 'Pertarungan refleks kilat. Setiap detik sangat berharga tanpa jeda berpikir.',
  },
  UNLIMITED: {
    id: 'unlimited',
    name: 'Santai',
    subtitle: 'Tanpa Waktu',
    seconds: null,
    badgeColor: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/40',
    description: 'Bermain santai tanpa tekanan jam catur. Ideal untuk pemula dan eksplorasi.',
  },
}

// Tema warna papan catur yang kaya dan variatif
export const BOARD_THEMES = {
  emerald: {
    id: 'emerald',
    name: 'Hutan Zamrud',
    subtitle: 'Emerald Green',
    description: 'Nuansa hijau alami modern yang menenangkan pandangan mata saat bermain lama.',
    lightBg: '#ebecd0',
    darkBg: '#739552',
    selectedLight: '#f7ec74',
    selectedDark: '#dac33c',
    lastMoveLight: 'rgba(245, 246, 130, 0.9)',
    lastMoveDark: 'rgba(185, 202, 67, 0.9)',
  },
  classicWood: {
    id: 'classicWood',
    name: 'Kayu Turnamen',
    subtitle: 'Classic Wood',
    description: 'Serat kayu mapel dan mahoni hangat yang digunakan pada kejuaraan catur resmi dunia.',
    lightBg: '#f0d9b5',
    darkBg: '#b58863',
    selectedLight: '#e6cf70',
    selectedDark: '#caa246',
    lastMoveLight: 'rgba(237, 214, 125, 0.9)',
    lastMoveDark: 'rgba(196, 156, 79, 0.9)',
  },
  midnight: {
    id: 'midnight',
    name: 'Midnight Slate',
    subtitle: 'Dark Cyberpunk',
    description: 'Palet abu-abu dingin bernuansa malam dengan kontras tinggi yang futuristik.',
    lightBg: '#cbd5e1',
    darkBg: '#475569',
    selectedLight: '#93c5fd',
    selectedDark: '#3b82f6',
    lastMoveLight: 'rgba(191, 219, 254, 0.9)',
    lastMoveDark: 'rgba(96, 165, 250, 0.9)',
  },
  marble: {
    id: 'marble',
    name: 'Marmer Monokrom',
    subtitle: 'Monochrome Marble',
    description: 'Batu marmer hitam-putih abadi dengan gaya estetika minimalis nan mewah.',
    lightBg: '#e2e8f0',
    darkBg: '#334155',
    selectedLight: '#fde047',
    selectedDark: '#ca8a04',
    lastMoveLight: 'rgba(254, 240, 138, 0.9)',
    lastMoveDark: 'rgba(161, 98, 7, 0.9)',
  },
  amethyst: {
    id: 'amethyst',
    name: 'Royal Amethyst',
    subtitle: 'Imperial Purple',
    description: 'Warna ungu lavender mewah khas kerajaan dipadukan sorotan emas permata.',
    lightBg: '#f3e8ff',
    darkBg: '#7e22ce',
    selectedLight: '#facc15',
    selectedDark: '#eab308',
    lastMoveLight: 'rgba(250, 204, 21, 0.9)',
    lastMoveDark: 'rgba(234, 179, 8, 0.9)',
  },
}
