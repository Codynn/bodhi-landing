export interface JobOpening {
  id:          string
  title:       string
  description: string
  type:        string  // formatted from API's employmentType e.g. "FULL_TIME" → "Full Time"
  date:        string
}

export interface CareerOpeningsContent {
  sectionHeading: string
  emptyState: {
    heading:     string
    subtext:     string
    submitLabel: string
    submitHref:  string
  }
}