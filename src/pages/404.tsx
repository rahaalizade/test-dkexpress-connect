import { useRouter } from 'next/router'
import Head from 'next/head'

export default function Custom404() {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>صفحه نامرتبط | دیجی‌اکسپرس</title>
      </Head>
      <div className="lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16">
        <div className="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
          <div className="relative">
            <div className="absolute">
              <div className="">
                <h1 className="my-2 text-gray-800 font-bold text-2xl">
                  به نظر می‌رسد که دروازه‌ای به سوی بی راهه پیدا کرده‌ای.
                </h1>
                <p className="my-2 text-gray-800">
                  متأسفیم بابت این اتفاق! لطفاً به صفحه اصلی ما مراجعه کنید تا
                  به جایی که نیاز دارید برسید.
                </p>
                <button
                  onClick={() => router.push('/')}
                  className="sm:w-full lg:w-auto my-2 border rounded md py-4 px-8 text-center bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50"
                >
                  منو ببر اونجا!
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
