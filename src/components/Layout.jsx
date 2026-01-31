import { Outlet } from 'react-router-dom'
import Header from './layout/Header'

/** Общий layout: только хедер остаётся при скролле, контент страницы ниже */
export default function Layout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}
