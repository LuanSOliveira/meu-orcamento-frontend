import { IOtherMaterials } from '@/app/(Pages)/materiais/types';
import { useToastify } from '@/hooks/Toastify';
import { ApiFactory } from '@/service/api';
import { IListsInformations, SearchQueryParams } from '@/shared/types';
import { changeProgressBarState } from '@/store/reducers/ProgressBarSlice';
import { createSearchParams } from '@/util';
import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';

export interface GetOtherMaterialsParams {
  items: IOtherMaterials[];
  meta: IListsInformations;
}

export const useGetOtherMaterials = (
  queryParams: SearchQueryParams,
  enabled: boolean = true,
) => {
  const Params = createSearchParams(queryParams);
  const api = ApiFactory();
  const dispatch = useDispatch();

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
      dispatch(changeProgressBarState({ value: false }));
      console.log('ok');
    },
    onError: (err) => {
      dispatch(changeProgressBarState({ value: false }));
      useToastify.error('Ocorreu um erro.');
      console.log(err);
    },
  });
};
