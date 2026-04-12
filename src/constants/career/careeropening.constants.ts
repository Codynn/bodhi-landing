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
    href:        '/career?id=1',
  },
  {
    id:          '2',
    title:       'Science Teacher – Class 3',
    description: 'Interested candidates are requested to fill out the career application form with their details and attach their updated C...',
    type:        'Full Time',
    date:        '2082/08/01',
    href:        '/career?id=2',
  },
  {
    id:          '3',
    title:       'Science Teacher – Class 2',
    description: 'Interested candidates are requested to fill out the career application form with their details and attach their updated C...',
    type:        'Full Time',
    date:        '2082/08/01',
    href:        '/career?id=3',
  },
  {
    id:          '4',
    title:       'Science Teacher – Class 2',
    description: 'Interested candidates are requested to fill out the career application form with their details and attach their updated C...',
    type:        'Full Time',
    date:        '2082/08/01',
    href:        '/career?id=4',
  },
  {
    id:          '5',
    title:       'Science Teacher – Class 2',
    description: 'Interested candidates are requested to fill out the career application form with their details and attach their updated C...',
    type:        'Full Time',
    date:        '2082/08/01',
    href:        '/career?id=5',
  },
  {
    id:          '6',
    title:       'Science Teacher – Class 2',
    description: 'Interested candidates are requested to fill out the career application form with their details and attach their updated C...',
    type:        'Full Time',
    date:        '2082/08/01',
    href:        '/career?id=6',
  },
]