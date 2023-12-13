import { Ok } from "ts-results-es"

import Logger from "./common/logger.js"
import * as eventsStore from "./storage/event.mongodb.service.js"

export const getAll = async (options: Record<string, string>) => {
  Logger.debug(`Time is now: ${options.start}`)
  const result = await eventsStore.getAllEvents()
  Logger.debug(`eventStore fetch ${result.length} meetings.`)
  return Ok(result)
}
