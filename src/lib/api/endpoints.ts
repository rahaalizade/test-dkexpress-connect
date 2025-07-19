import { mapValues } from 'lodash'

enum PATHS {
  TEAM_LIST = 'API/teams/list',
  BLOG_LIST = 'API/blog/list?q={q}&sort={sort}&page={page}&category_id={category_id}',
  POST_INFO = 'API/blog/{post_id}',
  GENERAL_INFO = 'API/page/{page}',
  OPERATIONS_LIST = 'API/operations/list',
  OPERATIONS_GET = 'API/operations/{operation_id}',
  CATEGORIES_LIST = 'API/categories/list',
  PAPERS_LIST2 = 'API/papers/list',
  TEAM_BY_ID = 'API/teams/{team_id}',
  PAPERS_LIST = 'API/papers/list?flat={flat}',
  GUIDELINE = 'API/guideline/{slug}',
  TECHNICAL_DOC = 'API/technical_docs/{slug}',
  LOTTERY_QUERY = 'API/lottery/q?code={query}',
  LOTTERY_RANDOM = 'API/lottery/chance?count={count}',
}

export const ENDPOINTS = mapValues(PATHS, (url: string) =>
  url.replace(/^.+?(\/)/, matched => {
    const baseURLs = {
      API: process.env['NEXT_PUBLIC_BACKEND_ROOT_PATH'],
    }
    const baseURL = matched.replaceAll(/\/+/g, '') as keyof typeof baseURLs
    return `${baseURLs[baseURL]}/`
  }),
) as unknown as typeof PATHS
