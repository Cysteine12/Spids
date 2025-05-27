import type { CreateFingerprintSchema } from './schema'

export type Fingerprint = CreateFingerprintSchema & {
  id: string
  createdAt: string
  updatedAt: string
}

export type FingerType = 'THUMB' | 'INDEX' | 'MIDDLE' | 'RING' | 'PINKY'

export type CaptureState =
  | 'Ready to capture'
  | 'Capturing...'
  | 'Poor quality. Try again'
  | 'Capture successful'
  | 'Saving...'
  | (string & {})

export type MatchState =
  | 'Ready to match'
  | 'Matching...'
  | 'Matching verified'
  | 'Matching failed'
  | (string & {})

export type FingerprintCaptureAPIResponse =
  | ({
      ErrorCode: 0
      status: 'success'
    } & FingerprintAPISuccessRes)
  | ({
      ErrorCode: number
      status: 'failed'
    } & Partial<FingerprintAPISuccessRes>)

type FingerprintAPISuccessRes = {
  Manufacturer: string
  Model: string
  SerialNumber: string
  ImageWidth: number
  ImageHeight: number
  ImageDPI: number
  ImageQuality: number
  NFIQ: number
  ImageDataBase64: string | null
  BMPBase64: string
  ISOTemplateBase64: string
  TemplateBase64: string
}
