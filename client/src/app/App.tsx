import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routesConfig } from "@/types/rotes";
import { TripCreatePage } from "@/pages/trip-create";
import { TripsReadPage } from "@/pages/trips-read";  
import { EvacuationCreatePage } from "@/pages/evacuation-create";
import { EvacuationsReadPage } from "@/pages/evacuations-read";
import { ProfileCountryEditPage } from "@/pages/profile-country-edit";
import { ProfileCountryReadPage } from "@/pages/profile-country-read";

// import { RegisterPage } from "../pages/register/ui/RegisterPage";
// import AllTripsPage from "../pages/all-trips/ui/AllTripPage";
// import TripsEditPage from "../pages/trip-edit/ui/TripEditPage";
// import AllProfileCountryPage from "../pages/all-profile-country/ui/AllProfileCountryPage";
// import EvacuationCreatePage from "../pages/evacuation-create/ui/EvacuationCreatePage";
// import EvacuationEditPage from "../pages/evacuation-edit/ui/EvacuationEditPage";
// import EvacuationAllPage from "../pages/evacuation-all/ui/EvacuatonAllPage";
// import ProfileCountryEditPage from "../pages/profile-country/ui/ProfileCountryEditPage";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={routesConfig.TRIP_CREATE.path} element={<TripCreatePage/>} />
          <Route path={routesConfig.TRIPS_READ.path}  element={<TripsReadPage/>}/>
          <Route path={routesConfig.EVACUATION_CREATE.path} element={<EvacuationCreatePage/>}/>
          <Route path={routesConfig.EVACUATIONS_READ.path} element={<EvacuationsReadPage/>}/>
          <Route path={routesConfig.PROFILE_COUNTRY_EDIT.path} element={<ProfileCountryEditPage/>}/>
          <Route path={routesConfig.PROFILE_COUNTRY_READ.path} element={<ProfileCountryReadPage/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}



