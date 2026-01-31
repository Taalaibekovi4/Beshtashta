import { useState, useEffect, useRef } from 'react'

/** Хук: true когда элемент в зоне видимости. rootMargin — запас снизу (px). */
export function useInView(options = {}) {
  const { rootMargin = '60px', threshold = 0.1 } = options
  const [isInView, setIsInView] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsInView(true)
      },
      { rootMargin, threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [rootMargin, threshold])

  return [ref, isInView]
}
