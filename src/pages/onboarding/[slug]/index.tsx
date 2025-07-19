import Layout from '@/components/layout/layout'
import { get_section_data } from '@/lib/utils/get-section-data/get-section-data'
import { GetServerSidePropsContext } from 'next'
import { getGeneralInfo } from '@/lib/api/services/general-info/general-info'
import { PageHead } from '@/components/common/page-head/page-head'
import { useTitlePage } from '@/lib/hooks/title-page'
import { BBanner } from '@/components/common/banners/b-banner/b-banner'
import Onboarding from '@/components/onboarding/onboarding'
import { getGuideline } from '@/lib/api/services/guideline/guideline.services'

export default function OnboardingPage({
  generalInfo,
  pageInfo,
  guidelineInfo,
}: any) {
  const pageTitle = useTitlePage(guidelineInfo?.title)

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
        <BBanner
          banner={pageInfo?.banner?.filter((b: any) => b.type === 'B')[0]}
          className="mt-4 mb-4"
        />
        <Onboarding data={guidelineInfo ?? []} />
      </Layout>
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const slug = context.params?.slug ? (context.params?.slug as string) : ''

  try {
    const [generalInfo, pageInfo, guidelineInfo] = await Promise.all([
      getGeneralInfo({
        page: 'Text',
      }),
      getGeneralInfo({
        page: 'On_Boarding',
      }),
      getGuideline({ slug }),
    ])

    return {
      props: {
        generalInfo: generalInfo?.data ?? {},
        pageInfo: pageInfo?.data ?? {},
        guidelineInfo: guidelineInfo?.data ?? {},
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
