import * as MongoDB from "mongodb"

import { Weekdays } from "../utils/dates.js"
import {
  configuredMongoDatabase,
  useCollection,
} from "./mongodb-storage-service.js"
import { Meeting, MeetingModel } from "./storage.types.js"

export const meetingCollection = useCollection("meeting")<MeetingModel>(
  configuredMongoDatabase,
)

const meetingView = useCollection("meeting-view")<MeetingModel>(
  configuredMongoDatabase,
)

export const addMeetings = async (resources: Meeting[]) =>
  await meetingCollection.insertMany(resources)

export const getAllMeetings = async () =>
  await meetingCollection.find({}).toArray()

export const dayOfWeek = async (day: number) =>
  await meetingCollection.find({ day: day }).toArray()

// const loadPipeline = (pipeline: MongoDB.Document[]) =>
//   performAggregationUsingPipeline(pipeline).toArray()

// const performAggregationUsingPipeline = (pipeline: MongoDB.Document[]) =>
//   meetingCollection.aggregate(pipeline)

const pipelineView = (pipeline: MongoDB.Document[]) =>
  meetingView.aggregate(pipeline)

const loadPipelineView = (pipeline: MongoDB.Document[]) =>
  pipelineView(pipeline).toArray()

export const query = async (queryPipeline: MongoDB.Document[]) =>
  loadPipelineView(queryPipeline)

export const byDay = async (day: Weekdays) => {
  const searchDay = day.toString()
  return loadPipelineView([
    {
      $match: { rtc: { $regex: `^${searchDay}` } },
    },
  ])
}
