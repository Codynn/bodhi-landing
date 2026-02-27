import { CareerHeroContent } from '@/types/career/careerhero.types'

export const CAREER_HERO_CONTENT: CareerHeroContent = {
  breadcrumb: [
    { label: 'Home',   href: '/'        },
    { label: 'Career', href: '/career'  },
  ],
  pageTitle: 'Career',
  poweredByLogo: {
    src:  '/about/hirynn.png',   
    alt:  'Powered by logo',
    href: '#',
  },
  heading: 'Join Our School Community',
  paragraphs: [
    'At Bodhi International Montessori School, we believe that passionate and dedicated educators play a vital role in shaping young minds and building a strong educational foundation. Our school is committed to creating a supportive, respectful, and disciplined working environment where teachers and staff feel valued, motivated, and empowered in their roles. We encourage collaboration, continuous learning, and professional growth, allowing our team members to develop their skills while contributing meaningfully to the academic and personal development of students.',
    'We recognize that a positive school culture starts with dedicated educators who care deeply about teaching and student well-being. If you are committed to quality education, strong values, and student-centered learning, we invite you to explore career opportunities with us. Join our team and become part of a learning community where your efforts make a real difference in shaping the future of our students.',
  ],
  staffImage: {
    src: '/about/career.png',   
    alt: 'Bodhi School staff and teachers',
  },
}