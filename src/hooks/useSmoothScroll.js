import { useCallback } from 'react'
import { useLocation } from 'react-router-dom'

/** Плавная прокрутка к якорю при клике на ссылку #section (на главной). */
export function useSmoothScroll() {
  const location = useLocation()
  const isHome = location.pathname === '/'

  const handleAnchorClick = useCallback(
    (e) => {
      const href = e.currentTarget.getAttribute('href')
      if (!href || !href.startsWith('#') || !isHome) return
      const id = href.slice(1)
      const el = document.getElementById(id)
      if (el) {
        e.preventDefault()
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    },
    [isHome]
  )

  return { handleAnchorClick, isHome }
}
