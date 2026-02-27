export interface DonationColumn {
  title: string
  subtitle: string
  points: string[]
}

export interface TwoWaysContent {
  tag: string
  heading: string
  description: string
  left: DonationColumn
  right: DonationColumn
}