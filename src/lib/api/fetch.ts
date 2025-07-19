const BACKEND_PATH = process.env.NEXT_PUBLIC_BACKEND_ROOT_PATH

const Get = async (url: string) => {
  const responseData = await fetch(url, {
    method: 'GET',
    headers: { 'content-type': 'application/json' },
  })

  const error = responseData.ok
    ? null
    : {
        title: 'خطایی رخ داده است. لطفاً دوباره تلاش کنید.',
        statusCode: responseData.status,
      }

  let responseJson
  try {
    responseJson = await responseData.json()
  } catch {
    responseJson = null
  }

  return { responseJson, error }
}

const Post = async (url: string, data: any, formData?: boolean) => {
  const responseData = await fetch(url, {
    method: 'POST',
    headers: formData ? {} : { 'content-type': 'application/json' },
    body: formData ? data : JSON.stringify(data),
  })

  const error = responseData.ok
    ? null
    : {
        title: 'خطایی رخ داده است. لطفاً دوباره تلاش کنید.',
        statusCode: responseData.status,
      }

  let responseJson
  try {
    responseJson = await responseData.json()
  } catch {
    responseJson = null
  }

  return { responseJson, error }
}

export { BACKEND_PATH, Get, Post }
