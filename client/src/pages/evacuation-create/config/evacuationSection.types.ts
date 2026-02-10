import type { Coordinates } from "@/types/domain/common";
import type { FormFieldConfig } from "@/types/config";

export interface EvacuationSectionConfig {
  generalInfoForm: {
    title: string;
    name: FormFieldConfig<string>;
    reason: FormFieldConfig<string>;
    description: FormFieldConfig<string>;
    activateImmediately: FormFieldConfig<boolean>;
  };
  areasForm: {
    title: string;
    area: {
      titleArea: string;
      coordinates: FormFieldConfig<Coordinates>;
      radius: FormFieldConfig<number>;
    };
    addButton: {
      label: string;
    };
  };
  collectionPointsForm: {
    title: string;
    point: {
      titlePoint: string;
      name: FormFieldConfig<string>;
      description: FormFieldConfig<string>;
      coordinates: FormFieldConfig<Coordinates>;
    };
    addButton: {
      label: string;
    };
  };
  assistantsForm: {
    title: string;
    assistant: {
      isActive: FormFieldConfig<boolean>;
    };
  };
}
