import { PageHead } from '@/components/common/page-head/page-head'
import Layout from '@/components/layout/layout'
import { TeamsContainer } from '@/components/teams-container'
import { getGeneralInfo } from '@/lib/api/services/general-info/general-info'
import { getTeamsList } from '@/lib/api/services/teams/teams.services'
import { useTitlePage } from '@/lib/hooks/title-page'
import { get_section_data } from '@/lib/utils/get-section-data/get-section-data'
import { GetServerSideProps } from 'next'

interface PageProperties {
  teamsList: any[]
  generalInfo: any
}

function Page(properties: PageProperties) {
  const { teamsList, generalInfo } = properties

  const pageTitle = useTitlePage('تیم‌ها')

  const generalTeamInformation = get_section_data(generalInfo?.content, [
    'TEAMS_INFORMATION',
  ])?.[0]

  const generalChartInfo = get_section_data(generalInfo?.content, [
    'DIGIEXPRESS_GENERAL_CHART',
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
        <TeamsContainer
          teamsList={teamsList}
          generalTeamInformation={generalTeamInformation}
          generalChartInfo={generalChartInfo}
        />
      </Layout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const [generalInfo, teamsList] = await Promise.all([
      getGeneralInfo({
        page: 'Text',
      }),
      getTeamsList(),
    ])

    return {
      props: {
        generalInfo: generalInfo?.data ?? {},
        teamsList: teamsList?.data ?? [],
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
