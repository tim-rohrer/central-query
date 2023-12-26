import { DateTime } from "luxon"

import { RTCRange } from "../endpoint-options.types"

export enum Weekdays {
  MONDAY = 1,
  TUESDAY,
  WEDNESDAY,
  THURSDAY,
  FRIDAY,
  SATURDAY,
  SUNDAY,
}

export const prevWeekday = {
  0: Weekdays.SUNDAY,
  1: Weekdays.MONDAY,
  2: Weekdays.TUESDAY,
  3: Weekdays.WEDNESDAY,
  4: Weekdays.THURSDAY,
  5: Weekdays.FRIDAY,
  6: Weekdays.SATURDAY,
}

export type PrevWeekday = keyof typeof prevWeekday

export const newWeekday = (previous: PrevWeekday) => prevWeekday[previous]

export const dstAware = (time: string, tz: string) => {
  const localTimeParts = time.split(":")
  const now = DateTime.utc()
  const date = {
    year: now.year,
    month: now.month,
    day: now.day,
    hour: Number(localTimeParts[0]),
    minute: Number(localTimeParts[1]),
  }

  return DateTime.fromObject(date, { zone: tz })
}

export const nextOccurrence = (dayOfWeek: Weekdays, dateTime: DateTime) => {
  const adjustedDayOfWeek = dayOfWeek
  const advance = (adjustedDayOfWeek + (7 - dateTime.get("weekday"))) % 7
  const newOrdinalDate = dateTime.ordinal + advance
  return dateTime.set({ ordinal: newOrdinalDate })
}

const rtc = (time: DateTime) => time.weekday + ":" + time.toFormat("HH:mm")

export const lowerUpperLimits = (time: string, hours: number) => {
  const rqstTime = DateTime.fromISO(time).toUTC()
  const lower = rqstTime.minus({ minutes: 9 })
  const upper = rqstTime.plus({ hours })
  let ranges: RTCRange[] = []
  if (lower.weekday === upper.weekday) {
    ranges = [{ lowerRTC: rtc(lower), upperRTC: rtc(upper) }]
  } else {
    ranges = [
      {
        lowerRTC: rtc(lower),
        upperRTC: `${lower.weekday}:24:00`,
      },
      {
        lowerRTC: `${upper.weekday}:00:00`,
        upperRTC: rtc(upper),
      },
    ]
  }

  return ranges
}

const zeroPad = (num: number, places: number) =>
  String(num).padStart(places, "0")

const dayFromOffset = (weekday: number, offset: number) =>
  correctedDay(offset > 0 ? weekday - 1 : weekday)

const correctedDay = (num: number) => {
  if (num === 0) return 7
  if (num === 8) return 1
  return num
}

const hrsMinsFromOffset = (offset: number) => {
  const hourAdj = Math.floor((0 - offset) / 60)
  return {
    localHour: hourAdj < 0 ? hourAdj + 24 : hourAdj,
    localMin: offset % 60,
  }
}

const startParts = (weekday: number, offset: number) => {
  const { localHour, localMin } = hrsMinsFromOffset(offset)
  return {
    day: dayFromOffset(weekday, offset),
    hour: zeroPad(localHour, 2),
    mins: zeroPad(localMin, 2),
  }
}

export const dayLimits = (weekday: number, offset: number) => {
  const { day, hour, mins } = startParts(weekday, offset)
  const endDay = correctedDay(day + 1)
  return [
    {
      lowerRTC: `${day}:${hour}:${mins}`,
      upperRTC: `${day}:24:00`,
    },
    {
      lowerRTC: `${endDay}:00:00`,
      upperRTC: `${endDay}:${hour}:${mins}`,
    },
  ]
}
