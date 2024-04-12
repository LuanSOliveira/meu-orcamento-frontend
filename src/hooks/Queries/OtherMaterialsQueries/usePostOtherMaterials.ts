import { IOtherMaterialsDTO } from '@/app/(Pages)/materiais/types';
import { ApiFactory } from '@/service/api';
import { AxiosError } from 'axios';
import { useMutation } from 'react-query';

export const usePostOtherMaterials = () => {
  const api = ApiFactory();
  const mutation = useMutation({
    mutationFn: (postOtherMaterials: IOtherMaterialsDTO) => {
      return api
        .post('other-material', postOtherMaterials)
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
    onPostOtherMaterials: (postOtherMaterials: IOtherMaterialsDTO) => {
      return mutation.mutate(postOtherMaterials);
    },
    isLoading: mutation.isLoading,
  };
};
