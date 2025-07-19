function toQueryString<T extends Record<string, any>>(params: T): string {
  const searchParams = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null) return

    if (Array.isArray(value)) {
      value.forEach(item => searchParams.append(key, String(item)))
    } else if (typeof value === 'object') {
      searchParams.append(key, JSON.stringify(value))
    } else {
      searchParams.append(key, String(value))
    }
  })

  return searchParams.toString()
}

export { toQueryString }
