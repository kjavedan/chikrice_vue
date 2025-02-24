import type { CSSProperties } from 'vue'

declare global {
  declare type LocaleType = 'zh-CN' | 'en' | 'ar' | 'fa'

  declare type Recordable<T = any, K = string> = Record<K extends null | undefined ? string : K, T>

  declare module '*.md' {
    const content: string
    export default content
  }
}
