export type AppRoutes =
  | "TRIP_CREATE"
  | "TRIPS_READ"
  | "TRIP_EDIT"
  | "EVACUATION_CREATE";

export const routesConfig: Record<AppRoutes, {path:string, label:string}> = {
  TRIP_CREATE: {path:"/trips/create", label:"Create Trip"},
  TRIPS_READ: {path:"/trips/read", label:"Read Trips"},
  TRIP_EDIT: {path:"/trips/edit/:tripId", label:"Edit Trip"},
  EVACUATION_CREATE: {path:"/evacuations/create", label:"Create Evacuation"},
};
