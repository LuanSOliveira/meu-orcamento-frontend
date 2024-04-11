import { IEntity } from '@/shared/types';

export interface ISystemParams extends IEntity {
  salaryPerMonth: number;
  workingHoursPerMonth: number;
  profit: number;
}

export interface ISystemParamsDTO {
  salaryPerMonth: number;
  workingHoursPerMonth: number;
  profit: number;
}
