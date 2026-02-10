export type AppRoutes =
  | "TRIP_CREATE"
  | "TRIPS_READ"
  | "TRIP_EDIT"
  | "EVACUATION_CREATE"
  | "EVACUATIONS_READ"
  | "EVACUATION_EDIT" 
  | "PROFILE_COUNTRY_READ"
  | "PROFILE_COUNTRY_EDIT"
  | "AUTH_LOGIN"
  | "NOT_FOUND"
  | "HOME";

export const routesConfig: Record<AppRoutes, {path:string, label:string}> = {
  TRIP_CREATE: {path:"/trips/create", label:"Create Trip"},
  TRIPS_READ: {path:"/trips/read", label:"Read Trips"},
  TRIP_EDIT: {path:"/trips/edit/:tripId", label:"Edit Trip"},

  EVACUATION_CREATE: {path:"/evacuations/create", label:"Create Evacuation"},
  EVACUATIONS_READ: {path:"/evacuations/read", label:"Read Evacuations"},
  EVACUATION_EDIT: {path:"/evacuations/edit/:evacuationId", label:"Edit Evacuation"},

  PROFILE_COUNTRY_READ: {path:"/country/profile/read", label:"Read Profile Country"},
  PROFILE_COUNTRY_EDIT: {path:"/country/profile/edit/:profileId", label:"Edit Profile Country"},

  AUTH_LOGIN: {path:"/auth/login", label:"Login"},
  NOT_FOUND: {path:"*", label:"Not Found"},
  HOME: {path:"/", label:"Home"},
};
