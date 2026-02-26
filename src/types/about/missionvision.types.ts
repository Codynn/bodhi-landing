import { LucideIcon } from 'lucide-react'

export interface MissionVisionItem {
  icon: LucideIcon
  iconBg: string
  title: string
  description: string
}

export interface MissionVisionContent {
  items: MissionVisionItem[]
}