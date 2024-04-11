import { ISystemParamsDTO } from '@/app/(Pages)/parametros-do-sistema/types';
import { ApiFactory } from '@/service/api';
import { AxiosError } from 'axios';
import { useMutation } from 'react-query';

export const usePostSystemParams = () => {
  const api = ApiFactory();
  const mutation = useMutation({
    mutationFn: (postSystemParams: ISystemParamsDTO) => {
      return api
        .post('system-params', postSystemParams)
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
    onPostSystemParams: (postSystemParams: ISystemParamsDTO) => {
      return mutation.mutate(postSystemParams);
    },
    isLoading: mutation.isLoading,
  };
};
