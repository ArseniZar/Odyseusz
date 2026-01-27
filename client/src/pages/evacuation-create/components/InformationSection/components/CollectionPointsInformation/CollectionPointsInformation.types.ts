import type { InformationSectionConfig } from "../../../../config/informationSection.config.types";

export interface CollectionPointsInformationProps {
  collectionPointsNumber: number;
  infoText: InformationSectionConfig["collectionPoints"];
  name: string | null;
  description: string | null;
}
