import { WhyChooseContent, WhyChooseFeature } from '@/types/home/why-choose.constants'
import { Shield, ShieldCheck, ShieldCheckIcon } from 'lucide-react'

export const WHY_CHOOSE_CONTENT: WhyChooseContent = {
  label: 'Why Parents Choose Us',
  heading: 'What makes our school a reliable choice for your child.',
  description:
    'We understand what parents look for in a school: safety, quality teaching, discipline, and personal attention. Our classrooms are student-friendly, our teachers are dedicated, and our learning approach balances academics with activities to support overall development.',
}

export const WHY_CHOOSE_FEATURES: WhyChooseFeature[] = [
  {
    icon: '/icon/teacher.svg',       // 👈 replace with actual filename
    iconBg: '#7B1C1C',
    title: 'Qualified & Caring Teachers',
    description:
      'Our experienced and dedicated teachers guide students with patience, care, and a strong focus on academic understanding and personal growth.',
  },
  {
    icon: ShieldCheckIcon,        
    iconBg: '#1C3A7B',
    title: 'Safe & Secure Environment',
    description:
      'We provide a safe, clean, and well-managed school environment where children feel protected, confident, and comfortable every day.',
  },
  {
    icon: '/icon/court-law.svg',         
    iconBg: '#1C7B3A',
    title: 'Discipline with Strong Values',
    description:
      'We emphasize discipline, respect, and moral values to help students develop positive behavior, responsibility, and good character.',
  },
  {
    icon: '/icon/user-switch.svg',
    iconBg: '#7B6B1C',
    title: 'Active Parent–Teacher Communication',
    description:
      "We maintain regular communication with parents through meetings and updates, ensuring transparency and shared responsibility in a child's progress.",
  },
]