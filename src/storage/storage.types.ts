import type { ObjectId } from "mongodb"

export interface Meeting {
  name: string
}

export interface MeetingModel extends Meeting {
  _id?: ObjectId
}
