import axios from 'axios'
import type { FingerprintCaptureAPIResponse } from '../features/fingerprints'

const API = axios.create({
  baseURL: import.meta.env.VITE_FINGERPRINT_API_URL,
})

const fingerprintService = () => {
  const captureFingerprint = async (
    controller: AbortController
  ): Promise<FingerprintCaptureAPIResponse> => {
    const payload = new URLSearchParams({
      Timeout: '10000',
      Quality: '80',
      templateFormat: 'ISO',
      imageWSQRate: '0.75',
      // licstr: import.meta.env.VITE_FINGERPRINT_LICENSE
    })

    const { data } = await API.post('/SGIFPCapture', payload, {
      timeout: 15000,
      signal: controller.signal,
    })
    return data
  }

  const matchFingerprints = async (
    template1: string,
    template2: string,
    controller: AbortController
  ) => {
    const payload = new URLSearchParams({
      template1: template1,
      template2: template2,
      templateFormat: 'ISO',
      // licstr: import.meta.env.VITE_FINGERPRINT_LICENSE
    })

    const { data } = await API.post('/SGIMatchScore', payload, {
      timeout: 15000,
      signal: controller.signal,
    })
    return data
  }

  return { captureFingerprint, matchFingerprints }
}

const getErrorMessageFromErrorCode = (errorCode: number): string => {
  let msg: string

  switch (errorCode) {
    case 1:
      msg =
        'Creation failed (fingerprint reader not correctly installed or driver files error)'
      break
    case 2:
      msg =
        'Function failed (wrong type of fingerprint reader or not correctly installed)'
      break
    case 3:
      msg = 'Internal (invalid parameters to sensor API)'
      break
    case 5:
      msg = 'DLL load failed'
      break
    case 6:
      msg = 'DLL load failed for driver'
      break
    case 7:
      msg = 'DLL load failed for algorithm'
      break
    case 51:
      msg = 'System file load failure'
      break
    case 52:
      msg = 'Sensor chip initialization failed'
      break
    case 53:
      msg = 'Sensor line dropped'
      break
    case 54:
      msg = 'Timeout'
      break
    case 55:
      msg = 'Device not found'
      break
    case 56:
      msg = 'Driver load failed'
      break
    case 57:
      msg = 'Wrong image'
      break
    case 58:
      msg = 'Lack of bandwidth'
      break
    case 59:
      msg = 'Device busy'
      break
    case 60:
      msg = 'Cannot get serial number of the device'
      break
    case 61:
      msg = 'Unsupported device'
      break
    case 101:
      msg = 'Very low minutiae count'
      break
    case 102:
      msg = 'Wrong template type'
      break
    case 103:
      msg = 'Invalid template'
      break
    case 104:
      msg = 'Invalid template'
      break
    case 105:
      msg = 'Could not extract features'
      break
    case 106:
      msg = 'Match failed'
      break
    case 1000:
      msg = 'No memory'
      break
    case 4000:
      msg = 'Invalid parameter passed to service'
      break
    case 2000:
      msg = 'Internal error'
      break
    case 3000:
      msg = 'Internal error extended'
      break
    case 6000:
      msg = 'Certificate error cannot decode'
      break
    case 10001:
      msg = 'License error'
      break
    case 10002:
      msg = 'Invalid domain'
      break
    case 10003:
      msg = 'License expired'
      break
    case 10004:
      msg = 'WebAPI may not have received the origin header from the browser'
      break

    default:
      msg = 'Unknown error'
      break
  }

  return msg
}

export { fingerprintService as default, getErrorMessageFromErrorCode }
