'use client';

import { useGetOtherMaterials } from '@/hooks/Queries';
import CustomButton from '@/shared/components/CustomButton';
import { BUDGET_ROUTS } from '@/shared/routes/routes';
import { useRouter } from 'next/navigation';
import MaterialsItem from '../MaterialsItem';
import FilterLists from '@/shared/components/FilterLists';

const MaterialsList = () => {
  const router = useRouter();
  const { data: otherMaterialList } = useGetOtherMaterials({});
  const filterOptions = [{ value: 'name', label: 'Nome' }];

  return (
    <div>
      <div className="flex justify-between">
        <div className="w-1/2">
          <FilterLists filterOptions={filterOptions} />
        </div>
        <CustomButton
          buttonTheme="primary"
          type="navigate"
          label="+ Novo Material"
          onClickButton={() => router.push(BUDGET_ROUTS.createMaterials)}
        />
      </div>
      {otherMaterialList ? (
        <div className="my-6 flex flex-col gap-4">
          {otherMaterialList.items?.map((material) => (
            <MaterialsItem key={material.id} material={material} />
          ))}
        </div>
      ) : (
        <div className="w-full mt-6 p-4 flex justify-center text-gray-400 text-xl font-bold">
          <p>Nenhum Item Encontrado</p>
        </div>
      )}
    </div>
  );
};

export default MaterialsList;
