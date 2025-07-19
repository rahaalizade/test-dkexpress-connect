import { PageHead } from '@/components/common/page-head/page-head'
import Layout from '@/components/layout/layout'
import { ProcessContainer } from '@/components/process-container'
import { getCategoriesList } from '@/lib/api/services/categories/categories'
import { getGeneralInfo } from '@/lib/api/services/general-info/general-info'
import { getProcessList } from '@/lib/api/services/process/process'
import { useTitlePage } from '@/lib/hooks/title-page'
import { get_section_data } from '@/lib/utils/get-section-data/get-section-data'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'

interface PageProperties {
  generalInfo: any
  processList: any
  categoriesList: any
}

function Page(properties: PageProperties) {
  const { generalInfo, processList, categoriesList } = properties

  const pageTitle = useTitlePage('فرآیندها')

  const generalProcessInformation = get_section_data(generalInfo?.content, [
    'OPERATION_INFORMATION',
  ])?.[0]

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
        <ProcessContainer
          processList={processList}
          categoriesList={categoriesList}
          generalProcessInformation={generalProcessInformation}
        />
      </Layout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  try {
    const [generalInfo, processList, categoriesList] = await Promise.all([
      getGeneralInfo({
        page: 'Text',
      }),
      getProcessList(context.query),
      getCategoriesList(),
    ])

    return {
      props: {
        generalInfo: generalInfo?.data ?? {},
        processList: processList?.data ?? [],
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

export default Page
