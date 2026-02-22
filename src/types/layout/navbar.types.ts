export interface NavLink {
  label: string
  href: string
  dropdown?: NavLink[]
}

export interface SocialLink {
  icon: string // icon name
  href: string
  label: string
}

export interface TopBarInfo {
  address: string
  phone: string[]
  socials: SocialLink[]
}