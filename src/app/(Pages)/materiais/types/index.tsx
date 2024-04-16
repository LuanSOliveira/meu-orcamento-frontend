import { IEntity } from '@/shared/types';

export interface IOtherMaterials extends IEntity {
  name: string;
  type: string;
  imageLink: string;
  value: string;
  weight: string;
  otherInformations: string;
}

export interface IOtherMaterialsDTO {
  name: string;
  type: string;
  imageLink: string;
  value: string;
  weight: string;
  otherInformations: string;
}
