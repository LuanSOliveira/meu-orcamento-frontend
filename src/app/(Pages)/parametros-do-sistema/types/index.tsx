import { IEntity } from '@/shared/types';

export interface ISystemParams extends IEntity {
  salaryPerMonth: string;
  workingHoursPerMonth: string;
  profit: string;
}

export interface ISystemParamsDTO {
  salaryPerMonth: string;
  workingHoursPerMonth: string;
  profit: string;
}
