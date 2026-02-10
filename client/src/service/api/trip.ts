import { httpGet, httpPost, httpPut, httpDelete } from "../http/methods";
import type { TravelCreate, TravelUpdate, TravelResponse } from "../../types/api/travel";

export async function createTravel(payload: TravelCreate): Promise<TravelResponse> {
	return httpPost<TravelResponse>("/travels/", payload);
}

export async function listTravels(skip = 0, limit = 100): Promise<TravelResponse[]> {
	const qs = new URLSearchParams({ skip: String(skip), limit: String(limit) }).toString();
	return httpGet<TravelResponse[]>(`/travels/?${qs}`);
}

export async function getTravel(travelId: number): Promise<TravelResponse> {
	return httpGet<TravelResponse>(`/travels/${travelId}`);
}

export async function updateTravel(travelId: number, payload: TravelUpdate): Promise<TravelResponse> {
	return httpPut<TravelResponse>(`/travels/${travelId}`, payload);
}

export async function deleteTravel(travelId: number): Promise<void> {
	await httpDelete<void>(`/travels/${travelId}`);
}

