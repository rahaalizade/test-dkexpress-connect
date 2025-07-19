import React, { ReactNode } from 'react'

interface ContainerProperties extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  className?: string
}

export type { ContainerProperties }
