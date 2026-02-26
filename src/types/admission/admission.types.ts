export interface AdmissionFormValues {
  // Student Details
  studentFullName: string
  dateOfBirth: string
  address: string
  gradeLevel: string
  // Parent/Guardian Details
  parentFullName: string
  relationshipToStudent: string
  email: string
  phoneNumber: string
  message?: string
}

export const GRADE_OPTIONS = [
  { value: 'nursery', label: 'Nursery' },
  { value: 'lkg', label: 'LKG' },
  { value: 'ukg', label: 'UKG' },
]

export const RELATIONSHIP_OPTIONS = [
  { value: 'father', label: 'Father' },
  { value: 'mother', label: 'Mother' },
  { value: 'guardian', label: 'Guardian' },
  { value: 'other', label: 'Other' },
]