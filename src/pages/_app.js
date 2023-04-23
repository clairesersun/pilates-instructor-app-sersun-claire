import '@/styles/globals.css'
import { MovementProvider } from '@/context/movements'

export default function App({ Component, pageProps }) {
  return (
    <MovementProvider>

      <Component {...pageProps} />
    </MovementProvider>

  )
}