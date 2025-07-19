import { useEffect, useState } from 'react'

const useHeaderHook = () => {
  const [fixed, setFixed] = useState(false)

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setFixed(true)
    } else {
      setFixed(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return {
    fixed,
  }
}
export { useHeaderHook }
