/**
 * Komponen Vektor SVG Bidak Catur Beresolusi Tinggi
 * Berdasarkan standar notasi vektor catur internasional (viewBox 0 0 45 45)
 */

export const ChessPiece = ({ type, color, className = '' }) => {
  if (!type || !color) return null

  const isWhite = color === 'w'

  // Warna fill dan stroke
  const mainFill = isWhite ? '#FFFFFF' : '#1E293B'
  const strokeColor = isWhite ? '#1E293B' : '#F8FAFC'

  switch (type.toLowerCase()) {
    case 'p': // Pion
      return (
        <svg viewBox="0 0 45 45" className={className} xmlns="http://www.w3.org/2000/svg">
          <path
            d="M22.5 9c-2.21 0-4 1.79-4 4 0 .89.29 1.71.78 2.38C17.33 16.5 16 18.59 16 21c0 2.03.94 3.84 2.41 5.03-3 1.06-7.41 5.55-7.41 13.47h23c0-7.92-4.41-12.41-7.41-13.47 1.47-1.19 2.41-3 2.41-5.03 0-2.41-1.33-4.5-3.28-5.62.49-.67.78-1.49.78-2.38 0-2.21-1.79-4-4-4z"
            fill={mainFill}
            stroke={strokeColor}
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          {isWhite && (
            <path
              d="M17 38.5c1.5-1 4.5-1.5 5.5-1.5s4 .5 5.5 1.5"
              stroke={strokeColor}
              strokeWidth="1.2"
              fill="none"
            />
          )}
        </svg>
      )

    case 'n': // Kuda (Knight)
      return (
        <svg viewBox="0 0 45 45" className={className} xmlns="http://www.w3.org/2000/svg">
          <path
            d="M22 10c10.5 1 16.5 8 16 29H15c0-9 10-6.5 8-21"
            fill={mainFill}
            stroke={strokeColor}
            strokeWidth="1.6"
          />
          <path
            d="M24 18c.38 2.91-5.55 7.37-8 9-3 2-2.82 4.34-5 4-1.042-.94 1.41-3.04 0-3-1 0 .19 1.23-1 2-1 0-4.003 1-4-4 0-2 6-12 6-12s1.89-1.9 2-3.5c-.73-.994-.5-2-.5-3 1-1 3 2.5 3 2.5h2s.78-1.992 2.5-3c1 0 1 3 1 3"
            fill={mainFill}
            stroke={strokeColor}
            strokeWidth="1.6"
          />
          <circle cx="15.5" cy="14.5" r="1.3" fill={strokeColor} />
          <path
            d="M11 26c1.5-1 4.5-1 6 0"
            stroke={strokeColor}
            strokeWidth="1.2"
            fill="none"
          />
        </svg>
      )

    case 'b': // Gajah (Bishop)
      return (
        <svg viewBox="0 0 45 45" className={className} xmlns="http://www.w3.org/2000/svg">
          <g fill={mainFill} stroke={strokeColor} strokeWidth="1.6" strokeLinecap="round">
            <path d="M9 36c3.39-.97 10.11.43 13.5-2 3.39 2.43 10.11 1.03 13.5 2 0 0 1.65.54 3 2-.68.97-1.65.99-3 .5-3.39-.97-10.11.46-13.5-1-3.39 1.46-10.11.03-13.5 1-1.354.49-2.323.47-3-.5 1.354-1.94 3-2 3-2z" />
            <path d="M15 32c2.5 2.5 12.5 2.5 15 0 .5-1.5 0-2 0-2 0-2.5-2.5-4-2.5-4 5.5-1.5 6-11.5-5-15.5-11 4-10.5 14-5 15.5 0 0-2.5 1.5-2.5 4 0 0-.5.5 0 2z" />
            <path d="M25 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 1 1 5 0z" />
          </g>
          <path
            d="M17.5 26h10M22.5 21v10"
            stroke={strokeColor}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <circle cx="22.5" cy="15.5" r="1.5" fill={strokeColor} />
        </svg>
      )

    case 'r': // Benteng (Rook)
      return (
        <svg viewBox="0 0 45 45" className={className} xmlns="http://www.w3.org/2000/svg">
          <g fill={mainFill} stroke={strokeColor} strokeWidth="1.6" strokeLinecap="round">
            <path d="M9 39h27v-3H9v3z" />
            <path d="M12 36v-4h21v4H12z" />
            <path d="M11 14h23l-2 18H13l-2-18z" />
            <path d="M9 10h5v4H9v-4zM16 10h4v4h-4v-4zM25 10h4v4h-4v-4zM31 10h5v4h-5v-4z" />
          </g>
          <path
            d="M12 14h21M13 32h19"
            stroke={strokeColor}
            strokeWidth="1.2"
            fill="none"
          />
        </svg>
      )

    case 'q': // Ratu (Queen)
      return (
        <svg viewBox="0 0 45 45" className={className} xmlns="http://www.w3.org/2000/svg">
          <g fill={mainFill} stroke={strokeColor} strokeWidth="1.6" strokeLinecap="round">
            <path d="M9 26c8.5-1.5 21-1.5 27 0l2-12-7 11-4-14-4.5 14-4-14-7 11 2.5 14z" />
            <path d="M9 26c0 2 1.5 2 2.5 4 1 1.5 1 1 .5 3.5-1.5 1-1.5 2.5-1.5 2.5-1.5 1.5.5 2.5.5 2.5 6.5 1 16.5 1 23 0 0 0 1.5-1 0-2.5 0 0 0-1.5-1.5-2.5-.5-2.5-.5-2 .5-3.5 1-2 2.5-2 2.5-4-8.5-1.5-18.5-1.5-27 0z" />
            <path d="M11 38.5a35 35 1 0 0 23 0" />
            <circle cx="6" cy="12" r="2" />
            <circle cx="14" cy="9" r="2" />
            <circle cx="22.5" cy="8" r="2" />
            <circle cx="31" cy="9" r="2" />
            <circle cx="39" cy="12" r="2" />
          </g>
        </svg>
      )

    case 'k': // Raja (King)
      return (
        <svg viewBox="0 0 45 45" className={className} xmlns="http://www.w3.org/2000/svg">
          {/* Palang Salib Mahkota Raja */}
          <path
            d="M22.5 6v6M19.5 9h6"
            stroke={strokeColor}
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <g fill={mainFill} stroke={strokeColor} strokeWidth="1.6" strokeLinecap="round">
            <path d="M22.5 11.63V6M20 8h5" />
            <path d="M22.5 25s4.5-7.5 3-10.5c0 0-1-2.5-3-2.5s-3 2.5-3 2.5c-1.5 3 3 10.5 3 10.5" />
            <path d="M11.5 37c5.5 3.5 15.5 3.5 21 0v-7s9-4.5 6-10.5c-4-1-4 2.5-6 2.5-2 0-3-2.5-4-2.5s-2 1.5-2 2.5c-1 0-1-1.5-3-1.5s-2 1.5-3 1.5c0-1-1-2.5-2-2.5s-2 2.5-4 2.5c-2 0-2-3.5-6-2.5-3 6 6 10.5 6 10.5v7z" />
            <path d="M11.5 30c5.5-3 15.5-3 21 0M11.5 33.5c5.5-3 15.5-3 21 0M11.5 37c5.5-3 15.5-3 21 0" />
          </g>
        </svg>
      )

    default:
      return null
  }
}
