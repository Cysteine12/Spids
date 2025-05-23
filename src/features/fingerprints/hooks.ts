import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getFingerprintsByStudent, createFingerprint } from './api'
import type { CreateFingerprintSchema } from './schema'
import type { CaptureState, MatchState } from './types'
import fingerprintService, {
  getErrorMessage,
} from '../../libs/fingerprintService'
import type { APIResponse } from '../../types'
import type { AxiosError } from 'axios'
import { toast } from 'react-toastify'
import { useFingerprintStore } from './store'

const useFingerprintsByStudent = (studentId: string | undefined) => {
  return useQuery({
    queryFn: () => getFingerprintsByStudent(studentId!),
    queryKey: ['fingerprints'],
    enabled: !!studentId,
  })
}

const useCreateFingerprint = () => {
  const queryClient = useQueryClient()
  const { addFingerprint } = useFingerprintStore()

  return useMutation({
    mutationFn: (payload: CreateFingerprintSchema) =>
      createFingerprint(payload),
    onSuccess: (data) => {
      addFingerprint(data.data)
      queryClient.invalidateQueries({ queryKey: ['fingerprint'] })
      toast.success(data.message)
    },
    onError: (data: AxiosError<APIResponse>) => {
      toast.error(data.response?.data?.message)
    },
  })
}

const useFingerprintCapture = (
  setCaptureStatus: (arg: CaptureState) => void
) => {
  const { captureFingerprint } = fingerprintService()
  const controller = new AbortController()
  let msg: CaptureState

  const startCapture = async () => {
    setCaptureStatus('Capturing...')
    try {
      const res = await captureFingerprint(controller)
      if (!res) throw new Error('Connection Error. Try again')

      if (res.data?.ErrorCode !== 0) {
        msg = getErrorMessage(res.data?.ErrorCode)
        return
      }

      msg = 'Capture successful'
      return res
    } catch (err) {
      msg = (err as Error).message
    } finally {
      setCaptureStatus(msg)
    }
  }

  const stopCapture = () => {
    controller.abort()
  }

  return { startCapture, stopCapture }
}

const useFingerprintMatch = () => {
  const { matchFingerprints } = fingerprintService()
  const controller = new AbortController()

  const startMatch = async (
    template1: string,
    template2: string,
    setMatchStatus: (arg: MatchState) => void
  ) => {
    let msg: MatchState = ''
    setMatchStatus('Matching...')
    try {
      const res = await matchFingerprints(template1, template2, controller)
      if (!res) throw new Error('Connection Error. Try again')

      if (res.data?.ErrorCode !== 0) {
        msg = getErrorMessage(res.data?.ErrorCode)
        return
      }

      msg = 'Matching completed'
      return res
    } catch (err) {
      msg = (err as Error).message
    } finally {
      setMatchStatus(msg)
    }
  }

  const stopMatch = () => {
    controller.abort()
  }

  return { startMatch, stopMatch }
}

export {
  useFingerprintsByStudent,
  useCreateFingerprint,
  useFingerprintCapture,
  useFingerprintMatch,
}
