export interface DonationFormValues {
  fullName: string
  email: string
  phoneNumber: string
  donationAmount: string
  purposeOfDonation: string
  paymentScreenshot: FileList | null
  message?: string
}

export const PURPOSE_OPTIONS = [
  { value: 'classroom_learning', label: 'Classroom Learning' },
  { value: 'school_facilities', label: 'School Facilities' },
  { value: 'student_development', label: 'Student Development' },
  { value: 'learning_materials', label: 'Learning Materials' },
  { value: 'activities', label: 'Activities & Events' },
  { value: 'other', label: 'Other' },
]