import { TripInformation } from "./components/TripInformation/TripInformation";

import type { JSX } from "react";
import type { TripsSectionProps } from "./TripsSection.types";





export const TripsSection = ({ infoText, trips, onDelete, onEdit, onShowDetails, onCancel}: TripsSectionProps): JSX.Element => {
  return (
    <section className="w-full flex-1 flex flex-col overflow-hidden">
      <div className="h-full px-10 pb-10 flex flex-col gap-6 overflow-y-auto">
        {trips.map((trip) => (
          <TripInformation
            key={trip.id}
            infoText={infoText}
            status={trip.status}
            startDate= {trip.startDate}
            endDate= {trip.endDate}
            numberOfStages={trip.numberOfStages}
            onDelete={() => onDelete(trip.id)}
            onEdit={() => onEdit(trip.id)}
            onShowDetails={() =>onShowDetails(trip.id)}
            onCancel={() => onCancel(trip.id)}
          />
        ))}
      </div>
    </section>
  );
};
