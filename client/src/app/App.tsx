import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TripCreatePage } from "@/pages/trip-create";
import { TripsReadPage } from "@/pages/trips-read";  
import { EvacuationCreatePage } from "@/pages/evacuation-create";
import { EvacuationsReadPage } from "@/pages/evacuations-read";

import { routesConfig } from "@/types/rotes";
import ProfileCountryEditPage from "@/pages/profile-country/ui/ProfileCountryEditPage";
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
          {/* <Route path={`${routesConfig.routes.TRIPS}`} element={<TripsPage/>} /> */}
          <Route path={routesConfig.TRIP_CREATE.path} element={<TripCreatePage/>} />
          <Route path={routesConfig.TRIPS_READ.path}  element={<TripsReadPage/>}/>
          <Route path={routesConfig.EVACUATION_CREATE.path} element={<EvacuationCreatePage/>}/>
          <Route path={routesConfig.EVACUATIONS_READ.path} element={<EvacuationsReadPage/>}/>
          {/* <Route path= "/register/:type" element={<RegisterPage/>}/> 
          <Route path="/traveler/read_all_trip" element={<AllTripsPage/>}/>
          <Route path="/traveler/edit_trip/:type" element={<TripsEditPage/>}/>

          <Route path="/editor/all_profile" element={<AllProfileCountryPage/>}/>
          <Route path="/editor/edit_profile/:type" element={<ProfileCountryEditPage/>}/>

          <Route path="/kordinator/add_evacuation" element={<EvacuationCreatePage/>}/>
          <Route path="/kordinator/edit_evacuation/:type" element={<EvacuationEditPage/>}/>
          <Route path="/kordinator/all_evacuation" element={<EvacuationAllPage/>}/> */}
           <Route path="/editor/edit_profile/:type" element={<ProfileCountryEditPage/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}



