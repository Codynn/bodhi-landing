import { LucideIcon } from 'lucide-react'

export interface WhyChooseContent {
  label: string
  heading: string
  description: string
  descriptionB?:string
}

export interface WhyChooseFeature {
  icon: string | LucideIcon  
  iconBg: string
  title: string
  description: string
}