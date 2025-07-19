import Layout from '@/components/layout/layout'
import { get_section_data } from '@/lib/utils/get-section-data/get-section-data'
import { GetServerSidePropsContext } from 'next'
import { Post } from '@/components/magazine/post/post'
import Posts from '@/components/common/posts/posts'
import { getGeneralInfo } from '@/lib/api/services/general-info/general-info'
import { getPost } from '@/lib/api/services/blog/post.services'
import { PageHead } from '@/components/common/page-head/page-head'
import { useTitlePage } from '@/lib/hooks/title-page'

export default function PostPage({ generalInfo, postInfo }: any) {
  const pageTitle = useTitlePage(postInfo?.title)

  return (
    <>
      <PageHead title={pageTitle} />

      <Layout
        contents={
          get_section_data(generalInfo?.content, [
            'FOOTER_TEXT',
            'FOOTER_A_LINKS',
            'FOOTER_B_LINKS',
            'LINKEDIN_LINK',
            'INSTAGRAM_LINK',
            'APARAT_LINK',
          ]) ?? []
        }
        navBarItems={get_section_data(generalInfo?.content, ['NAV']) ?? []}
      >
        <Post {...postInfo} />
        {postInfo?.related?.length && (
          <Posts
            dividerTitle={'بسته‌های خواندنی مرتبط'}
            hasMainCard
            contents={postInfo.related ?? []}
          />
        )}
      </Layout>
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const post_id = context.params?.post ? (context.params?.post as string) : ''

  try {
    const [generalInfo, postInfo] = await Promise.all([
      getGeneralInfo({
        page: 'Text',
      }),
      getPost({ post_id }),
    ])
    return {
      props: {
        generalInfo: generalInfo?.data ?? {},
        postInfo: postInfo?.data ?? {},
      },
    }
  } catch (error) {
    return {
      props: {
        errorData: error || { hasError: true },
      },
    }
  }
}
