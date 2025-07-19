import { Contents } from '@/lib/utils/get-section-data/get-section-data.types'

export interface LayoutProps {
  children: React.ReactNode
  contents: Contents
  navBarItems: any[]
  noHeader?: boolean
}
