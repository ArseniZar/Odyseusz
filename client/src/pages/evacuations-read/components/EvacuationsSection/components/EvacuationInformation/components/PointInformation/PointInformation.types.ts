import type { Evacuation } from "@/types/all_types";
import type { EvacuationsSectionConfig } from "../../../../../../config/evacuationsSection.config.types";

type EvacuationInfo = Pick<Evacuation["collectionPoints"][number], 'name' | 'description' | 'coordinates'>;

export interface PointInformationProps extends EvacuationInfo {
  pointNumber: number;
  infoText: EvacuationsSectionConfig["point"];
}
