import type {
  Evacuation,
  EvacuationCreate,
  CollectionPoint,
  EvacuationStatus,
  Area,
  Assistant,
  EvacuationEdit,
  AreaCreate,
  AreaEdit,
  CollectionPointCreate,
  CollectionPointEdit,
  EvacuationCancel,
  EvacuationActive,
} from "../../types/domain/evacuation";
import type {
  EvacuationCreate as ApiEvacuationCreate,
  EvacuationUpdate,
  EvacuationResponse,
  AssemblyPointResponse,
  EvacuationAreaResponse,
  EvacuationAssistantResponse,
  EvacuationAreaCreateNested,
  AssemblyPointCreateNested,
} from "../../types/api/evacuation";
import type {
  AreaFormValues,
  AssistantFormValues,
  EvacuationFormValues,
  PointFormValues,
} from "@/types/forms/evacuation";


export function mapEvacuationStatusFromApiToDomain(active: boolean): EvacuationStatus {
  return active ? "ACTIVE" : "CANCELLED";
}

export function mapEvacuationAreaResponseToDomain(area: EvacuationAreaResponse): Area {
  return {
    id: area.id,
    coordinates: {
      latitude: area.location.latitude,
      longitude: area.location.longitude,
    },
    radius: area.radius,
  };
}

export function mapAssemblyPointResponseToDomain(
  point: AssemblyPointResponse,
): CollectionPoint {
  return {
    id: point.id,
    name: point.name,
    description: point.description ?? "",
    coordinates: {
      latitude: point.location.latitude,
      longitude: point.location.longitude,
    },
  };
}

export function mapEvacuationAssistantResponseToDomain(
  assistant: EvacuationAssistantResponse,
): Assistant {
  return {
    id: assistant.id,
    name: `${assistant.first_name} ${assistant.last_name}`,
    workingHours: assistant.working_hours,
    phone: assistant.phone_number,
    email: assistant.email,
  };
}

export function mapEvacuationResponseToDomain(resp: EvacuationResponse): Evacuation {
  return {
    id: resp.id,
    status: mapEvacuationStatusFromApiToDomain(resp.active),
    name: resp.name,
    reason: resp.reason,
    description: resp.description,
    canEdit: resp.can_edit,
    areas: resp.areas.map(mapEvacuationAreaResponseToDomain),
    collectionPoints: resp.assembly_points.map(
      mapAssemblyPointResponseToDomain,
    ),
    assistants: resp.assistants.map(mapEvacuationAssistantResponseToDomain),
    dataUpdate: new Date(resp.updated_at),
    dataLastActivated: resp.last_active_at
      ? new Date(resp.last_active_at)
      : null,
  };
}

export function mapEvacuationToForm(evacuation: Evacuation): EvacuationFormValues {
  return {
    id: evacuation.id,
    generalInfoForm: {
      name: evacuation.name,
      reason: evacuation.reason,
      description: evacuation.description,
      activateImmediately: false,
    },
    areasForm: {
      areas: evacuation.areas,
    },
    colectionPointsForm: {
      points: evacuation.collectionPoints,
    },
    assistantsForm: {
      assistants: evacuation.assistants.map((assistant) => ({
        ...assistant,
        isActive: false,
      })),
    },
  };
}
export function mapAreaFormValuesToDomain(areaForm: AreaFormValues): AreaCreate | AreaEdit {
  if (
    areaForm.coordinates.latitude == null ||
    areaForm.coordinates.longitude == null ||
    areaForm.radius == null
  ) {
    throw new Error("StageFormValues contains null/undefined fields");
  }
  return {
    radius: areaForm.radius,
    coordinates: {
      latitude: areaForm.coordinates.latitude,
      longitude: areaForm.coordinates.longitude,
    },
  };
}

export function mapAssistantFormValuesToDomain(assistantForm: AssistantFormValues):  Assistant{
  return {
    id: assistantForm.id,
    name: assistantForm.name,
    email: assistantForm.email,
    phone: assistantForm.phone,
    workingHours: assistantForm.workingHours,
  };
}

export function mapPointFormValuesToDomain(pointForm: PointFormValues): CollectionPointCreate | CollectionPointEdit {
  if ( pointForm.name == null ||
    pointForm.description == null ||
    pointForm.coordinates.latitude == null ||
    pointForm.coordinates.longitude == null) {
    throw new Error("StageFormValues contains null/undefined fields");
  }
  return {
    name: pointForm.name,
    description: pointForm.description,
    coordinates: {
      latitude: pointForm.coordinates.latitude,
      longitude: pointForm.coordinates.longitude,
    },
  };
}

export function mapEvacuationFormValuesToDomainEdit(form: EvacuationFormValues): EvacuationEdit {
  if (form.id == null) {
    throw new Error("TripFormValue.id is required for editing");
  }

  if (!form.areasForm.areas || form.areasForm.areas.length === 0) {
    throw new Error("TripFormValue must contain at least one stage");
  }

  if (
    !form.colectionPointsForm.points ||
    form.colectionPointsForm.points.length === 0
  ) {
    throw new Error("TripFormValue must contain at least one stage");
  }

  if (
    form.generalInfoForm.name == null ||
    form.generalInfoForm.reason == null ||
    form.generalInfoForm.description == null
  ) {
    throw new Error("General info form contains null/undefined fields");
  }
  return {
    id: form.id,
    name: form.generalInfoForm.name,
    reason: form.generalInfoForm.reason,
    description: form.generalInfoForm.description,
    areas: form.areasForm.areas.map(mapAreaFormValuesToDomain),
    collectionPoints: form.colectionPointsForm.points.map(mapPointFormValuesToDomain),
    assistants: form.assistantsForm.assistants.filter(a => a.isActive).map(mapAssistantFormValuesToDomain),
    isActived: form.generalInfoForm.activateImmediately,
  };
}

export function mapEvacuationFormValuesToDomainCreate(form: EvacuationFormValues): EvacuationCreate {

  if (!form.areasForm.areas || form.areasForm.areas.length === 0) {
    throw new Error("TripFormValue must contain at least one stage");
  }

  if (
    !form.colectionPointsForm.points ||
    form.colectionPointsForm.points.length === 0
  ) {
    throw new Error("TripFormValue must contain at least one stage");
  }

  if (
    form.generalInfoForm.name == null ||
    form.generalInfoForm.reason == null ||
    form.generalInfoForm.description == null
  ) {
    throw new Error("General info form contains null/undefined fields");
  }
  return {
    name: form.generalInfoForm.name,
    reason: form.generalInfoForm.reason,
    description: form.generalInfoForm.description,
    areas: form.areasForm.areas.map(mapAreaFormValuesToDomain),
    collectionPoints: form.colectionPointsForm.points.map(mapPointFormValuesToDomain),
    assistants: form.assistantsForm.assistants.filter(a => a.isActive).map(mapAssistantFormValuesToDomain),
    isActived: form.generalInfoForm.activateImmediately,
  };
}

export function mapAreaToApi(area: AreaCreate | AreaEdit): EvacuationAreaCreateNested {
  return {
    latitude: area.coordinates.latitude,
    longitude: area.coordinates.longitude,
    radius: area.radius,
  };
}

export function mapCollectionPointToApi(point: CollectionPointCreate | CollectionPointEdit): AssemblyPointCreateNested {
  return {
    name: point.name,
    description: point.description,
    latitude: point.coordinates.latitude,
    longitude: point.coordinates.longitude,
  };
}

export function mapEvacuationCreateToApi(evacuation: EvacuationCreate): ApiEvacuationCreate {
  return {
    name: evacuation.name,
    reason: evacuation.reason,
    description: evacuation.description,
    active: evacuation.isActived,
    areas: evacuation.areas.map(mapAreaToApi),
    assembly_points: evacuation.collectionPoints.map(mapCollectionPointToApi),
    assistant_ids: evacuation.assistants.map((assistant) => assistant.id),
  };
}

export function mapEvacuationEditToApi(evacuation: EvacuationEdit): EvacuationUpdate {
  return {
    name: evacuation.name,
    reason: evacuation.reason,
    description: evacuation.description,
    active: evacuation.isActived,
    areas: evacuation.areas.map(mapAreaToApi),
    assembly_points: evacuation.collectionPoints.map(mapCollectionPointToApi),
    assistant_ids: evacuation.assistants.map((assistant) => assistant.id),
  };
}

export function mapEvacuationCancelToApi(trip: EvacuationCancel): EvacuationUpdate {
  return {
    name: trip.name,
    reason: trip.reason,
    description: trip.description,
    active: false, 
    areas: trip.areas.map(mapAreaToApi),
    assembly_points: trip.collectionPoints.map(mapCollectionPointToApi),
    assistant_ids: trip.assistants.map((assistant) => assistant.id),
  };  
}

export function mapEvacuationActiveToApi(trip: EvacuationActive): EvacuationUpdate {
  return {
    name: trip.name,
    reason: trip.reason,
    description: trip.description,
    active: true, 
    areas: trip.areas.map(mapAreaToApi),
    assembly_points: trip.collectionPoints.map(mapCollectionPointToApi),
    assistant_ids: trip.assistants.map((assistant) => assistant.id),
  };  
}