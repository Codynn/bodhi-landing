export interface Notice {
  id: number
  category: string
  date: string
  title: string
  description: string
  fullContent: string   // ← full rich content for the modal
  href: string
}

export interface NoticesContent {
  label: string
  heading: string
}