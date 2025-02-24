import { markDownHeaderContentDB, markDownFooterContentDB } from '@/markdown'

export const getHeaderContentByLocale = (locale: string, stepNumber: number) => {
  console.log('ran')

  return markDownHeaderContentDB[locale]
    ? markDownHeaderContentDB[locale][stepNumber]
    : markDownHeaderContentDB['en'][stepNumber]
}
export const getFooterContentByLocale = (locale: string, stepNumber: number) => {
  return markDownFooterContentDB[locale]
    ? markDownFooterContentDB[locale][stepNumber]
    : markDownFooterContentDB['en'][stepNumber]
}
