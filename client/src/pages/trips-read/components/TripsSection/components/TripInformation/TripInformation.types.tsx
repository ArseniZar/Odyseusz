import type { Trip } from "@/types/all_types";
import type { TripsSectionConfig } from "../../../../config/tripsSection.config.types";

type TripInfo = Pick<Trip, 'status' | 'numberOfStages' | 'startDate' | 'endDate'>;

export interface TripInformationProps extends TripInfo {
    infoText: TripsSectionConfig;
    onDelete?: () => void;
    onEdit?: () => void;
    onShowDetails?: () => void;
    onCancel?: () => void;
}