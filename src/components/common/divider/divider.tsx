import { DividerProps } from './divider.types'
import classNames from 'classnames'

const Divider = ({ title, className }: DividerProps) => {
  return (
    <div className={classNames('flex items-center', className)}>
      <div className="text-object-primary ml-5 text-[20px] md:text-[28px]  font-bold flex-shrink-0">
        {title}
      </div>
      <div className="relative flex w-full h-[14px] items-center">
        <div className="h-[2px] -mt-[0.8px] bg-[#FFC10E] w-full relative -right-[1px]" />
      </div>
    </div>
  )
}

export { Divider }
