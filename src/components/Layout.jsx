import { Outlet } from 'react-router-dom'
import Header from './layout/Header'
import Footer from './layout/Footer'
import ScrollToTop from './ScrollToTop'

/** Общий layout: хедер, контент, футер на всех страницах. При переходе на другую страницу — скролл вверх. */
export default function Layout() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}
