import { lowerUpperLimits } from "./dates.js"

test("lowerUpperLimits succeeds on Monday", () => {
  expect(lowerUpperLimits("2023-09-11T13:00:00Z", 2)).toEqual([
    {
      lowerRTC: "1:12:51",
      upperRTC: "1:15:00",
    },
  ])
})
test("lowerUpperLimits succeeds on Sunday", () => {
  expect(lowerUpperLimits("2023-09-10T23:00:00Z", 2)).toEqual([
    {
      lowerRTC: "7:22:51",
      upperRTC: "7:24:00",
    },
    {
      lowerRTC: "1:00:00",
      upperRTC: "1:01:00",
    },
  ])
})
test("lowerUpperLimits handles multi-day starting Sunday", () => {
  expect(lowerUpperLimits("2023-09-10T23:00:00Z", 168)).toEqual([
    {
      lowerRTC: "7:22:51",
      upperRTC: "7:24:00",
    },
    {
      lowerRTC: "1:00:00",
      upperRTC: "7:23:00",
    },
  ])
})
