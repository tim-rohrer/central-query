import express from "express"

// import { currentTimestamp } from "../common/utils.js"
// import DbOperationError from "./common/custom_errors/DbOperationError.js"
import Logger from "./common/logger.js"
import * as eventsService from "./events.service.js"

export const eventsAll = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  Logger.debug(`query = ${JSON.stringify(req.query)}`)
  const start =
    req.query.start != undefined
      ? (req.query.start as string)
      : new Date().toISOString()
  const { ok, val } = await eventsService.getAll({ start })
  if (ok) {
    Logger.info(`fetch result includes ${val.length} meetings.`)
    res.status(200).json(val)
  } else {
    Logger.error(`${JSON.stringify(val)}`)
    next(val)
  }
}

// export const getNext = async (
//   req: express.Request,
//   res: express.Response,
//   next: express.NextFunction,
// ) => {
//   const time = req.query.time as string
//   Logger.debug(`Request params: ${time}`)
//   const { ok, val } = await getNextTen(time)
//   if (ok) {
//     Logger.info(`fetch result being returned includes ${val.length} meetings.`)
//     res.status(200).json(val)
//   } else {
//     Logger.error(`${JSON.stringify(val)}`)
//     next(val)
//   }
// }

// export const getByDay = async (
//   req: express.Request,
//   res: express.Response,
//   next: express.NextFunction,
// ) => {
//   const weekday = req.query.weekday as string
//   Logger.debug(`Request params for getByDay: ${JSON.stringify(req.query)}`)
//   const { ok, val } = await getDay(weekday)
//   if (ok) {
//     Logger.info(`fetch result being returned includes ${val.length} meetings.`)
//     res.status(200).json(val)
//   } else {
//     Logger.error(`${JSON.stringify(val)}`)
//     next(val)
//   }
// }
