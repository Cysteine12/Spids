import { create } from 'zustand'
import type { Fingerprint } from './types'

type FingerprintState = {
  fingerprints: Fingerprint[]
  setFingerprints: (fingerprints: Fingerprint[]) => void
  addFingerprint: (fingerprint: Fingerprint) => void
}

export const useFingerprintStore = create<FingerprintState>()((set, get) => ({
  fingerprints: [],
  setFingerprints: (fingerprints) => set({ fingerprints }),
  addFingerprint: (fingerprint) =>
    set({ fingerprints: [...get().fingerprints, fingerprint] }),
}))
