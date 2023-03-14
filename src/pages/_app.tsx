import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import '@/styles/card.scss'
import '@/styles/common.css'
import { RecoilRoot } from 'recoil'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <RecoilRoot>
      <Component {...pageProps} />
    </RecoilRoot>
  )
}

export default App
