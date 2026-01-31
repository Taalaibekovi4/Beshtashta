import { useInView } from '../hooks/useInView'

/** Секция с чёткой анимацией появления при скролле */
export default function AnimateSection({ children, className = '', delay = 0 }) {
  const [ref, isInView] = useInView({ rootMargin: '80px', threshold: 0.1 })
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  )
}
