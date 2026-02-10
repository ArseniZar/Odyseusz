import { httpGet, httpPut } from "../http/methods";
import type {CountryProfileResponse,CountryProfileUpdate,ConsulateResponse} from "../../types/api/country";

export async function listCountryProfiles(skip = 0, limit = 100): Promise<CountryProfileResponse[]> {
const qs = new URLSearchParams({skip: String(skip),limit: String(limit)}).toString();

  return httpGet<CountryProfileResponse[]>(`/countries/?${qs}`);
}

export async function getCountryProfile(countryId: number): Promise<CountryProfileResponse> {
  return httpGet<CountryProfileResponse>(`/countries/${countryId}`);
}

export async function updateCountryProfile(countryId: number,payload: CountryProfileUpdate): Promise<CountryProfileResponse> {
  return httpPut<CountryProfileResponse>(`/countries/${countryId}`, payload);
}

export async function listConsulates(skip = 0,limit = 1000): Promise<ConsulateResponse[]> {
  const qs = new URLSearchParams({
    skip: String(skip),
    limit: String(limit),
  }).toString();

  return httpGet<ConsulateResponse[]>(`/countries/consulates?${qs}`);
}
