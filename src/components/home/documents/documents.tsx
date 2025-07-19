import { Container } from '@/components/common/container'
import { ProcessesProps } from './documents.types'
import { Divider } from '@/components/common/divider'
import DownloadButton from '@/components/common/download-button/download-button'
import NavigateButton from '@/components/common/navigate-button/navigate-button'
import Link from 'next/link'

export default function Documents({ cardsInfo, dividerTitle }: ProcessesProps) {
  return (
    <Container>
      <Divider title={dividerTitle} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 justify-between mt-5 overflow-x-auto overflow-y-hidden">
        {cardsInfo.map((card: any) => (
          <DownloadButton
            key={card.id}
            title={card?.name}
            subTitle={card?.categories?.[0]?.name}
            fileUrl={card.file_url}
            navId={card.id}
          />
        ))}
        {cardsInfo?.length > 4 && (
          <NavigateButton
            title={'مشاهده همه سندها'}
            href={'/documents'}
            showAll
            className="px-5 py-4"
          />
        )}
      </div>
    </Container>
  )
}
