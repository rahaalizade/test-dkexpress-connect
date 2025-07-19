import Layout from '@/components/layout/layout'
import { get_section_data } from '@/lib/utils/get-section-data/get-section-data'
import { GetServerSidePropsContext } from 'next'
import { getGeneralInfo } from '@/lib/api/services/general-info/general-info'
import { PageHead } from '@/components/common/page-head/page-head'
import { useTitlePage } from '@/lib/hooks/title-page'
import { BBanner } from '@/components/common/banners/b-banner/b-banner'
import Onboarding from '@/components/onboarding/onboarding'
import { getTechnicalDoc } from '@/lib/api/services/technical-doc/technical-doc'
import { Ladder } from '@/components/ladder/ladder'

export default function LadderPage({ generalInfo, techDocInfo }: any) {
  const pageTitle = useTitlePage(techDocInfo?.title)

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
        <Ladder data={techDocInfo} />
      </Layout>
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const slug = context.params?.slug ? (context.params?.slug as string) : ''

  try {
    const [generalInfo, pageInfo, techDocInfo] = await Promise.all([
      getGeneralInfo({
        page: 'Text',
      }),
      getGeneralInfo({
        page: 'Ladder',
      }),
      getTechnicalDoc({ slug }),
    ])

    return {
      props: {
        generalInfo: generalInfo?.data ?? {},
        pageInfo: pageInfo?.data ?? {},
        techDocInfo: techDocInfo?.data ?? {},
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
