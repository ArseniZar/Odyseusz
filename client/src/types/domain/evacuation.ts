import type { Coordinates } from "./common";
export type EvacuationStatus = "ACTIVE" | "CANCELLED";

export interface CollectionPoint {
  id: number;
  name: string;
  description: string;
  coordinates: Coordinates;
}

export interface Assistant {
  id: number;
  name: string;
  workingHours: string;
  phone: string;
  email: string;
}

export interface Area {
  id: number;
  coordinates: Coordinates;
  radius: number;
}

export interface Evacuation {
  id: number;
  status: EvacuationStatus;
  name: string;
  reason: string;
  description: string;
  canEdit: boolean;
  areas: Area[];
  collectionPoints: CollectionPoint[];
  assistants: Assistant[];
  dataUpdate: Date;
  dataLastActivated: Date | null;
}

export type AreaCreate = Omit<Area, "id">;
export type CollectionPointCreate = Omit<CollectionPoint, "id">;

export type AreaEdit = AreaCreate;
export type CollectionPointEdit = CollectionPointCreate;

export type EvacuationCreate = Omit<Evacuation, "id" | "status" | "canEdit" | "dataUpdate" | "dataLastActivated" | "areas" | "collectionPoints" > & {
  areas: AreaCreate[];
  collectionPoints: CollectionPointCreate[];
  isActived: boolean;
};

export type EvacuationEdit = Omit<Evacuation,"status" | "canEdit" | "dataUpdate" | "dataLastActivated" | "areas" | "collectionPoints" > & {
  areas: AreaEdit[];
  collectionPoints: CollectionPointEdit[];
  isActived: boolean;
};

export type EvacuationCancel = Omit<EvacuationEdit, "isActived">;
export type EvacuationActive =  Omit<EvacuationEdit, "isActived">;