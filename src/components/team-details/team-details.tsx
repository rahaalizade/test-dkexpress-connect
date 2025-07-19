import Image from 'next/image'
import { Container } from '../common/container'
import { Divider } from '../common/divider'
import { TeamChart } from '../common/team-chart'
import { Waypoints } from 'lucide-react'

interface TeamDetailsProperties {
  teamData: any
}
const TeamDetails = (properties: TeamDetailsProperties) => {
  const { teamData } = properties
  return (
    <Container>
      <Divider title={teamData?.name} className="my-3" />

      <div className="flex gap-5 relative overflow-visible flex-col md:flex-row">
        <div className="relative ">
          <div className="w-full top-[70px] sticky md:w-[300px] lg:w-[500px] flex-shrink-0">
            <div className="aspect-w-1 overflow-hidden rounded-xl bg-background-primary  relative flex-shrink-0 aspect-h-1">
              <Image
                fill
                src={teamData?.cover_url}
                alt="process"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <div className="relative w-full">
          <div className="bg-white rounded-[20px] p-5 ">
            <div className="flex gap-4 items-center mb-7">
              <Image
                src={teamData?.manager_image_url}
                className="object-cover rounded-xl flex-shrink-0 size-[70px]"
                width={70}
                height={70}
                alt={teamData?.manager_name}
              />
              <div>
                <div className="text-object-primary text-xl mb-1 font-medium bg-white z-20 relative">
                  {teamData?.manager_name}
                </div>
                <div className="text-object-primary-low text-sm bg-white z-20 relative">
                  {teamData?.manager_position}
                </div>
              </div>
            </div>

            <div
              className="text-object-low-emphasis mb-5 text-xs"
              dangerouslySetInnerHTML={{
                __html: teamData?.description ?? '',
              }}
            />

            <div className="flex justify-between gap-5">
              {teamData?.sub_teams?.length > 0 && (
                <div className="flex flex-col">
                  <div className="text-xs text-object-primary-low gap-1">
                    زیرمجموعه
                  </div>
                  <div className="text-base text-object-primary font-semibold">
                    {teamData?.sub_teams?.length} تیم
                  </div>
                </div>
              )}

              {teamData?.chart_url && (
                <TeamChart chartSrc={teamData?.chart_url} />
              )}
            </div>
          </div>
          <img
            src="/images/pattern-team-detail.svg"
            className="left-0 -top-2 absolute -translate-x-1/4 z-10"
          />

          {teamData?.sub_teams.map((item: any, index: number) => {
            return (
              <>
                <div className="bg-[#0000001F] h-[1px] w-full my-7" />
                <div>
                  <div className="flex gap-4">
                    <div className="size-[48px] rounded-full flex justify-center items-center bg-white">
                      <Waypoints className="size-[24px] text-object-primary" />
                    </div>
                    <div>
                      <div className="text-xl font-medium text-object-primary">
                        {item?.name}
                      </div>
                      <div className="text-object-primary-low text-sm">
                        {item?.manager_position}: {item?.manager_name}
                      </div>
                    </div>
                  </div>
                  <div className="text-object-low-emphasis text-xs mt-4 ">
                    {item?.description}
                  </div>
                </div>
              </>
            )
          })}
        </div>
      </div>
    </Container>
  )
}
export { TeamDetails }
