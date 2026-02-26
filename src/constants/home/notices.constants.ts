import { Notice, NoticesContent } from "@/types/home/notices.types"

export const NOTICES_CONTENT: NoticesContent = {
  label: 'Notices & Updates',
  heading: 'Stay informed with the latest announcements and school updates',
}

export const NOTICES_DATA: Notice[] = [
  {
    id: 1,
    category: 'Notice',
    date: '2082/10/19',
    title: 'Upcoming Parent-Teacher Meeting Schedule',
    description:
      'Our school is organizing a Parent-Teacher Meeting to discuss student progress, behaviour, and overall development. Parents are kindly requested to attend and cooperate with teachers.',
    fullContent: `This is to inform you that a Parent-Teacher Meeting has been scheduled to discuss your academic progress, general behaviour, and overall development.

We kindly request you to inform your parents or guardians and ensure their presence in this important meeting. Your cooperation will help us work together to support your learning journey effectively.

  • Date: 2081-11-02
  • Time: 10:00 AM
  • Venue: School Premises

Please be on time and accompany your parents during the meeting. For any queries, feel free to contact your class teacher.

Thank you.`,
    href: '/notices/1',
  },

  {
    id: 2,
    category: 'Notice',
    date: '2082/10/19',
    title: 'Annual Sports Day Announcement',
    description:
      'We are excited to announce the Annual Sports Day event. Students are encouraged to participate in various athletic activities and showcase their talents in a fun and competitive environment.',
    fullContent: `We are pleased to announce that our Annual Sports Day will be held on the school grounds.

  • Date: 2081-12-15
  • Time: 8:00 AM – 4:00 PM
  • Venue: School Sports Ground

All students must wear sports uniforms. Awards and certificates will be distributed to winners.

Parents are warmly invited to attend and support the students.`,
    href: '/notices/2',
  },

  {
    id: 3,
    category: 'Notice',
    date: '2082/09/05',
    title: 'Mid-Term Examination Schedule Released',
    description:
      'The mid-term examination timetable has been officially released. Students are advised to begin their preparation early.',
    fullContent: `The Mid-Term Examination Schedule has been released.

Guidelines:
  • Reach exam hall 15 minutes early
  • Mobile phones strictly prohibited
  • Admit cards are mandatory

  • Exam Start Date: 2082/09/20
  • Duration: 10 days`,
    href: '/notices/3',
  },

  {
    id: 4,
    category: 'Notice',
    date: '2082/08/22',
    title: 'School Uniform Policy Update',
    description:
      'The school has updated its uniform policy effective from the next academic month.',
    fullContent: `The updated School Uniform Policy will be effective from next month.

Key points:
  • Proper uniform compulsory
  • Black shoes only
  • No jewelry allowed

Strict compliance is required.`,
    href: '/notices/4',
  },

  {
    id: 5,
    category: 'Notice',
    date: '2082/08/10',
    title: 'Science Exhibition – Student Participation',
    description:
      'Students from Grade 5 to Grade 10 are invited to participate in the annual Science Exhibition.',
    fullContent: `Annual Science Exhibition Announcement:

  • Theme: Innovation for a Sustainable Future
  • Proposal Deadline: 2082/08/25
  • Exhibition Date: 2082/09/10

Top projects will receive awards.`,
    href: '/notices/5',
  },

  {
    id: 6,
    category: 'Notice',
    date: '2082/08/01',
    title: 'Holiday Notice – Dashain & Tihar Break',
    description:
      'The school will remain closed during Dashain and Tihar holidays.',
    fullContent: `Holiday Schedule:

  • Dashain: 2082/09/01 – 2082/09/12
  • Tihar: 2082/09/28 – 2082/10/02
  • School Reopens: 2082/10/03

Happy Dashain and Tihar!`,
    href: '/notices/6',
  },

  /* ───────── NEW NOTICES ───────── */

  {
    id: 7,
    category: 'Notice',
    date: '2082/07/25',
    title: 'Extra Classes for SEE Appearing Students',
    description:
      'Extra preparation classes will be conducted for SEE appearing students.',
    fullContent: `Extra classes will be held for SEE appearing students to strengthen exam preparation.

  • Start Date: 2082/08/01
  • Time: 6:30 AM – 8:00 AM
  • Subjects: Mathematics, Science, English

Attendance is compulsory.`,
    href: '/notices/7',
  },

  {
    id: 8,
    category: 'Notice',
    date: '2082/07/18',
    title: 'Library Rules and Membership Update',
    description:
      'New library rules and updated membership guidelines have been introduced.',
    fullContent: `Library Rules Update:

  • One library card per student
  • Silence must be maintained
  • Books must be returned on time

Library hours: 9:00 AM – 4:00 PM.`,
    href: '/notices/8',
  },

  {
    id: 9,
    category: 'Notice',
    date: '2082/07/10',
    title: 'Computer Lab Usage Guidelines',
    description:
      'Students are requested to follow the updated computer lab usage guidelines.',
    fullContent: `Computer Lab Guidelines:

  • No food or drinks allowed
  • Log out after use
  • Handle equipment carefully

Violation of rules may result in restricted access.`,
    href: '/notices/9',
  },

  {
    id: 10,
    category: 'Notice',
    date: '2082/07/01',
    title: 'New Academic Session Commencement',
    description:
      'The new academic session will commence as per the updated academic calendar.',
    fullContent: `The new academic session will begin from 2082/07/05.

Students must report in full uniform and bring required stationery.

We welcome all students to the new academic year.`,
    href: '/notices/10',
  },
]