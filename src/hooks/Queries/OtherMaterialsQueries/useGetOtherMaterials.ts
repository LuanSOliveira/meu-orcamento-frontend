import { IOtherMaterials } from '@/app/(Pages)/materiais/types';
import { ApiFactory } from '@/service/api';
import { IListsInformations, SearchQueryParams } from '@/shared/types';
import { createSearchParams } from '@/util';
import { useQuery } from 'react-query';

interface GetOtherMaterialsParams {
  items: IOtherMaterials[];
  meta: IListsInformations;
}

export const useGetOtherMaterials = (
  queryParams: SearchQueryParams,
  enabled: boolean = true,
) => {
  const Params = createSearchParams(queryParams);
  const api = ApiFactory();

  return useQuery<GetOtherMaterialsParams>({
    queryKey: ['other-material-list'],
    queryFn: () => {
      return api
        .get<GetOtherMaterialsParams>(`other-material${Params}`)
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
