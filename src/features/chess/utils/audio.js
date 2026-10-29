/**
 * Generator efek suara catur menggunakan Web Audio API murni.
 * Tidak membutuhkan file audio eksternal sehingga cepat, ringan, dan bebas lag.
 */

let audioCtx = null

/**
 * Menginisialisasi AudioContext saat ada interaksi pertama dari pengguna
 */
const getAudioContext = () => {
  if (typeof window === 'undefined') return null
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext
    if (AudioContextClass) {
      audioCtx = new AudioContextClass()
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume()
  }
  return audioCtx
}

/**
 * Memainkan suara langkah catur biasa (ketukan kayu lembut)
 * @param {boolean} isMuted - Apakah suara dinonaktifkan
 */
export const playMoveSound = (isMuted = false) => {
  if (isMuted) return
  const ctx = getAudioContext()
  if (!ctx) return

  const osc = ctx.createOscillator()
  const gain = ctx.createGain()

  osc.type = 'triangle'
  osc.frequency.setValueAtTime(320, ctx.currentTime)
  osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.08)

  gain.gain.setValueAtTime(0.3, ctx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08)

  osc.connect(gain)
  gain.connect(ctx.destination)

  osc.start(ctx.currentTime)
  osc.stop(ctx.currentTime + 0.08)
}

/**
 * Memainkan suara memakan bidak (ketukan tebal & tajam)
 * @param {boolean} isMuted - Apakah suara dinonaktifkan
 */
export const playCaptureSound = (isMuted = false) => {
  if (isMuted) return
  const ctx = getAudioContext()
  if (!ctx) return

  // Nada pertama (hentakan rendah)
  const osc1 = ctx.createOscillator()
  const gain1 = ctx.createGain()
  osc1.type = 'sine'
  osc1.frequency.setValueAtTime(180, ctx.currentTime)
  osc1.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.12)
  gain1.gain.setValueAtTime(0.5, ctx.currentTime)
  gain1.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12)
  osc1.connect(gain1)
  gain1.connect(ctx.destination)
  osc1.start(ctx.currentTime)
  osc1.stop(ctx.currentTime + 0.12)

  // Nada kedua (klik kayu atas)
  const osc2 = ctx.createOscillator()
  const gain2 = ctx.createGain()
  osc2.type = 'triangle'
  osc2.frequency.setValueAtTime(450, ctx.currentTime)
  osc2.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.09)
  gain2.gain.setValueAtTime(0.3, ctx.currentTime)
  gain2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.09)
  osc2.connect(gain2)
  gain2.connect(ctx.destination)
  osc2.start(ctx.currentTime)
  osc2.stop(ctx.currentTime + 0.09)
}

/**
 * Memainkan suara saat Raja terkena Skak (Check) - denting peringatan
 * @param {boolean} isMuted - Apakah suara dinonaktifkan
 */
export const playCheckSound = (isMuted = false) => {
  if (isMuted) return
  const ctx = getAudioContext()
  if (!ctx) return

  const osc = ctx.createOscillator()
  const gain = ctx.createGain()

  osc.type = 'sine'
  osc.frequency.setValueAtTime(659.25, ctx.currentTime) // E5
  osc.frequency.setValueAtTime(880, ctx.currentTime + 0.08) // A5

  gain.gain.setValueAtTime(0.35, ctx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.28)

  osc.connect(gain)
  gain.connect(ctx.destination)

  osc.start(ctx.currentTime)
  osc.stop(ctx.currentTime + 0.28)
}

/**
 * Memainkan suara kemenangan (Korda nada ceria)
 * @param {boolean} isMuted - Apakah suara dinonaktifkan
 */
export const playVictorySound = (isMuted = false) => {
  if (isMuted) return
  const ctx = getAudioContext()
  if (!ctx) return

  const notes = [523.25, 659.25, 783.99, 1046.5] // C5, E5, G5, C6
  notes.forEach((freq, idx) => {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    const startTime = ctx.currentTime + idx * 0.1

    osc.type = 'triangle'
    osc.frequency.setValueAtTime(freq, startTime)

    gain.gain.setValueAtTime(0.25, startTime)
    gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.4)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start(startTime)
    osc.stop(startTime + 0.4)
  })
}

/**
 * Memainkan suara kekalahan (Nada menurun melankolis)
 * @param {boolean} isMuted - Apakah suara dinonaktifkan
 */
export const playDefeatSound = (isMuted = false) => {
  if (isMuted) return
  const ctx = getAudioContext()
  if (!ctx) return

  const notes = [440, 392, 349.23, 293.66]
  notes.forEach((freq, idx) => {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    const startTime = ctx.currentTime + idx * 0.15

    osc.type = 'sawtooth'
    osc.frequency.setValueAtTime(freq, startTime)

    gain.gain.setValueAtTime(0.15, startTime)
    gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.3)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start(startTime)
    osc.stop(startTime + 0.3)
  })
}

/**
 * Memainkan suara petunjuk cerdas (Dua nada kilau ceria)
 * @param {boolean} isMuted - Apakah suara dinonaktifkan
 */
export const playHintSound = (isMuted = false) => {
  if (isMuted) return
  const ctx = getAudioContext()
  if (!ctx) return

  const notes = [587.33, 880.0] // D5 dan A5
  notes.forEach((freq, idx) => {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    const startTime = ctx.currentTime + idx * 0.08

    osc.type = 'sine'
    osc.frequency.setValueAtTime(freq, startTime)

    gain.gain.setValueAtTime(0.2, startTime)
    gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.25)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start(startTime)
    osc.stop(startTime + 0.25)
  })
}

/**
 * Memainkan suara detak jam (ticking clock) saat waktu tersisa menipis
 * @param {boolean} isMuted - Apakah suara dinonaktifkan
 */
export const playTickSound = (isMuted = false) => {
  if (isMuted) return
  const ctx = getAudioContext()
  if (!ctx) return

  const osc = ctx.createOscillator()
  const gain = ctx.createGain()

  osc.type = 'sine'
  osc.frequency.setValueAtTime(950, ctx.currentTime)
  osc.frequency.exponentialRampToValueAtTime(350, ctx.currentTime + 0.04)

  gain.gain.setValueAtTime(0.25, ctx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.04)

  osc.connect(gain)
  gain.connect(ctx.destination)

  osc.start(ctx.currentTime)
  osc.stop(ctx.currentTime + 0.04)
}

/**
 * Memainkan suara bel penalti waktu habis (Timeout buzzer)
 * @param {boolean} isMuted - Apakah suara dinonaktifkan
 */
export const playTimeoutSound = (isMuted = false) => {
  if (isMuted) return
  const ctx = getAudioContext()
  if (!ctx) return

  const osc = ctx.createOscillator()
  const gain = ctx.createGain()

  osc.type = 'sawtooth'
  osc.frequency.setValueAtTime(220, ctx.currentTime)
  osc.frequency.setValueAtTime(146.83, ctx.currentTime + 0.2)

  gain.gain.setValueAtTime(0.3, ctx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.45)

  osc.connect(gain)
  gain.connect(ctx.destination)

  osc.start(ctx.currentTime)
  osc.stop(ctx.currentTime + 0.45)
}

