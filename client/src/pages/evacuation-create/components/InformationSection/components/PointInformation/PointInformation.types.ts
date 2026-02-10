import type { PointFormValues } from "@/types/forms/evacuation";
import type { InformationSectionConfig } from "../../../../config/informationSection.config.types";

export interface PointInformationProps {
  pointNumber: number;
  infoText: InformationSectionConfig["point"];
  name: PointFormValues["name"];
  description: PointFormValues["description"];
}
