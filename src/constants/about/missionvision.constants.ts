import { MissionVisionContent } from '@/types/about/missionvision.types'
import { Handshake, Eye } from 'lucide-react'

export const MISSION_VISION_CONTENT: MissionVisionContent = {
  items: [
    {
      icon: Handshake,
      iconBg: '#3B4FA8',
      title: 'Our Mission',
      description:
        'Our mission is to provide a safe and supportive learning environment where every child can thrive academically, socially, and emotionally. We focus on nurturing curiosity, critical thinking, and creativity alongside strong academic foundations. Through our dedicated teachers, structured programs, and active collaboration with parents, we aim to guide students into becoming confident, responsible, and well-rounded individuals. We believe in holistic development, where education is about knowledge, values, life skills, and the ability to face future challenges with resilience and confidence.',
    },
    {
      icon: Eye,
      iconBg: '#2D7A6A',
      title: 'Our Vision',
      description:
        'Our vision is to be a trusted institution that inspires students to achieve excellence while growing into responsible, confident, and compassionate individuals. We strive to create a learning environment that encourages exploration, curiosity, and a lifelong love for learning. By fostering discipline, inclusivity, and respect, we aim to prepare students not only for academic success but also to contribute positively to society. At Bodhi International Montessori School, every child is supported to develop the skills, values, and mindset needed for success and personal fulfillment.',
    },
  ],
}