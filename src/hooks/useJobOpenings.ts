
'use client'

import { useQuery } from '@tanstack/react-query'
import { fetchJobOpenings, JobOpeningItem } from '@/services/api/jobOpeningsApi'
import { JobOpening } from '@/types/career/careeropening.types'
import { JOB_OPENINGS } from '@/constants/career/careeropening.constants'

// map API shape → local JobOpening shape
function mapToJobOpening(item: JobOpeningItem): JobOpening {
  return {
    id:          item._id,
    title:       item.title,
    description: item.description,
    type:        item.type,
    date:        new Date(item.createdAt).toLocaleDateString('en-US', {
      year:  'numeric',
      month: '2-digit',
      day:   '2-digit',
    }),
    href: `/career?id=${item._id}`,
  }
}

export function useJobOpenings() {
  const query = useQuery({
    queryKey: ['job-openings'],
    queryFn:  async () => {
      const response = await fetchJobOpenings({ page: 1, limit: 10 })
      return (response.data ?? []).map(mapToJobOpening)
    },
    staleTime: 1000 * 60 * 5,
  })

  return {
    jobs:       query.data ?? JOB_OPENINGS,  // fallback to constants
    isLoading:  query.isLoading,
    isFetching: query.isFetching,
    isError:    query.isError,
    error:      query.error as Error | null,
  }
}