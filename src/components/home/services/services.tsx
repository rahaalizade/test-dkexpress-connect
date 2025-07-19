import ServiceItem from '@/components/home/services/service-item/service-item'
import { Container } from '@/components/common/container'
import { ServicesProps } from './services.types'

export default function Services({ cardsInfo }: ServicesProps) {
  return (
    <Container>
      <div className="grid grid-cols-4 gap-[16px] md:grid-cols-8 justify-between overflow-x-auto overflow-y-hidden">
        {cardsInfo.map(card => (
          <ServiceItem key={card.id} {...card} />
        ))}
      </div>
    </Container>
  )
}
