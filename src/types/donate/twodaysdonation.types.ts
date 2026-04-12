export interface TwoWaysContent {
  tag: string
  heading: string
  description: string
  columns: {
    title: string
    subtitle: string
    points: string[]
  }[]
}