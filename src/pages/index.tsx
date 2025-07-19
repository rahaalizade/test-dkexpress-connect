import Layout from '@/components/layout/layout'
import { Slider } from '@/components/common/slider/slider'
import Services from '@/components/home/services/services'
import Documents from '@/components/home/documents/documents'
import Values from '@/components/home/values/values'
import Culture from '@/components/home/culture/culture'
import { GetServerSideProps } from 'next'
import { get_section_data } from '@/lib/utils/get-section-data/get-section-data'
import { getGeneralInfo } from '@/lib/api/services/general-info/general-info'
import { getBlogList } from '@/lib/api/services/blog/blog-list.services'
import { getDocumentsList } from '@/lib/api/services/documents/document'
import { getProcessList } from '@/lib/api/services/process/process'
import { Special } from '@/components/home/special/special'
import { PageHead } from '@/components/common/page-head/page-head'
import { PostsSection } from '@/components/home/posts-section'
import { flatMap } from 'lodash'
import Processes from '@/components/common/processes/processes'

interface PageProperties {
  generalInfo: any
  homeInfo: any
  processesInfoData: any
  documentsInfo: any
  blogInfo: any
}

function HomePage(properties: PageProperties) {
  const { generalInfo, homeInfo, processesInfoData, documentsInfo, blogInfo } =
    properties

  const processesInfo: any = flatMap(processesInfoData)
  return (
    <>
      <PageHead />
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
        <div className="mb-6 md:mb-11">
          <Slider
            containerClassname="mt-0"
            banners={
              homeInfo?.slider?.filter(
                (s: any) => s.section === 'TOP_SLIDER',
              ) ?? []
            }
          />
        </div>
        <div className="mb-10 md:mb-11">
          <Services
            cardsInfo={get_section_data(homeInfo?.content, ['SERVICES']) ?? []}
          />
        </div>

        <div className="mb-11">
          <Processes
            dividerTitle="فرآیندها"
            cardsInfo={processesInfo?.slice(0, 5) ?? []}
          />
        </div>

        <div className="mb-11">
          <Documents
            dividerTitle="سندها"
            cardsInfo={documentsInfo?.slice(0, 5) ?? []}
          />
        </div>

        <div className="mb-8">
          <Values
            cardsInfo={get_section_data(homeInfo?.content, ['VALUES']) ?? []}
          />
        </div>

        <div className="mb-11">
          <PostsSection postList={blogInfo?.data?.slice(0, 4) ?? []} />
        </div>

        <Special
          content={
            get_section_data(generalInfo?.content, ['HERO_INFO'])[0] ?? []
          }
        />

        <Culture
          cardsInfo={get_section_data(homeInfo?.content, ['OUR_CULTURE']) ?? []}
        />
      </Layout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const [generalInfo, homeInfo, processesInfo, documentsInfo, blogInfo] =
      await Promise.all([
        getGeneralInfo({
          page: 'Text',
        }),
        getGeneralInfo({
          page: 'Home',
        }),
        getProcessList({ flat: '1' }),
        getDocumentsList({ flat: '1' }),
        getBlogList({ page: '1', sort: '33' }),
      ])

    return {
      props: {
        generalInfo: generalInfo?.data ?? {},
        homeInfo: homeInfo?.data ?? {},
        processesInfoData: processesInfo?.data ?? {},
        documentsInfo: documentsInfo?.data ?? {},
        blogInfo: blogInfo?.data ?? {},
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

export default HomePage
