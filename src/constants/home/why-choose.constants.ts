import { WhyChooseContent, WhyChooseFeature } from '@/types/home/why-choose.types'
import { Shield, ShieldCheck, ShieldCheckIcon } from 'lucide-react'

export const WHY_CHOOSE_CONTENT: WhyChooseContent = {
  label: 'Why Parents Choose Us',
  heading: 'What makes our school a reliable choice for your child.',
  description:
    'We understand what parents look for in a school: safety, quality teaching, discipline, and personal attention. Our classrooms are student-friendly, our teachers are dedicated, and our learning approach balances academics with activities to support overall development.',
}

export const PARENT_CHOOSE_CONTENT: WhyChooseContent = {
  label: 'Why Parents Choose Us',
  heading: 'A school you can trust.',
  description:
    'At Bodhi International Montessori School, we provide a safe, disciplined, and nurturing environment where every child can thrive academically, socially, and emotionally. Our qualified and caring teachers focus on building strong academic foundations while encouraging curiosity, creativity, and critical thinking. We balance lessons with activities, values education, and life skills to ensure holistic development for every student.',
  descriptionB:"We maintain regular communication with parents to keep them involved in their child’s progress and provide guidance whenever needed. Our supportive learning culture ensures that each child feels valued, motivated, and confident, helping them develop responsibility, resilience, and a lifelong love for learning. Choosing our school means giving your child a strong foundation for success and personal growth."  
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