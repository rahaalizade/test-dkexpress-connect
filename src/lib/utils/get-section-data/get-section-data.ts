import { Contents } from './get-section-data.types'

const get_section_data = (contents: Contents, sectionsName: string[]) => {
  if (
    !contents ||
    !contents?.length ||
    !sectionsName ||
    !sectionsName?.length
  ) {
    return []
  }

  const sections = contents.filter(content => {
    return sectionsName.includes(content.section)
  })

  return sections
}

export { get_section_data }
