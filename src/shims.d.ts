declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}
// src/shims-vue.d.ts
declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
