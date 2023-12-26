import { Ok } from "ts-results-es"

import Logger from "./common/logger.js"
import { DayOptions, NextOptions } from "./endpoint-options.types.js"
import * as meetingStore from "./storage/meeting.mongodb.service.js"
import { dayLimits, lowerUpperLimits } from "./utils/dates.js"
import { pipelineFromQuery } from "./utils/pipelineFromQuery.js"

export const getNext = async (options: NextOptions) => {
  Logger.debug(`Time is now: ${options.start}`)
  const limits = lowerUpperLimits(options.start, options.hours)
  const result = await meetingStore.query(
    pipelineFromQuery({
      ...options,
      rtcRanges: limits,
    }),
  )
  Logger.debug(`meetingStore fetch ${result.length} meetings.`)
  return Ok(result)
}

export const getDay = async (options: DayOptions) => {
  Logger.debug(`Getting all meetings for day ${options.weekday}`)
  const limits = dayLimits(options.weekday, options.offset)
  const result = await meetingStore.query(
    pipelineFromQuery({
      rtcRanges: limits,
    }),
  )
  Logger.debug(`meetingStore fetch ${result.length} meetings.`)
  return Ok(result)
}
