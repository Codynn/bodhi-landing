export interface ContactInfo {
  phone: string[]
  address: string
  schoolHours: string
  social: {
    facebook:  string
    youtube:   string
    instagram: string
    linkedin:  string
  }
  mapEmbedUrl: string
}

export interface ContactContent {
  breadcrumb: { label: string; href: string }[]
  pageTitle:  string
  sectionTag: string
  heading:    string
  info:       ContactInfo
  formTitle:  string
  submitLabel: string
}