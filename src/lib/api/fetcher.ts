import { FetchError, RequestOptions } from './fetcher.type'

const fetcher = async <T>(
  url: string,
  { method = 'GET', headers = {}, body, ...rest }: RequestOptions = {},
): Promise<T> => {
  const isFormData = body instanceof FormData

  const options: RequestInit = {
    method,
    headers: isFormData
      ? {
          ...headers,
        }
      : {
          'Content-Type': 'application/json',
          ...headers,
        },
    body: isFormData ? body : body ? JSON.stringify(body) : undefined,
    ...rest,
  }

  try {
    const response: any = await fetch(url, options)

    const contentType = response.headers.get('content-type')

    let data
    // Check if the response has a JSON body
    if (contentType && contentType.includes('application/json')) {
      if (response.status === 204) {
        data = {}
      } else {
        data = await response.json()
      }
    } else {
      data = {}
    }

    if (!response.ok) {
      throw {
        status: response.status,
        error: data,
      }
    }

    return data as T
  } catch (error) {
    const fetchError = error as FetchError
    const errorMessage = fetchError?.message || 'خطای سرور!'

    throw {
      message: errorMessage || null,
      error: fetchError?.error || true,
      status: fetchError?.status || 500,
      url,
    }
  }
}

export default fetcher
