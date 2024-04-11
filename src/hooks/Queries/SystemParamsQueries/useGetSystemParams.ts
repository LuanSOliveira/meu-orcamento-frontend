import { ISystemParams } from '@/app/(Pages)/parametros-do-sistema/types';
import { ApiFactory } from '@/service/api';
import { SearchQueryParams } from '@/shared/types';
import { createSearchParams } from '@/util';
import { useQuery } from 'react-query';

export const useGetSystemParams = (
  queryParams: SearchQueryParams,
  enabled: boolean = true,
) => {
  const Params = createSearchParams(queryParams);
  const api = ApiFactory();

  return useQuery<ISystemParams[]>({
    queryKey: ['system-params-list'],
    queryFn: () => {
      return api
        .get<ISystemParams[]>(`system-params${Params}`)
        .then((response) => response.data);
    },
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    enabled,
    onSuccess: () => {
      console.log('ok');
    },
    onError: (err) => {
      console.log(err);
    },
  });
};
