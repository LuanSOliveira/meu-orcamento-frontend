import { AxiosError } from 'axios';
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  useMutation,
} from 'react-query';
import { ApiFactory } from '@/service/api';
import { useAppDispatch } from '@/store/hooks';
import { GetOtherMaterialsParams } from './useGetOtherMaterials';
import { changeProgressBarState } from '@/store/reducers/ProgressBarSlice';
import { useToastify } from '@/hooks/Toastify';

export const useDeleteOtherMaterials = (
  id: string,
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined,
  ) => Promise<QueryObserverResult<GetOtherMaterialsParams, unknown>>,
) => {
  const api = ApiFactory();
  const dispatch = useAppDispatch();
  const mutation = useMutation({
    mutationFn: () => {
      return api
        .delete(`other-material/${id}`)
        .then((response) => response.data);
    },
    onSuccess: () => {
      refetch();
      useToastify.success('Material deletado com sucesso.');
    },
    onError: (err: AxiosError<unknown, unknown>) => {
      dispatch(changeProgressBarState({ value: false }));
      useToastify.error('Ocorreu um erro.');
      console.log(err);
    },
  });

  return {
    onDeleteOtherMaterial: () => {
      return mutation.mutate();
    },
    isLoading: mutation.isLoading,
  };
};
