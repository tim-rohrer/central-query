/** Replace this file with Integration test through Cypress, otherwise update from server-side-demo */
import { jest } from "@jest/globals"

import { PrevWeekday } from "../utils/dates.js"
import {
  addMeetings,
  getAllMeetings,
  meetingCollection,
} from "./meeting.mongodb.service.js"
import { mongoClient } from "./mongodb-storage-service.js"

async function setupDatabase(data: TestData[]) {
  await meetingCollection.insertMany(data)
}

export interface TestData {
  day: PrevWeekday
  time: string
  timezone: string
  name: string
}

const testEvents: TestData[] = [
  {
    name: "Su-1830", // 2330Z; in DST 22:30Z
    time: "18:30",
    day: 0,
    timezone: "America/New_York",
  },
  {
    name: "Su-2300", // 2300Z
    time: "23:00",
    day: 0,
    timezone: "Atlantic/Reykjavik",
  },
  {
    name: "Su-1645", // 2345Z
    time: "16:45",
    day: 0,
    timezone: "America/Phoenix",
  },
  {
    name: "Su-2200", // 0300Z on Monday; in DST 0200Z on Monday
    time: "22:00",
    day: 0,
    timezone: "America/New_York",
  },
  {
    name: "Su-1500", // 2000Z; in DST 1900Z
    time: "15:00",
    day: 0,
    timezone: "America/New_York",
  },
]

async function resetDatabase() {
  await meetingCollection.deleteMany({})
}

beforeEach(async () => {
  await resetDatabase()
})
afterAll(async () => {
  await mongoClient.close()
  jest.useRealTimers()
})
// afterEach(async () => {
//   jest.resetAllMocks()
// })

test("getAllMeetings returns five documents", async () => {
  await setupDatabase(testEvents)
  expect(await getAllMeetings()).toHaveLength(5)
})

test("addMeetings works", async () => {
  expect((await addMeetings(testEvents)).insertedCount).toBe(5)
})
// test("Get first 10 meetings in data set", async () => {
//   setMockTime("2023-08-11T23:00:00.000Z") // 1900 EDT (DST in effect)
//   await setupDatabase(rawData)

//   const result = await meetingStorage.firstTen()

//   expect(result).toHaveLength(3)
// })

// test("faketimers and memory server", async () => {
//   jest.setSystemTime(new Date("2023-02-01"))
//   const fakeNow = new Date("2023-02-01T00:00:00.000Z")
//   expect(new Date()).toEqual(fakeNow)
//   await db.collection("timeTest").insertOne({
//     timeStamp: new Date(),
//     startDateUTC: new Date("2023-01-01"),
//     timezone: "America/New_York",
//   })
//   const result = await db.collection("timeTest").find({}).toArray()
//   expect(result[0].timeStamp).toEqual(fakeNow)

//   await db.createCollection("myView", {
//     viewOn: "timeTest",
//     pipeline: [
//       {
//         $addFields:
//           /**
//            * newField: The new field name.
//            * expression: The new field expression.
//            */
//           {
//             adjustedUTC: {
//               $dateFromParts: {
//                 year: new Date().getUTCFullYear(),
//                 month: {
//                   $add: [new Date().getUTCMonth(), 1],
//                 },
//                 day: new Date().getUTCDate(),
//                 hour: {
//                   $hour: {
//                     date: "$startDateUTC",
//                     timezone: "$timezone",
//                   },
//                 },
//                 minute: {
//                   $minute: "$startDateUTC",
//                 },
//                 timezone: "$timezone",
//               },
//             },
//             dayOfWeekStr: {
//               $toString: {
//                 $subtract: [
//                   {
//                     $toInt: {
//                       $dateToString: {
//                         date: "$startDateUTC",
//                         format: "%w",
//                       },
//                     },
//                   },
//                   1,
//                 ],
//               },
//             },
//           },
//       },
//       {
//         $project: {
//           _id: 0,
//           timeStamp: 1,
//           adjustedUTC: 1,
//           newNow: new Date(),
//         },
//       },
//     ],
//   })
//   const viewResult = await db.collection("myView").find({}).toArray()
//   console.log(viewResult)
// })

// test("Outside of DST, sorted order should match winterOrder", async () => {
//   const winterOrder = ["Su-1500", "Su-2300", "Su-1830", "Su-1645", "Su-2200"]
//   jest.setSystemTime(new Date("2023-02-01"))

//   const resultWinter = await db.collection("winter").find({}).toArray()

//   expect(resultWinter.map((e) => e.name)).toEqual(winterOrder)
// })

// test("During DST, sorted order should match summerOrder", async () => {
//   const summerOrder = ["Su-1500", "Su-1830", "Su-2300", "Su-1645", "Su-2200"]
//   setMockTime("2023-08-01T23:00:00.000Z") // 1900 EDT, summer
//   await db.createCollection("summer", {
//     viewOn: "events",
//     pipeline: [
//       {
//         $addFields: {
//           adjustedUTC: {
//             $dateFromParts: {
//               year: new Date().getUTCFullYear(),
//               month: {
//                 $add: [new Date().getUTCMonth(), 1],
//               },
//               day: new Date().getUTCDate(),
//               hour: {
//                 $hour: {
//                   date: "$startDateUTC",
//                   timezone: "$timezone",
//                 },
//               },
//               minute: {
//                 $minute: "$startDateUTC",
//               },
//               timezone: "$timezone",
//             },
//           },
//           dayOfWeekStr: {
//             $toString: {
//               $subtract: [
//                 {
//                   $toInt: {
//                     $dateToString: {
//                       date: "$startDateUTC",
//                       format: "%w",
//                     },
//                   },
//                 },
//                 1,
//               ],
//             },
//           },
//         },
//       },
//       {
//         $project: {
//           _id: 0,
//           name: 1,
//           dayStr: {
//             $toString: "$day",
//           },
//           time: 1,
//           timezone: 1,
//           startDateUTC: 1,
//           adjustedHour: {
//             $hour: {
//               date: "$startDateUTC",
//               timezone: "$timezone",
//             },
//           },
//           rtc: {
//             $concat: [
//               "$dayOfWeekStr",
//               ":",
//               {
//                 $dateToString: {
//                   date: "$adjustedUTC",
//                   format: "%H:%M",
//                 },
//               },
//             ],
//           },
//         },
//       },
//       {
//         $sort: {
//           rtc: 1,
//         },
//       },
//     ],
//   })

//   const resultSummer = await db.collection("summer").find({}).toArray()

//   expect(resultSummer.map((e) => e.name)).toEqual(summerOrder)
// })
