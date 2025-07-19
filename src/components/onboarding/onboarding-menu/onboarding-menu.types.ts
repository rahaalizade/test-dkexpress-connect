import { OnboardingDataItem } from '@/components/onboarding/onboarding.types'

interface OnboardingMenuProps {
  data: OnboardingDataItem
  selectedMenuID: string
  setSelectedMenuID: any
  selectedSubMenuID2: string
  setSelectedSubMenuID: any
  scrollToSection: any
}

export type { OnboardingMenuProps }
