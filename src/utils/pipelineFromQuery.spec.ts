import { PipelineFields } from "../endpoint-options.types.js"
import { pipelineFromQuery } from "./pipelineFromQuery.js"

test("pipeline should reflect same day time range", () => {
  const testRanges: PipelineFields = {
    rtcRanges: [
      {
        lowerRTC: "7:01:00",
        upperRTC: "7:03:00",
      },
    ],
  }
  expect(pipelineFromQuery(testRanges)).toStrictEqual([
    {
      $match: {
        $and: [{ rtc: { $gte: "7:01:00" } }, { rtc: { $lte: "7:03:00" } }],
      },
    },
  ])
})
test("pipeline should reflect Sunday => Monday", () => {
  const testRanges: PipelineFields = {
    rtcRanges: [
      {
        lowerRTC: "7:23:00",
        upperRTC: "7:24:00",
      },
      {
        lowerRTC: "1:00:00",
        upperRTC: "1:01:00",
      },
    ],
  }
  expect(pipelineFromQuery(testRanges)).toStrictEqual([
    {
      $match: {
        $or: [
          {
            rtc: {
              $gte: "7:23:00",
              $lte: "7:24:00",
            },
          },
          {
            rtc: {
              $gte: "1:00:00",
              $lte: "1:01:00",
            },
          },
        ],
      },
    },
  ])
})
// test.skip("pipeline should reflect just starting time match and limit", () => {
//   expect(
//     pipelineFromQuery({ lowerRTC: "7:01:00", upperRTC: "7:03:00", limit: 25 }),
//   ).toStrictEqual([
//     {
//       $match: {
//         $and: [{ rtc: { $gte: "7:01:00" } }, { rtc: { $lte: "7:03:00" } }],
//       },
//     },
//     {
//       $limit: 25,
//     },
//   ])
// })
// test.skip("pipeline should reflect starting matches for start time and types = 'C', and limit", () => {
//   expect(
//     pipelineFromQuery({
//       lowerRTC: "7:01:00",
//       upperRTC: "7:03:00",
//       limit: 25,
//       types: ["C"],
//     }),
//   ).toStrictEqual([
//     {
//       $match: {
//         $and: [{ rtc: { $gte: "7:01:00" } }, { rtc: { $lte: "7:03:00" } }],
//         types: { $all: ["C"] },
//       },
//     },
//     {
//       $limit: 25,
//     },
//   ])
// })
