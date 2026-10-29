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

// Tema warna papan catur
export const BOARD_THEMES = {
  emerald: {
    id: 'emerald',
    name: 'Hutan Zamrud',
    light: 'bg-[#eeeed2] text-[#769656]',
    dark: 'bg-[#769656] text-[#eeeed2]',
    lightHex: '#eeeed2',
    darkHex: '#769656',
  },
  classicWood: {
    id: 'classicWood',
    name: 'Kayu Klasik',
    light: 'bg-[#f0d9b5] text-[#b58863]',
    dark: 'bg-[#b58863] text-[#f0d9b5]',
    lightHex: '#f0d9b5',
    darkHex: '#b58863',
  },
  midnight: {
    id: 'midnight',
    name: 'Midnight Slate',
    light: 'bg-[#cbd5e1] text-[#475569]',
    dark: 'bg-[#475569] text-[#cbd5e1]',
    lightHex: '#cbd5e1',
    darkHex: '#475569',
  },
}

