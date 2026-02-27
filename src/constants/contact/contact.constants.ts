import { ContactContent } from '@/types/contact/contact.types'

export const CONTACT_CONTENT: ContactContent = {
  breadcrumb: [
    { label: 'Home',       href: '/'        },
    { label: 'Contact Us', href: '/contact' },
  ],
  pageTitle:  'Contact Us',
  sectionTag: "WE'RE HERE TO HELP",
  heading:    'Get in touch with us for admissions, queries, or any school-related information.',
  info: {
    phone:       ['071-591633', '985-6025633'],
    address:     'LCM-10, Lumbini Bazar, Rupandehi',
    schoolHours: '9AM – 5PM (Sunday – Friday)',
    social: {
      facebook:  'https://facebook.com',
      youtube:   'https://youtube.com',
      instagram: 'https://instagram.com',
      linkedin:  'https://linkedin.com',
    },
    // Replace with your actual Google Maps embed URL
    mapEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.6!2d83.37!3d27.69!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDQxJzI0LjAiTiA4M8KwMjInMTIuMCJF!5e0!3m2!1sen!2snp!4v1234567890',
  },
  formTitle:   'Send us a message',
  submitLabel: 'Send Message',
}