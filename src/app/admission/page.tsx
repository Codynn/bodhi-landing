import { AdmissionSection } from '@/components/admission/AdmissionSection'

async function getAdmissionData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admission`, {
    cache: 'force-cache',
  })

  return res.json()
}

export default async function AdmissionPage() {
  const data = await getAdmissionData()

  return (
    <main className="min-h-screen bg-white">
      <AdmissionSection data={data?.admission} />
    </main>
  )
}