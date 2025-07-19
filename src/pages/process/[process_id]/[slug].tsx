import { PageHead } from '@/components/common/page-head/page-head'
import Layout from '@/components/layout/layout'
import { ProcessDetail } from '@/components/process-detail'
import { getGeneralInfo } from '@/lib/api/services/general-info/general-info'
import { getProcessGet } from '@/lib/api/services/process/process'
import { useTitlePage } from '@/lib/hooks/title-page'
import { get_section_data } from '@/lib/utils/get-section-data/get-section-data'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'

interface PageProperties {
  generalInfo: any
  processInfo: any
}

function Page(properties: PageProperties) {
  const { generalInfo, processInfo } = properties

  const pageTitle = useTitlePage(processInfo?.operation?.title ?? '')

  console.log('processInfo', processInfo)

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
        <ProcessDetail processInfo={processInfo} />
      </Layout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  try {
    const [generalInfo, processInfo] = await Promise.all([
      getGeneralInfo({
        page: 'Text',
      }),
      getProcessGet(context.query?.process_id),
    ])

    return {
      props: {
        generalInfo: generalInfo?.data ?? {},
        processInfo: processInfo?.data ?? {},
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

export default Page
