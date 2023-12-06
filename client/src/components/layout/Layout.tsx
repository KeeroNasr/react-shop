import { Outlet, ScrollRestoration } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'

const Layout = () => {
    return <div>
      <Header />
      <ScrollRestoration />
      <Outlet />
      <Footer/>
    </div>
  }
export default Layout