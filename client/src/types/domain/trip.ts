import type { Coordinates, DataRange } from "./common";

export type TripStatus = "NOT_STARTED" | "ACTIVE" | "FINISHED" | "CANCELLED";

export interface Stage {
  id: number;
  dateRange: DataRange;
  coordinates: Coordinates;
  numberOfPeople: number;
}

export interface Trip {
  id: number;
  status: TripStatus;
  stages: Stage[];
  dataUpdate: Date;
  startDate: Date;
  endDate: Date;
}

export type StageCreate = Omit<Stage, "id">;
export type StageEdit = StageCreate

export type TripCreate = Omit<Trip, "id" | "status" | "dataUpdate" | "startDate" | "endDate" | "stages"> & {
  stages: StageCreate[];
};
export type TripEdit = Omit<Trip, "status" | "dataUpdate"  | "startDate" | "endDate"  | "stages">  & {
  stages: StageEdit[];
};
export type TripCancel = TripEdit;


