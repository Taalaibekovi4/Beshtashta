/** Единый набор SVG-иконок для секций: Как начать, Тарифы, Преимущества. 24×24, stroke 2, rounded. */

const iconClass = 'w-5 h-5 min-[400px]:w-6 min-[400px]:h-6 flex-shrink-0'

export function IconPhone({ className = '' }) {
  return (
    <svg className={`${iconClass} ${className}`} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden>
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>
  )
}

export function IconDownload({ className = '' }) {
  return (
    <svg className={`${iconClass} ${className}`} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  )
}

export function IconCard({ className = '' }) {
  return (
    <svg className={`${iconClass} ${className}`} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden>
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
      <line x1="1" y1="10" x2="23" y2="10" />
    </svg>
  )
}

export function IconSupport({ className = '' }) {
  return (
    <svg className={`${iconClass} ${className}`} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden>
      <path d="M21 15a2 2 0 0 1-2 2h-2l-2 5-2-5H5a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2z" />
    </svg>
  )
}

export function IconChart({ className = '' }) {
  return (
    <svg className={`${iconClass} ${className}`} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden>
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  )
}

export function IconWallet({ className = '' }) {
  return (
    <svg className={`${iconClass} ${className}`} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden>
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
      <path d="M1 10h22" />
      <path d="M17 14h.01" />
    </svg>
  )
}

/** Тариф Бесплатный — подарок / бесплатно */
export function IconFree({ className = '' }) {
  return (
    <svg className={`${iconClass} ${className}`} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden>
      <polyline points="20 12 20 22 4 22 4 12" />
      <rect x="2" y="7" width="20" height="5" />
      <line x1="12" y1="22" x2="12" y2="7" />
      <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
      <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
    </svg>
  )
}

/** Тариф Старт — ракета */
export function IconRocket({ className = '' }) {
  return (
    <svg className={`${iconClass} ${className}`} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden>
      <path d="M12 2l2 6h-4l2-6z" />
      <path d="M9 8h6a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" />
      <path d="M10 18v4M14 18v4M12 18v2" />
    </svg>
  )
}

/** Тариф VIP — звезда премиум */
export function IconCrown({ className = '' }) {
  return (
    <svg className={`${iconClass} ${className}`} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden>
      <polygon points="12 2 15 9 22 9 17 14 19 22 12 18 5 22 7 14 2 9 9 9 12 2" />
    </svg>
  )
}
