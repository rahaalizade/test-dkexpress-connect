import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import localFont from 'next/font/local'
import { E500 } from '@/components/error-pages/e500/e500'
import Custom404 from '@/pages/404'
import NextNProgress from 'nextjs-progressbar'
import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import 'react-loading-skeleton/dist/skeleton.css'
import '@/components/error-pages/e500/e500.scss'
import { Toaster } from 'react-hot-toast'

const yekan = localFont({
  src: [
    {
      path: '../../public/fonts/iranYekan/IRANYekanLight.ttf',
      weight: '300',
    },
    {
      path: '../../public/fonts/iranYekan/IRANYekanRegular.ttf',
      weight: '400',
    },
    {
      path: '../../public/fonts/iranYekan/IRANYekanMedium.ttf',
      weight: '500',
    },
    {
      path: '../../public/fonts/iranYekan/IRANYekanBold.ttf',
      weight: '600',
    },
    {
      path: '../../public/fonts/iranYekan/IRANYekanBold.ttf',
      weight: '700',
    },
    {
      path: '../../public/fonts/iranYekan/IRANYekanBold.ttf',
      weight: '800',
    },
    {
      path: '../../public/fonts/iranYekan/IRANYekanBlack.ttf',
      weight: '900',
    },
  ],
  display: 'swap',
})

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            staleTime: 0,
            retry: false,
            refetchOnMount: false,
            refetchInterval: -1,
            gcTime: 0,
          },
        },
      }),
  )

  if (pageProps?.errorData) {
    if (pageProps?.errorData?.statusCode === 404) {
      return <Custom404 />
    }

    return <E500 />
  }

  return (
    <>
      <style jsx global>
        {`
          :root {
            --font-yekan: ${yekan.style.fontFamily};
          }
        `}
      </style>
      <NextNProgress
        color="#7488C7"
        height={2.5}
        showOnShallow={false}
        options={{
          showSpinner: false,
        }}
      />
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
        <Toaster />
      </QueryClientProvider>
    </>
  )
}
