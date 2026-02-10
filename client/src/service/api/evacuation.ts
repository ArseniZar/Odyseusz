import { httpGet, httpPost, httpPut, httpDelete } from "../http/methods";
import type {EvacuationCreate,EvacuationUpdate,EvacuationAssistantResponse, EvacuationResponse} from "../../types/api/evacuation";

export async function createEvacuation(payload: EvacuationCreate): Promise<EvacuationResponse> {
  return httpPost<EvacuationResponse>("/evacuations/", payload);
}

export async function listEvacuations(skip:number = 0, limit = 100): Promise<EvacuationResponse[]> {
  const qs = new URLSearchParams({skip: String(skip), limit: String(limit) }).toString();
  return httpGet<EvacuationResponse[]>(`/evacuations/?${qs}`);
}

export async function getEvacuation(evacuationId: number): Promise<EvacuationResponse> {
  return httpGet<EvacuationResponse>(`/evacuations/${evacuationId}`);
}

export async function updateEvacuation(
  evacuationId: number,
  payload: EvacuationUpdate,
): Promise<EvacuationResponse> {
  return httpPut<EvacuationResponse>(`/evacuations/${evacuationId}`, payload);
}

export async function deleteEvacuation(evacuationId: number): Promise<void> {
  await httpDelete<void>(`/evacuations/${evacuationId}`);
}

export async function listEvacuationAssistants(
  skip = 0,
  limit = 1000,
): Promise<EvacuationAssistantResponse[]> {
  const qs = new URLSearchParams({ skip: String(skip), limit: String(limit) }).toString();
  return httpGet<EvacuationAssistantResponse[]>(`/evacuations/assistants?${qs}`);
}
