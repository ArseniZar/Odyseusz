import type { Trip } from "@/types/all_types";
import type { TripsSectionConfig } from "../../config/tripsSection.config.types";

export interface TripsSectionProps{
  infoText: TripsSectionConfig
  trips: Trip[];
  onDelete: (tripId: number) => void;
  onEdit: (tripId: number) => void;
  onShowDetails: (tripId: number) => void;
  onCancel: (tripId: number) => void;
}
