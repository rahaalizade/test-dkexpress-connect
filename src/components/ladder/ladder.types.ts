interface LadderProps {
  data: JobLadder
}

type JobLadder = {
  id: number
  title: string
  description: string
  slug: string
  content: ContentItem[]
  created_at: string
  updated_at: string
}

type ContentItem = {
  id: string
  title: string
  sub_topics: SubTopic[]
}

type SubTopic = {
  id: string
  icon: string | null
  title: string
  content: string
  sections: Section[]
  icon_url: string | null
}

type Section = {
  title: string
  content: string
}

export type { LadderProps }
