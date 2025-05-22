import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getFingerprintsByStudent, createFingerprint } from './api'
import type { CreateFingerprintSchema } from './schema'
import type { CaptureState, MatchingState } from './types'
import fingerprintService, {
  getErrorMessage,
} from '../../libs/fingerprintService'
import type { APIResponse } from '../../types'
import type { AxiosError } from 'axios'
import { toast } from 'react-toastify'
import { useFingerprintStore } from './store'
import type { RefObject } from 'react'
import FingerImg2 from '../../assets/imgs/PlaceFinger2.bmp'

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

const useFingerprintMatching = (
  setMatchingStatus: (arg: MatchingState) => void,
  imageRef: RefObject<HTMLImageElement>,
  fingerprintTemplate: string
) => {
  const { startCapture, stopCapture } = useFingerprintCapture(setMatchingStatus)
  const { matchFingerprints } = fingerprintService()
  const controller = new AbortController()
  let msg: MatchingState

  const startMatching = async () => {
    setMatchingStatus('Matching...')
    try {
      const captureRes = await startCapture()
      if (!captureRes) {
        imageRef.current!.src = FingerImg2
        return
      }

      imageRef.current!.src = `data:image/bmp;base64,${captureRes.BMPBase64}`

      const matchRes = await matchFingerprints(
        fingerprintTemplate,
        captureRes.TemplateBase64,
        controller
      )
      if (!res) throw new Error('Connection Error. Try again')

      if (res.data?.ErrorCode !== 0) {
        msg = getErrorMessage(res.data?.ErrorCode)
        return
      }	

      msg = 'Matching completed'
      return matchRes
    } catch (err) {
      msg = (err as Error).message
    } finally {
      setMatchingStatus(msg)
    }
  }

  const stopMatching = () => {
    stopCapture()
    controller.abort()
  }

  return { startMatching, stopMatching }
}

export {
  useFingerprintsByStudent,
  useCreateFingerprint,
  useFingerprintCapture,
  useFingerprintMatching,
}
