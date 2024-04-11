import { ISystemParamsDTO } from '@/app/(Pages)/parametros-do-sistema/types';
import { ApiFactory } from '@/service/api';
import { AxiosError } from 'axios';
import { useMutation } from 'react-query';

export const usePatchSystemParams = (id: string) => {
  const api = ApiFactory();
  const mutation = useMutation({
    mutationFn: (patchSystemParams: ISystemParamsDTO) => {
      return api
        .patch(`system-params/${id}`, patchSystemParams)
        .then((response) => response.data);
    },
    onSuccess: () => {
      console.log('ok');
    },
    onError: (err: AxiosError<unknown, unknown>) => {
      console.log(err);
    },
  });

  return {
    onPatchSystemParams: (patchSystemParams: ISystemParamsDTO) => {
      return mutation.mutate(patchSystemParams);
    },
    isLoading: mutation.isLoading,
  };
};
