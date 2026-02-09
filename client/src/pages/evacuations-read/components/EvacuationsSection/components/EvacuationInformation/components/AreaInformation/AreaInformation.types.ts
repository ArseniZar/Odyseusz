import type { Evacuation } from "@/types/domain/evacuation";
import type { EvacuationsSectionConfig } from "../../../../../../config/evacuationsSection.config.types";

type EvacuationInfo = Pick<Evacuation["areas"][number], 'radius' | 'coordinates'>;

export interface AreaInformationProps extends EvacuationInfo {
  areaNumber: number;
  infoText: EvacuationsSectionConfig["area"];
}
