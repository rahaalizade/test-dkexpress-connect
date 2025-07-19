export interface RequestOptions {
  method?: string
  headers?: Record<string, string>
  body?: Record<string, any> | string
}

export interface FetchError extends Error {
  status?: number
  error?: any
}

interface OptionProperties {
  handle401?: boolean
  showToast401?: boolean
  removeToken401?: boolean
  redirect401?: boolean
  token?: string
}

export type { OptionProperties }
