import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import '@/styles/card.scss'
import '@/styles/common.css'

const App = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />
}

export default App
