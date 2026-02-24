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

Thank you.

This is to inform you that a Parent-Teacher Meeting has been scheduled to discuss your academic progress, general behaviour, and overall development.

We kindly request you to inform your parents or guardians and ensure their presence in this important meeting. Your cooperation will help us work together to support your learning journey effectively.`,
    href: '/notices/1',
  },
  {
    id: 2,
    category: 'Notice',
    date: '2082/10/19',
    title: 'Annual Sports Day Announcement',
    description:
      'We are excited to announce the Annual Sports Day event. Students are encouraged to participate in various athletic activities and showcase their talents in a fun and competitive environment.',
    fullContent: `We are pleased to announce that our Annual Sports Day will be held on the school grounds. This is a wonderful opportunity for students to demonstrate their athletic abilities and team spirit.

All students are required to participate in at least one event. Parents and guardians are warmly invited to attend and cheer for their children.

  • Date: 2081-12-15
  • Time: 8:00 AM – 4:00 PM
  • Venue: School Sports Ground

Students must wear their sports uniforms on the day of the event. Please bring water bottles and light snacks. Awards and certificates will be distributed to winners at the end of the day.

For event registration and further details, please contact the Physical Education department or your class teacher.

We look forward to a day full of energy, sportsmanship, and memorable moments.`,
    href: '/notices/2',
  },
  {
    id: 3,
    category: 'Notice',
    date: '2082/09/05',
    title: 'Mid-Term Examination Schedule Released',
    description:
      'The mid-term examination timetable has been officially released. Students are advised to begin their preparation early and review all subjects covered in the first half of the academic year.',
    fullContent: `The school administration is pleased to announce that the Mid-Term Examination Schedule has been officially released for all classes.

Students are strongly advised to begin their revision immediately and focus on all topics covered since the beginning of the academic session.

Examination Guidelines:
  • Students must arrive 15 minutes before the exam begins
  • Mobile phones and electronic devices are strictly prohibited
  • Only permitted stationery should be brought into the examination hall
  • Admit cards must be carried on all examination days

  • Exam Start Date: 2082/09/20
  • Duration: 10 days
  • Venue: Respective Classrooms

Parents are requested to ensure their children are well-rested and prepared. Please refer to the detailed timetable posted on the school notice board and official website.

For any exam-related concerns, please reach out to the academic coordinator.`,
    href: '/notices/3',
  },
  {
    id: 4,
    category: 'Notice',
    date: '2082/08/22',
    title: 'School Uniform Policy Update',
    description:
      'The school has updated its uniform policy effective from the next academic month. All students are required to adhere strictly to the new guidelines to maintain discipline and a sense of unity.',
    fullContent: `Dear Parents and Students,

The school management has reviewed and updated the School Uniform Policy, effective from the 1st of next month. These changes have been made to ensure uniformity, discipline, and a professional appearance among all students.

Key Updates:
  • White shirts/blouses must be fully tucked in at all times
  • School shoes must be plain black with no decorative elements
  • Ties and belts are mandatory for Grade 6 and above
  • Hair must be neatly tied for female students; short and tidy for male students
  • No jewelry or accessories except small stud earrings for girls

Non-compliance will result in a disciplinary warning. Repeated violations may require parents to be called in for a meeting.

We appreciate your cooperation in maintaining the school's standards. Uniform inspection will be conducted every Monday morning starting next month.

Please contact the school office if you have any questions regarding the updated policy.

Thank you for your continued support.`,
    href: '/notices/4',
  },
  {
    id: 5,
    category: 'Notice',
    date: '2082/08/10',
    title: 'Science Exhibition – Student Participation',
    description:
      'The annual Science Exhibition is approaching. Students from Grade 5 to Grade 10 are invited to submit their project proposals. This is a great opportunity to showcase creativity and scientific thinking.',
    fullContent: `We are thrilled to announce the Annual Science Exhibition open to all students from Grade 5 to Grade 10.

This year's theme is "Innovation for a Sustainable Future." Students are encouraged to design projects that address real-world problems using scientific principles and creative solutions.

Participation Guidelines:
  • Project proposals must be submitted by 2082/08/25
  • Teams of 2–4 students are allowed
  • Each team must have a supervising teacher
  • Projects will be evaluated on creativity, scientific accuracy, and presentation

  • Exhibition Date: 2082/09/10
  • Time: 9:00 AM – 3:00 PM
  • Venue: School Main Hall

Top three projects will receive trophies, certificates, and a chance to represent the school at the District Science Fair.

Proposal submission forms are available from your class teacher or the school office. Don't miss this exciting opportunity to inspire and be inspired!`,
    href: '/notices/5',
  },
  {
    id: 6,
    category: 'Notice',
    date: '2082/08/01',
    title: 'Holiday Notice – Dashain & Tihar Break',
    description:
      'The school will remain closed during the Dashain and Tihar festival holidays. Students are wished a joyful and safe festive season. Classes will resume as per the academic calendar.',
    fullContent: `Dear Students, Parents, and Staff,

In observance of the auspicious festivals of Dashain and Tihar, the school will be officially closed during the festive break. We wish all members of our school family a joyful, safe, and blessed celebration.

Holiday Schedule:
  • Dashain Break: 2082/09/01 – 2082/09/12
  • Tihar Break: 2082/09/28 – 2082/10/02
  • School Reopens: 2082/10/03 (Monday)

Important Reminders:
  • All pending assignments must be submitted on the first day back
  • Students should use the holiday to revise lessons and rest adequately
  • Any emergencies can be communicated via the school's official email

The school administration takes this opportunity to extend warm festive greetings to all families. May this season bring happiness, prosperity, and good health to everyone.

We look forward to welcoming everyone back refreshed and ready to learn.

Happy Dashain and Tihar!`,
    href: '/notices/6',
  },
]