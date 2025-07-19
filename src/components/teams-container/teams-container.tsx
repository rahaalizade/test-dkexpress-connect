import Image from 'next/image'
import { Container } from '../common/container'
import { Divider } from '../common/divider'
import Link from 'next/link'
import { TeamChart } from '../common/team-chart'
import { TeamsContainerProperties } from './teams-container.types'

const TeamsContainer = (properties: TeamsContainerProperties) => {
  const { teamsList, generalTeamInformation, generalChartInfo } = properties

  return (
    <Container>
      <Divider title="تیم‌ها" className="my-5" />

      <div className="flex-col flex md:flex-row gap-5">
        <div className="md:w-1/2">
          <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-[20px] bg-background-primary  w-full">
            <Image
              src={generalTeamInformation?.image_url}
              alt=""
              fill
              className="object-cover"
            />
          </div>
        </div>
        <div className="md:w-1/2 bg-white min-h-0 flex flex-col relative rounded-[20px]">
          <div className="self-stretch flex flex-col flex-1 ">
            <div className="justify-center hidden md:flex">
              <img
                src="/images/pattern.svg"
                className="md:w-auto w-[170px]"
                alt={generalTeamInformation?.title}
              />
            </div>
            <div className="self-stretch my-auto py-5 px-5 md:px-10">
              <img
                src="/images/teams-de-logo.svg"
                className="mb-5 md:mb-10 w-[150px] md:w-[210px]"
                alt={generalTeamInformation?.title}
              />

              <p
                className="text-object-low-emphasis text-xs md:text-sm md:leading-[24px]"
                dangerouslySetInnerHTML={{
                  __html: generalTeamInformation?.description ?? '',
                }}
              />
              <div className="flex justify-end mt-5 md:mt-10">
                <TeamChart chartSrc={generalChartInfo?.image_url} />
              </div>
            </div>

            <div className="justify-center hidden md:flex">
              <img src="/images/pattern.svg" className="rotate-180" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-10">
        {teamsList?.map((team, index: number) => {
          return (
            <Link href={`/teams/${team?.id}/${team?.name}`} key={index}>
              <div className="rounded-xl group overflow-hidden border border-border-outline-2/[12%]">
                <div className="w-full relative">
                  <div className="aspect-w-1 aspect-h-1">
                    <Image
                      src={team?.cover_url ?? '/images/team.jpg'}
                      fill
                      alt={team?.name}
                      className="group-hover:scale-105 duration-300 group-hover:opacity-80 cursor-pointer object-cover"
                    />
                  </div>
                </div>
                <div className="text-xl md:text-2xl font-bold text-primary bg-white p-4">
                  {team?.name}
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </Container>
  )
}

export { TeamsContainer }
