import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import '@/styles/card.scss'
import '@/styles/common.css'
import { RecoilRoot } from 'recoil'
import Header from '@/components/header'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <RecoilRoot>
      <Header />
      <Component {...pageProps} />
    </RecoilRoot>
  )
}

export default App
