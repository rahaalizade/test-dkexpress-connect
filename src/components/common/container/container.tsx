import { ContainerProperties } from './container.types'
import classNames from "classnames";

export const Container = (properties: ContainerProperties) => {
  const { children, className, ...rest } = properties

  return (
    <div
      className={classNames(
        'mx-auto w-full max-w-[77.5rem] px-[1.25rem] xl:px-0 overflow-hidden',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  )
}
