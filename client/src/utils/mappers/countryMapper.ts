import type { ProfileCountry, Consulate, DangerLevel, ProfileCountryEdit } from "../../types/domain/profileCountry";
import type {
  CountryProfileResponse,
  ConsulateResponse,
  CountryProfileUpdate,
  DangerLevelApi,
} from "../../types/api/country";
import type { ConsulateFormValues, ProfileCountryFormValues } from "@/types/forms";

function mapDangerLevelFromApiToDomain(level: DangerLevelApi): DangerLevel  {
  switch (level) {
    case "low":
      return "LOW";
    case "moderate":
      return "MEDIUM";
    case "high":
      return "HIGH";
    case "severe":
      return "EXTREME";
  }
}

export function mapConsulateResponseToDomain(c: ConsulateResponse): Consulate {
  return {
    id: c.id,
    address: c.address,
    phone: c.phone_number,
    email: c.email,
    website: c.website,
    dataUpdate: new Date(c.updated_at),
  };
}

export function mapCountryProfileResponseToDomain(profile: CountryProfileResponse): ProfileCountry {
  return {
    id: profile.id,
    name: profile.name,
    canEdit: profile.can_edit,
    countryCode: profile.country_code,
    description: profile.description,
    dangerLevel: mapDangerLevelFromApiToDomain(profile.danger_level),
    consulates: profile.consulates.map(mapConsulateResponseToDomain),
    dataUpdate: new Date(profile.updated_at),
  };
}


export function mapProfileCountryToForm(country: ProfileCountry): ProfileCountryFormValues {
  return {
    id: country.id,
    generalInfoForm: {
      name: country.name,
      description: country.description,
      countryCode: country.countryCode,
      dateUpdate: country.dataUpdate,
      dangerLevel: country.dangerLevel,
    },
    consulatesForm: {
      consulates: country.consulates.map((consulate) => ({
        ...consulate,
        isActive: false,
      })),
    },
  };
}
export function mapAssistantFormValuesToDomain(consulateForm: ConsulateFormValues):  Consulate{
  return {
    id: consulateForm.id,
    email: consulateForm.email,
    phone: consulateForm.phone,
    address: consulateForm.address,
    website: consulateForm.website,
    dataUpdate: consulateForm.dataUpdate,
  };
}

export function mapProfileCountryFormValuesToDomainEdit(form: ProfileCountryFormValues): ProfileCountryEdit {
  if (form.id == null) {
    throw new Error("TripFormValue.id is required for editing");
  }
  if (form.generalInfoForm.description == null) {
    throw new Error("StageFormValues contains null/undefined fields");
  }

  return {
    id: form.id,
    description: form.generalInfoForm.description,
    consulates: form.consulatesForm.consulates.filter(a => a.isActive).map(mapAssistantFormValuesToDomain),
  };
}


export function mapProfileCountryEditToApi(profile: ProfileCountryEdit): CountryProfileUpdate {
  return {
    description: profile.description,
    conulateIds: profile.consulates.map(c => c.id),
  };
} 