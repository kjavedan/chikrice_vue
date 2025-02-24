import { useI18n } from 'vue-i18n'

export const is = (val: unknown, type: string) => {
  return toString.call(val) === `[object ${type}]`
}

export const isObject = (val: any): val is Record<any, any> => {
  return val !== null && is(val, 'Object')
}

export const isArray = (val: any): val is Array<any> => {
  return val && Array.isArray(val)
}

export const isLtr = (): Boolean => {
  const { locale } = useI18n()
  const isLtrLocale = locale.value === 'en' || locale.value === 'zh-CN'
  return isLtrLocale ? true : false
}

export const isRotate = () => {
  return isLtr() ? false : true
}
