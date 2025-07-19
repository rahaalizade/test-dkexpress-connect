import { useCallback, useRef, useState } from 'react'
import { useRouter } from 'next/router'

const useInfiniteLoaderHook = (setCardsInfo: any, fetchApi: any) => {
  const observer = useRef<IntersectionObserver | null>(null)
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<any>(null)
  const [toFetch, setToFetch] = useState<boolean>(true)

  const fetchItems = async () => {
    const { page } = router.query
    const currentPage = isNaN(Number(page)) ? 1 : Number(page)

    if (currentPage === 1) {
      setToFetch(true)
    }

    if (!toFetch) {
      return
    }

    setError(null)
    setIsLoading(true)

    const updatedQueries = {
      ...router.query,
      page: currentPage + 1,
    }

    const result = await fetchApi(updatedQueries)

    await router.push(
      {
        pathname: router.pathname,
        query: updatedQueries,
      },
      undefined,
      { shallow: true },
    )

    if (result.error) {
      setError(error)
      return setIsLoading(false)
    }

    if (!result.responseJson?.data?.length) {
      setIsLoading(false)
      return setToFetch(false)
    }

    setCardsInfo((prevState: any) => [
      ...prevState,
      ...result.responseJson?.data?.data,
    ])

    return setIsLoading(false)
  }

  const lastPostElementRef = useCallback(
    (node: any) => {
      if (isLoading) return
      if (observer.current) observer.current?.disconnect()

      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          fetchItems()
        }
      })

      if (node) observer.current?.observe(node)
    },
    [isLoading],
  )

  return {
    isLoading,
    error,
    lastPostElementRef,
  }
}
export { useInfiniteLoaderHook }
