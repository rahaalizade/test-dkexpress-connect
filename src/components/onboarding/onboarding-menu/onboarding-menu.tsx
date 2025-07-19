import React, { useState } from 'react'
import classNames from 'classnames'
import { OnboardingMenuProps } from '@/components/onboarding/onboarding-menu/onboarding-menu.types'
import { useCollapse } from 'react-collapsed'

function SubMenus({
  subMenus,
  selectedSubMenuID,
  setSelectedSubMenuID,
  scrollToSection,
  selectedMenuID,
}: any) {
  return (
    <>
      {subMenus?.map((subMenu: any, index: number) => (
        <div
          key={subMenu.id}
          onClick={() => {
            setSelectedSubMenuID(subMenu.id)
            scrollToSection(subMenu.id)
          }}
          className={classNames(
            'flex transition ease-out duration-100 relative text-object-low-emphasis text-[0.875rem] min-w-[6.375rem] justify-center md:justify-normal items-center gap-[0.5rem] px-[1rem] py-[0.75rem] cursor-pointer',
            {
              'bg-background-primary rounded-t-[0.5rem] md:rounded-t-0 md:rounded-l-[0.5rem]':
                selectedSubMenuID === subMenu.id,
            },
          )}
        >
          {selectedSubMenuID === subMenu.id && (
            <div className="hidden md:flex absolute top-auto -right-[1px] rounded-l-full h-[32px] w-[4px] bg-object-secondary " />
          )}
          {selectedSubMenuID === subMenu.id && (
            <div className="flex md:hidden absolute top-auto bottom-0 rounded-t-full h-[4px] w-[32px] bg-object-secondary " />
          )}
          <span className="hidden md:flex min-w-[32px] min-h-[32px]" />
          <span
            className={classNames('text-xs md:text-sm font-[600] text-nowrap', {
              'text-object-primary': selectedSubMenuID === subMenu.id,
            })}
          >
            {subMenu.title}
          </span>
        </div>
      ))}
    </>
  )
}

const Accordion = ({ open, children }: { open: boolean; children: any }) => {
  const { getCollapseProps, getToggleProps } = useCollapse({
    duration: 400,
    isExpanded: open,
    defaultExpanded: open,
  })
  return (
    <div {...getToggleProps()}>
      <div {...getCollapseProps()}>
        <div>{children}</div>
      </div>
    </div>
  )
}

export default function OnboardingMenu({
  data,
  selectedMenuID,
  setSelectedMenuID,
  selectedSubMenuID2,
  setSelectedSubMenuID,
  scrollToSection,
}: OnboardingMenuProps) {
  const selectedSubMenuID = selectedSubMenuID2
  return (
    <div className="flex top-[70px] flex-col md:sticky self-start  py-[1.25rem] gap-[0.5rem] min-w-[100vw] -ms-5 md:ms-0 md:gap-0 md:max-w-[18.75rem] md:min-w-[18.75rem]">
      <div className="flex overflow-auto md:overflow-visible border-t-[1px] border-[#D9D9D9] md:border-t-0 md:flex-col md:border-r-[1px] ">
        {data?.content?.map((menu, index) => {
          return (
            <div key={menu.id}>
              <div
                onClick={() => {
                  setSelectedMenuID(menu.id)
                  setSelectedSubMenuID(menu.sub_sections?.[0]?.id)
                  scrollToSection(menu.sub_sections?.[0]?.id)
                }}
                className="flex text-object-low-emphasis text-[0.875rem] items-center gap-[0.5rem] px-[1rem] py-[0.75rem] cursor-pointer"
              >
                <div className="size-[32px] bg-background-primary rounded-md overflow-hidden p-1">
                  <img
                    src={menu?.icon_url ?? '/icons/Rectangle_icon.png'}
                    className="size-full"
                    alt={menu?.title}
                  />
                </div>

                <span
                  className={classNames(
                    'text-xs md:text-sm font-[600] text-nowrap',
                    {
                      'text-object-primary': selectedMenuID === menu.id,
                    },
                  )}
                >
                  {menu.title}
                </span>
              </div>

              <Accordion open={selectedMenuID === menu.id}>
                <div className="hidden md:flex md:flex-col">
                  <SubMenus
                    subMenus={menu?.sub_sections}
                    selectedSubMenuID={selectedSubMenuID}
                    setSelectedSubMenuID={setSelectedSubMenuID}
                    scrollToSection={scrollToSection}
                    selectedMenuID={selectedMenuID}
                    isOpen={selectedMenuID === menu.id}
                  />
                  {selectedMenuID === menu.id && (
                    <div className="hidden md:flex w-[calc(100%-1rem)] ms-auto  my-6 h-[1px] bg-[#D9D9D9]" />
                  )}
                </div>
              </Accordion>
            </div>
          )
        })}
      </div>
      <div className="flex overflow-auto px-3 md:hidden md:flex-col border-b-[1px] border-[#D9D9D9]">
        <SubMenus
          subMenus={
            data?.content?.filter(m => m.id === selectedMenuID)?.[0]
              ?.sub_sections
          }
          selectedMenuID={selectedMenuID}
          selectedSubMenuID={selectedSubMenuID}
          setSelectedSubMenuID={setSelectedSubMenuID}
          scrollToSection={scrollToSection}
        />
      </div>
    </div>
  )
}
