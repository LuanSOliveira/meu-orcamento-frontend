export type SortDirection = 'asc' | 'desc';

export interface SearchQueryParams {
  page?: number;
  perPage?: number;
  limit?: number;
  sort?: string;
  relations?: string;
  sortDir?: SortDirection;
  filter?: string;
  filterBy?: string;
  field?: string;
  selectFields?: string;
  title?: string;
  strongSkillTitle?: string;
  role?: string;
  sector?: string;
  strongSkill?: string;
}
