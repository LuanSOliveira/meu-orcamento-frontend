export type SortDirection = 'asc' | 'desc';

export interface SearchQueryParams {
  page?: number;
  perPage?: number;
  sort?: string;
  relations?: string;
  sortDir?: SortDirection;
  filter?: string;
  field?: string;
  selectFields?: string;
  title?: string;
  strongSkillTitle?: string;
  role?: string;
  sector?: string;
  strongSkill?: string;
}
