import Image from 'next/image'
import { Container } from '../common/container'
import { Divider } from '../common/divider'
import DownloadButton from '../common/download-button/download-button'
import SearchInput from '../common/form/search-input/search-input'
import { ComboBox } from '../common/form/combobox'
import { DocumentsContainerProperties } from './documents-container.types'
import { DocumentsContainerLoading } from './documents-container.feedback'
import { useDocumentsContainer } from './documents-container.hooks'

const DocumentsContainer = (properties: DocumentsContainerProperties) => {
  const { categoriesList, generalDocumentsInformation } = properties

  const {
    searchInputOnChange,
    comboSelect,
    search,
    selected,
    documentsList,
    documentGroupData,
  } = useDocumentsContainer(properties)

  return (
    <Container className="overflow-visible">
      <Divider title="سندها" className="my-3" />
      <div className="flex gap-5 relative overflow-visible flex-col lg:flex-row">
        <div className="relative flex-1">
          <div className="w-full top-[70px] sticky lg:w-[500px] flex-shrink-0">
            <div className="aspect-w-1 overflow-hidden bg-background-primary  rounded-xl relative flex-shrink-0 aspect-h-1">
              <Image
                fill
                src={generalDocumentsInformation?.image_url}
                alt={generalDocumentsInformation?.title ?? 'process'}
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <div className="lg:p-5 p-0">
          <div className="text-object-primary text-xl mb-1 font-medium">
            {generalDocumentsInformation?.title}
          </div>
          <div
            className="text-object-low-emphasis text-sm font-normal"
            dangerouslySetInnerHTML={{
              __html: generalDocumentsInformation?.description,
            }}
          />

          <div className="flex gap-3 mt-5">
            <SearchInput
              name=""
              value={search}
              placeholder="جستجو ..."
              onChange={searchInputOnChange}
            />
            <div className="w-[150px] flex-shrink-0">
              <ComboBox
                options={[
                  { id: 'nothing', name: ' دسته‌بندی‌ها' },
                  ...categoriesList,
                ]}
                selected={selected}
                setSelected={comboSelect}
              />
            </div>
          </div>
          {documentsList.isPending ? (
            <DocumentsContainerLoading />
          ) : (
            <>
              {Object.keys(documentGroupData ?? {})?.map((key: any) => {
                const documentsItems = documentGroupData[key] ?? []
                return (
                  <>
                    <div className="my-5 text-object-high-emphasis text-sm font-medium">
                      {key}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                      {documentsItems?.map((item: any, index: number) => {
                        return (
                          <DownloadButton
                            key={index}
                            subTitle={item?.about}
                            title={item?.name}
                            fileUrl={item.file_url}
                            navId={item.id}
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
export { DocumentsContainer }
