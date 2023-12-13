type ISOString = string // TODO see if there is a way to better reflect where this needs to come from

interface BasicFilter {
  limit?: number
  types?: string[]
}
export interface NextOptions extends BasicFilter {
  start: ISOString
  hours: number
}

export type RTCRange = {
  lowerRTC: string
  upperRTC: string
}

export interface PipelineFields extends BasicFilter {
  rtcRanges: RTCRange[]
}
