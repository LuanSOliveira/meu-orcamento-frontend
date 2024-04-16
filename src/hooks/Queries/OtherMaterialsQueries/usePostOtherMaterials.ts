import { IOtherMaterialsDTO } from '@/app/(Pages)/materiais/types';
import { useToastify } from '@/hooks/Toastify';
import { ApiFactory } from '@/service/api';
import { BUDGET_ROUTS } from '@/shared/routes/routes';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useMutation } from 'react-query';

export const usePostOtherMaterials = () => {
  const api = ApiFactory();
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: (postOtherMaterials: IOtherMaterialsDTO) => {
      return api
        .post('other-material', postOtherMaterials)
        .then((response) => response.data);
    },
    onSuccess: () => {
      useToastify.success('Material cadastrado com sucesso.');
      router.push(BUDGET_ROUTS.materials);
    },
    onError: (err: AxiosError<unknown, unknown>) => {
      useToastify.error('Ocorreu um erro.');
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
