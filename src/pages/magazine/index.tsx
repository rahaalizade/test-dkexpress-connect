import Layout from '@/components/layout/layout'
import Head from 'next/head'
import Posts from '@/components/common/posts/posts'
import { get_section_data } from '@/lib/utils/get-section-data/get-section-data'
import { GetServerSideProps } from 'next'
import { getGeneralInfo } from '@/lib/api/services/general-info/general-info'
import { getBlogList } from '@/lib/api/services/blog/blog-list.services'
import { getCategoriesList } from '@/lib/api/services/categories/categories'
import { PageHead } from '@/components/common/page-head/page-head'
import { useTitlePage } from '@/lib/hooks/title-page'

export default function MagazinePage({
  generalInfo,
  pageInfo,
  blogInfo,
  categoriesList,
}: any) {
  const pageTitle = useTitlePage('مجله داخلی')

  return (
    <>
      <PageHead title={pageTitle} />

      <Layout
        contents={
          get_section_data(generalInfo?.content, [
            'FOOTER_TEXT',
            'FOOTER_A_LINKS',
            'FOOTER_B_LINKS',
            'LINKEDIN_LINK',
            'INSTAGRAM_LINK',
            'APARAT_LINK',
          ]) ?? []
        }
        navBarItems={get_section_data(generalInfo?.content, ['NAV']) ?? []}
      >
        <Posts
          contents={blogInfo?.data ?? []}
          dividerTitle={'مجله داخلی'}
          hasMainCard
          hasSearch
          categories={categoriesList ?? []}
          banner={pageInfo?.banner?.filter((b: any) => b.type === 'B')[0]}
        />
      </Layout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const [generalInfo, pageInfo, blogInfo, categoriesList] = await Promise.all(
      [
        getGeneralInfo({
          page: 'Text',
        }),
        getGeneralInfo({
          page: 'Blog',
        }),
        getBlogList({ page: '1', sort: '33' }),
        getCategoriesList(),
      ],
    )

    return {
      props: {
        generalInfo: generalInfo?.data ?? {},
        pageInfo: pageInfo?.data ?? {},
        blogInfo: blogInfo?.data ?? {},
        categoriesList: categoriesList?.data ?? [],
      },
    }
  } catch (error) {
    return {
      props: {
        errorData: error || { hasError: true },
      },
    }
  }
}
