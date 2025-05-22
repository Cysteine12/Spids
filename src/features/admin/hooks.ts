import { useQuery } from '@tanstack/react-query'
import { getProfile } from './api'

const useProfile = () => {
  return useQuery({
    queryFn: getProfile,
    queryKey: ['profile'],
  })
}

export { useProfile }
