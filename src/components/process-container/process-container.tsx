import Image from 'next/image'
import { Container } from '../common/container'
import { Divider } from '../common/divider'
import NavigateButton from '../common/navigate-button/navigate-button'
import { toNumber } from 'lodash'
import SearchInput from '../common/form/search-input/search-input'
import { ComboBox } from '../common/form/combobox'
import { ProcessContainerProperties } from './process-container.types'
import { ProcessContainerLoading } from './process-container.feedbacks'
import { useProcessContainerHooks } from './process-container.hooks'

const ProcessContainer = (properties: ProcessContainerProperties) => {
  const { categoriesList, generalProcessInformation } = properties

  const {
    comboBoxOnChange,
    searchInput,
    search,
    selected = 'nothing',
    documentsList,
    groupProcess,
  } = useProcessContainerHooks(properties)

  return (
    <Container className="overflow-visible">
      <Divider title="فرآیندها" className="my-3" />
      <div className="flex gap-5 relative overflow-visible flex-col lg:flex-row">
        <div className="relative ">
          <div className="w-full top-[70px] sticky lg:w-[500px] flex-shrink-0">
            <div className="aspect-w-1 bg-background-primary  overflow-hidden rounded-xl  relative flex-shrink-0 aspect-h-1">
              <Image
                fill
                src={generalProcessInformation?.image_url}
                alt="process"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <div className="lg:p-5 p-0 flex-1">
          <div className="text-object-primary text-xl mb-1 font-medium">
            {generalProcessInformation?.title}
          </div>
          <div
            className="text-object-low-emphasis text-sm font-normal"
            dangerouslySetInnerHTML={{
              __html: generalProcessInformation?.description ?? '',
            }}
          />

          <div className="flex gap-3 mt-5">
            <SearchInput
              name=""
              value={search}
              placeholder="جستجو ..."
              onChange={searchInput}
            />
            <div className="w-[150px] flex-shrink-0">
              <ComboBox
                options={[
                  { id: 'nothing', name: ' دسته‌بندی‌ها' },
                  ...categoriesList,
                ]}
                selected={selected}
                setSelected={comboBoxOnChange}
              />
            </div>
          </div>

          {documentsList.isPending ? (
            <ProcessContainerLoading />
          ) : (
            <>
              {Object.keys(groupProcess ?? {})?.map(key => {
                const processItems = groupProcess[key] ?? []

                return (
                  <>
                    <div className="my-5 text-object-high-emphasis text-sm font-medium">
                      {key}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                      {processItems?.map((item: any, index: number) => {
                        return (
                          <NavigateButton
                            key={index}
                            title={item?.title}
                            href={`/process/${item.id}/${item.slug}`}
                          />
                        )
                      })}
                    </div>
                  </>
                )
              })}
            </>
          )}
        </div>
      </div>
    </Container>
  )
}
export { ProcessContainer }
