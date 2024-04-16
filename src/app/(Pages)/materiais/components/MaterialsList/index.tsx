'use client';

import { useGetOtherMaterials } from '@/hooks/Queries';
import CustomButton from '@/shared/components/CustomButton';
import { BUDGET_ROUTS } from '@/shared/routes/routes';
import { useRouter } from 'next/navigation';
import MaterialsItem from '../MaterialsItem';
import FilterLists from '@/shared/components/FilterLists';
import { useEffect, useState } from 'react';
import ListPaginator from '@/shared/components/ListPaginator';
import { listLimit } from '@/shared/constants';
import { useDispatch } from 'react-redux';
import { changeProgressBarState } from '@/store/reducers/ProgressBarSlice';
import { useAppSelector } from '@/store/hooks';
import { CircularProgress } from '@mui/material';

const MaterialsList = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const spiner = useAppSelector((state) => state.progressBar);
  const filterOptions = [
    { value: 'name', label: 'Nome' },
    { value: 'type', label: 'Tipo' },
  ];
  const searchSelectOptions = [
    { value: 'weight', label: 'Peso' },
    { value: 'unit', label: 'Unidade' },
  ];
  const [filter, setFilter] = useState<string>('');
  const [filterType, setFilterType] = useState<string>('name');
  const [selectedPage, setSelectedPage] = useState<number>(1);
  const { data: otherMaterialList, refetch } = useGetOtherMaterials({
    filter: filter,
    filterBy: filterType,
    page: selectedPage,
    limit: listLimit,
  });

  useEffect(() => {
    if (filter.length >= 3) {
      dispatch(changeProgressBarState({ value: true }));
      setSelectedPage(1);
      setTimeout(() => refetch(), 100);
    } else if (filter.length === 0) {
      setSelectedPage(1);
      setTimeout(() => refetch(), 100);
    }
  }, [filter]);

  useEffect(() => {
    if (filter.length > 0) {
      dispatch(changeProgressBarState({ value: true }));
      setSelectedPage(1);
      setFilter('');
    }
  }, [filterType]);

  useEffect(() => {
    dispatch(changeProgressBarState({ value: true }));
    refetch();
  }, [selectedPage]);

  return (
    <div>
      <div className="flex justify-between">
        <div className="w-1/2">
          <FilterLists
            filterOptions={filterOptions}
            searchSelectOptions={searchSelectOptions}
            setFilterValue={setFilter}
            setFilterType={setFilterType}
            searchText={filterType === 'name' ? true : false}
          />
        </div>
        <CustomButton
          buttonTheme="primary"
          type="navigate"
          label="+ Novo Material"
          onClickButton={() => router.push(BUDGET_ROUTS.createMaterials)}
        />
      </div>
      {spiner.value ? (
        <div className="w-full mt-6 p-4 flex justify-center text-gray-400 text-xl font-bold">
          <CircularProgress color="inherit" />
        </div>
      ) : (
        <>
          {otherMaterialList ? (
            <div className="my-6 flex flex-col gap-4">
              {otherMaterialList.items?.map((material) => (
                <MaterialsItem
                  key={material.id}
                  material={material}
                  refetch={refetch}
                />
              ))}
            </div>
          ) : (
            <div className="w-full mt-6 p-4 flex justify-center text-gray-400 text-xl font-bold">
              <p>Nenhum Item Encontrado</p>
            </div>
          )}
        </>
      )}
      {otherMaterialList && (
        <ListPaginator
          count={otherMaterialList?.meta.totalPages}
          page={selectedPage}
          setSelectedPage={setSelectedPage}
        />
      )}
    </div>
  );
};

export default MaterialsList;
