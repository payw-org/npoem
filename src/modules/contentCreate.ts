const contentCreate = (poemStep: string[]): string => {
  let content = poemStep.toString()
  content = content.replace(/,/gi, '@')
  return content
}

export default contentCreate
