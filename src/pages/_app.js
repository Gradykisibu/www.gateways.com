import '@/styles/globals.css'
import { AuthProvider } from '@/components/context/AuthContext'
import Navbar from "../components/Navbar/Navbar"

export default function App({ Component, pageProps }) {
  return( 
    <AuthProvider>
      <Navbar/>
      <Component {...pageProps} />
    </AuthProvider>
  )
}
