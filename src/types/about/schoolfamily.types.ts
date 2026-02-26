export interface BreadcrumbItem {
  label: string
  href: string
}

export interface SchoolFamilyMember {
  name: string
  role: string
  image: string
}

export interface SchoolFamilyContent {
  breadcrumb: BreadcrumbItem[]
  pageTitle: string
  sectionTag: string
  heading: string
}