export interface StepType {
  label: string
  value: number
}

export interface PropsTypes {
  step: number
  steps: StepType[]
  goTo: (index: number) => void
}
