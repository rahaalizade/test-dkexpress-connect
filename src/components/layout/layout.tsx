import Header from '@/components/header/header'
import { LayoutProps } from '@/components/layout/layout.types'
import Footer from '@/components/footer/footer'
import { get_section_data } from '@/lib/utils/get-section-data/get-section-data'

export default function Layout({
  noHeader,
  contents,
  children,
  navBarItems,
}: LayoutProps) {
  const links = get_section_data(contents, [
    'LINKEDIN_LINK',
    'INSTAGRAM_LINK',
    'APARAT_LINK',
  ])?.sort((a: any, b: any) => a.priority - b.priority)

  return (
    <div className="pt-16">
      {!noHeader && <Header navBarItems={navBarItems} links={links ?? []} />}
      <main>{children}</main>
      <Footer socialLinks={links ?? []} contents={contents} />
    </div>
  )
}
