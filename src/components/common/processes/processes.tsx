import { Container } from '@/components/common/container'
import { ProcessesProps } from './processes.types'
import { Divider } from '@/components/common/divider'
import NavigateButton from '@/components/common/navigate-button/navigate-button'

export default function Processes({ cardsInfo, dividerTitle }: ProcessesProps) {
  return (
    <Container>
      <Divider title={dividerTitle} className="mb-5" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 justify-between overflow-x-auto overflow-y-hidden">
        {cardsInfo.map((card: any) => (
          <NavigateButton
            key={card.id.toString()}
            title={card?.title}
            href={`/process/${card.id}/${card.slug}`}
          />
        ))}

        {cardsInfo?.length > 4 && (
          <NavigateButton
            className="px-5 py-4"
            title={'مشاهده همه فرآیندها'}
            href={'/process'}
            showAll
          />
        )}
      </div>
    </Container>
  )
}
