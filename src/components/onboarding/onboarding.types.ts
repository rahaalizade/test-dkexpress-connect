interface OnboardingProps {
  data: OnboardingDataItem
}

type Button = {
  name: string
  link: string
  type: 'filled' | 'outline'
}

type SubSection = {
  title: string
  content: string
  buttons: Button[]
  video_url: string
  video: string
  id: string
}

type ContentSection = {
  title: string
  icon: string
  sub_sections: SubSection[]
  icon_url: string
  id: string
}

type OnboardingDataItem = {
  id: number
  title: string
  description: string | null
  slug: string
  content: ContentSection[]
  created_at: string
  updated_at: string
}

export type { OnboardingProps, OnboardingDataItem }
