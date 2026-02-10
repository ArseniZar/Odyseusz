// travelMapper.ts
import type { Trip, Stage, TripStatus, TripCreate, TripEdit, TripCancel, StageEdit, StageCreate } from "../../types/domain/trip";
import type {TravelCreate, TravelResponse,TravelStageCreateNested,TravelStageResponse,TravelStatus, TravelUpdate,} from "../../types/api/travel";
import type { TripFormValue, StageFormValues } from "@/types/forms/trip";


/** Map API travel status → domain TripStatus */
export function mapTravelStatusFromApiToDomain(status: TravelStatus): TripStatus {
  switch (status) {
    case "planned":
      return "NOT_STARTED";
    case "ongoing":
      return "ACTIVE";
    case "completed":
      return "FINISHED";
    case "cancelled":
    default:
      return "CANCELLED";
  }
}

/** Map single TravelStageResponse → Stage (domain) */
export function mapTravelStageResponseToDomain(stage: TravelStageResponse): Stage {
  return {
    id: stage.id,
    coordinates: {
      latitude: stage.location.latitude,
      longitude: stage.location.longitude,
    },
    dateRange: {
      startDate: new Date(stage.start_date),
      endDate: new Date(stage.end_date),
    },
    numberOfPeople: stage.people_count,
  };
}

/** Map full TravelResponse → Trip (domain) */
export function mapTravelResponseToDomain(resp: TravelResponse): Trip {
  console.log("Mapping TravelResponse to Trip domain model: ", resp);
  return {
    id: resp.id,
    status: mapTravelStatusFromApiToDomain(resp.status),
    stages: resp.stages.map(mapTravelStageResponseToDomain),
    dataUpdate: new Date(resp.updated_at),
    startDate: new Date(resp.started_at),
    endDate: new Date(resp.finished_at),
  };
}




export function mapStageFormValuesToDomain(stageForm: StageFormValues): StageEdit | StageCreate {
  if (
    stageForm.numberOfPeople == null ||
    stageForm.coordinates.latitude == null ||
    stageForm.coordinates.longitude == null ||
    !stageForm.dateRange.startDate ||
    !stageForm.dateRange.endDate
  ) {
    throw new Error("StageFormValues contains null/undefined fields");
  }

  return {
    numberOfPeople: stageForm.numberOfPeople,
    coordinates: {
      latitude: stageForm.coordinates.latitude,
      longitude: stageForm.coordinates.longitude,
    },
    dateRange: {
      startDate: stageForm.dateRange.startDate,
      endDate: stageForm.dateRange.endDate,
    },
  };
}

export function mapTripFormValueToDomainCreate(form: TripFormValue): TripCreate {
  if (!form.stages || form.stages.length === 0) {
    throw new Error("TripFormValue must contain at least one stage");
  }

  return {
    stages: form.stages.map(mapStageFormValuesToDomain),
  };
}

/** TripFormValue → TripEdit */
export function mapTripFormValueToDomainEdit(form: TripFormValue): TripEdit {
  if (form.id == null) {
    throw new Error("TripFormValue.id is required for editing");
  }

  if (!form.stages || form.stages.length === 0) {
    throw new Error("TripFormValue must contain at least one stage");
  }

  return {
    id: form.id,
    stages: form.stages.map(mapStageFormValuesToDomain),
  };
}


export function mapStageToApi(stage: StageCreate | StageEdit): TravelStageCreateNested {
  return {
    latitude: stage.coordinates.latitude,
    longitude: stage.coordinates.longitude,
    start_date: stage.dateRange.startDate.toLocaleDateString("sv-SE"),
    end_date: stage.dateRange.endDate.toLocaleDateString("sv-SE"),
    people_count: stage.numberOfPeople,
  };
}

export function mapTripCreateToApi(trip: TripCreate):TravelCreate {
  return {
    stages: trip.stages.map(mapStageToApi),
  };
}

export function mapTripEditToApi(trip: TripEdit): TravelUpdate {
  return {
    stages: trip.stages.map(mapStageToApi),
  };
}

export function mapTripToCancelToApi(trip: TripCancel): TravelUpdate {
  return {
    cancelled: true,
    stages: trip.stages.map(mapStageToApi),
  };
}