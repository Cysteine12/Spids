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
  | 'Capture successful'
  | 'Saving...'
  | (string & {})

export type MatchState =
  | 'Ready to match'
  | 'Matching...'
  | 'Matching completed'
  | 'Matching verified'
  | 'Matching failed'
  | (string & {})
