import { PageHead } from '@/components/common/page-head/page-head'
import { DocumentsContainer } from '@/components/documents-container'
import Layout from '@/components/layout/layout'
import { getCategoriesList } from '@/lib/api/services/categories/categories'
import { getDocumentsListGroup } from '@/lib/api/services/documents/document'
import { getGeneralInfo } from '@/lib/api/services/general-info/general-info'
import { useTitlePage } from '@/lib/hooks/title-page'
import { get_section_data } from '@/lib/utils/get-section-data/get-section-data'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'

interface PageProperties {
  generalInfo: any
  documentsList: any
  categoriesList: any
}

function Page(properties: PageProperties) {
  const { generalInfo, documentsList, categoriesList } = properties

  const pageTitle = useTitlePage('سندها')

  const generalDocumentsInformation = get_section_data(generalInfo?.content, [
    'PAPER_INFORMATION',
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
        <DocumentsContainer
          documentsListGroup={documentsList}
          categoriesList={categoriesList}
          generalDocumentsInformation={generalDocumentsInformation}
        />
      </Layout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  try {
    const [generalInfo, documentsList, categoriesList] = await Promise.all([
      getGeneralInfo({
        page: 'Text',
      }),
      getDocumentsListGroup(context.query),
      getCategoriesList(),
    ])

    return {
      props: {
        generalInfo: generalInfo?.data ?? {},
        documentsList: documentsList?.data ?? [],
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
