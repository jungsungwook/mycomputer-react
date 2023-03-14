import Copyright from '@/copyright'
import Header from '@/header'
import { Html, Head, Main, NextScript } from 'next/document'
import { RecoilRoot } from 'recoil'

const Document = () => {
  console.log("# API URL ROOT ---> " + process.env.NEXT_PUBLIC_API_ROOT)
  console.log("# API URL PORT ---> " + process.env.NEXT_PUBLIC_API_PORT)
  return (
    <Html lang="en">
      <Head />
      <body>
        <RecoilRoot>
          <Main />
          <Copyright sx={{ mt: 5 }} />
          <NextScript />
        </RecoilRoot>
      </body>
    </Html>
  )
}

export default Document