import type { Trip } from "@/types/domain/trip";
import type { TripsSectionConfig } from "../../../../config/tripsSection.config.types";

type TripInfo = Pick<Trip, 'status' | 'startDate' | 'endDate' | 'stages'>;

export interface TripInformationProps extends TripInfo {
    infoText: TripsSectionConfig;
    numberOfStages: number;
    onDelete?: () => void;
    onEdit?: () => void;
    onCancel?: () => void;
}