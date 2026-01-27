import type { Coordinates, FormFieldConfig } from "@/types/all_types";

export interface EvacuationSectionConfig {
  generalInfoForm: {
    title: string;
    name: FormFieldConfig<string>;
    reason: FormFieldConfig<string>;
    description: FormFieldConfig<string>;
    activateImmediately: FormFieldConfig<boolean> ;
  };
  areaForm: {
    title: string;
    coordinates: FormFieldConfig<Coordinates>;
    radius: FormFieldConfig<number>;
  };
  collectionPointsForm: {
    title: string;
    point:{
      titlePoint: string;
      name: FormFieldConfig<string>;
      description: FormFieldConfig<string>;
      coordinates: FormFieldConfig<Coordinates>;
    }
    addButton: {
      label:string
    }
  };
  assistantsForm: {
    title: string;
    assistant:{
      isActive: FormFieldConfig<boolean>;
    }
  };
  
}

