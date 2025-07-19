import { PageHead } from '@/components/common/page-head/page-head'
import Layout from '@/components/layout/layout'
import { TeamDetails } from '@/components/team-details/team-details'
import { getGeneralInfo } from '@/lib/api/services/general-info/general-info'
import { getTeamById } from '@/lib/api/services/teams/teams.services'
import { useTitlePage } from '@/lib/hooks/title-page'
import { get_section_data } from '@/lib/utils/get-section-data/get-section-data'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import Head from 'next/head'

interface PageProperties {
  teamData: any
  generalInfo: any
}

function Page(properties: PageProperties) {
  const { teamData, generalInfo } = properties

  const pageTitle = useTitlePage(teamData?.name)

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
        <TeamDetails teamData={teamData} />
      </Layout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const { query } = context

  try {
    const [generalInfo, teamData] = await Promise.all([
      getGeneralInfo({
        page: 'Text',
      }),
      getTeamById({ team_id: query.team_id }),
    ])

    return {
      props: {
        generalInfo: generalInfo?.data ?? {},
        teamData: teamData?.data ?? {},
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
