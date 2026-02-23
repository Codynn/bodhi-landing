export interface FooterLink {
  label: string
  href: string
}

export interface FooterSocials {
  facebook: string
  youtube: string
  instagram: string
  linkedin: string
}

export interface FooterContent {
  description: string
  phone: string
  quickLinks: FooterLink[]
  socials: FooterSocials
  copyright: string
  builtBy: string
  builtByHref: string
}