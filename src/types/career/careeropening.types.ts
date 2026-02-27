export interface JobOpening {
  id: string
  title: string
  description: string
  type: 'Full Time' | 'Part Time' | 'Contract'
  date: string        
  href: string        
}

export interface CareerOpeningsContent {
  sectionHeading: string
  emptyState: {
    heading: string
    subtext: string
    submitLabel: string
    submitHref: string
  }
}