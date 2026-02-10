import type { Trip } from "@/types/domain/trip";
import type { TripsSectionConfig } from "../../config/tripsSection.config.types";

export interface TripsSectionProps{
  infoText: TripsSectionConfig
  trips: Trip[];
  onDelete: (tripId: number) => void;
  onEdit: (tripId: number) => void;
  onCancel: (tripId: number) => void;
}
