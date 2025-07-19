import ValueCard from '@/components/home/values/value-card/value-card'
import { Divider } from '@/components/common/divider'
import { Container } from '@/components/common/container'
import { ValuesProps } from './values.types'

export default function Values({ cardsInfo }: ValuesProps) {
  return (
    <Container className="w-full pl-0 sm:px-[1.25rem] xlg:px-0 max-w-none sm:max-w-[77.5rem]">
      <Divider title={'ارزش‌های ما'} />

      <div className="flex pb-3 overflow-x-auto pr-0 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-0 mt-5 sm:gap-[1.25rem]">
        {cardsInfo?.map(card => (
          <ValueCard key={card.id} {...card} />
        ))}
      </div>
    </Container>
  )
}
