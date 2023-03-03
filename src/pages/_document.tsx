import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  console.log("# API URL ROOT ---> "+process.env.NEXT_PUBLIC_API_ROOT)
  console.log("# API URL PORT ---> "+process.env.NEXT_PUBLIC_API_PORT)
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
