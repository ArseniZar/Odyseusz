import type { Evacuation } from "@/types/all_types";
import type { EvacuationsSectionConfig } from "../../../../config/evacuationsSection.config.types";

type EvacuationForInfo = Pick<Evacuation,  'status' | 'name' | 'reason' | 'description' | 'area' | 'collectionPoints' | 'assistants'>; ;

export interface EvacuationInformationProps extends EvacuationForInfo {
    infoText: EvacuationsSectionConfig;
    onActive: () => void;
    onCancel: () => void;
}