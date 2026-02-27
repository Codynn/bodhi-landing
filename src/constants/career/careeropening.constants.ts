import { CareerOpeningsContent, JobOpening } from '@/types/career/careeropening.types'

export const CAREER_OPENINGS_CONTENT: CareerOpeningsContent = {
  sectionHeading: 'Current Openings',
  emptyState: {
    heading:     'We currently do not have any job openings.',
    subtext:     'However, if you would like to be considered for future opportunities, please share your CV with us.',
    submitLabel: 'Submit CV',
    submitHref:  '/contact',
  },
}

export const JOB_OPENINGS: JobOpening[] = [
  {
    id:          '1',
    title:       'Science Teacher – Class 4',
    description: 'Interested candidates are requested to fill out the career application form with their details and attach their updated C...',
    type:        'Full Time',
    date:        '2082/08/01',
    href:        '/career/science-teacher-class-4',
  },
  {
    id:          '2',
    title:       'Science Teacher – Class 3',
    description: 'Interested candidates are requested to fill out the career application form with their details and attach their updated C...',
    type:        'Full Time',
    date:        '2082/08/01',
    href:        '/career/science-teacher-class-3',
  },
  {
    id:          '3',
    title:       'Science Teacher – Class 2',
    description: 'Interested candidates are requested to fill out the career application form with their details and attach their updated C...',
    type:        'Full Time',
    date:        '2082/08/01',
    href:        '/career/science-teacher-class-2-a',
  },
  {
    id:          '4',
    title:       'Science Teacher – Class 2',
    description: 'Interested candidates are requested to fill out the career application form with their details and attach their updated C...',
    type:        'Full Time',
    date:        '2082/08/01',
    href:        '/career/science-teacher-class-2-b',
  },
  {
    id:          '5',
    title:       'Science Teacher – Class 2',
    description: 'Interested candidates are requested to fill out the career application form with their details and attach their updated C...',
    type:        'Full Time',
    date:        '2082/08/01',
    href:        '/career/science-teacher-class-2-c',
  },
  {
    id:          '6',
    title:       'Science Teacher – Class 2',
    description: 'Interested candidates are requested to fill out the career application form with their details and attach their updated C...',
    type:        'Full Time',
    date:        '2082/08/01',
    href:        '/career/science-teacher-class-2-d',
  },
]