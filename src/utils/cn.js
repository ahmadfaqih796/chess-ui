import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Menggabungkan nama-nama kelas CSS Tailwind secara aman
 * @param {...any} inputs - Daftar nama kelas atau kondisi
 * @returns {string} String gabungan nama kelas yang sudah dioptimasi
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

