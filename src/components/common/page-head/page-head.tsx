import Head from 'next/head'
import { pageHeadDefaultValues } from './page-head.constant'
import { PageHeadProperties } from './page-head.type'

function PageHead(properties: PageHeadProperties) {
  const {
    description = pageHeadDefaultValues.description,
    title = pageHeadDefaultValues.title,
    ogImage = pageHeadDefaultValues.ogImage,
    ogTitle = pageHeadDefaultValues.ogTitle,
    ogType = pageHeadDefaultValues.ogType,
    canonical = pageHeadDefaultValues.canonical,
  } = properties

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      {ogTitle && <meta name="og:title" content={ogTitle} />}
      {ogImage ? (
        <>
          <meta name="og:image" content={ogImage} />
          <meta name="og:image:url" content={ogImage} />
          <meta name="og:image:secure_url" content={ogImage} />
          <meta name="image" property="image" content={ogImage} />
        </>
      ) : null}
      {canonical ? (
        <>
          <link rel="canonical" href={canonical} />
          <meta property="og:url" content={canonical} />
        </>
      ) : null}
      <meta property="og:site_name" content={'دیجی‌اکسپرس کانکت'} />
      {ogType && <meta property="og:type" content={ogType} />}
    </Head>
  )
}

export { PageHead }
