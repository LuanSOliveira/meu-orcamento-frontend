'use client';

import InputMonetaryFormat from '@/shared/components/InputsComponents/InputMonetaryFormat';
import InputPercentFormat from '@/shared/components/InputsComponents/InputPercentFormat';
import InputTimeFormat from '@/shared/components/InputsComponents/InputTimeFormat';
import { Button } from '@mui/material';
import KeyboardReturn from '@mui/icons-material/KeyboardReturn';
import { useForm } from 'react-hook-form';
import {
  SystemParamsFormProps,
  systemParamsFormResolver,
} from '@/shared/formSchemas';
import { useState } from 'react';
import { useGetSystemParams } from '@/hooks/Queries';
import { usePostSystemParams } from '@/hooks/Queries/SystemParamsQueries/usePostSystemParams';
import { ISystemParamsDTO } from '../../types';

const SystemParamsForm = () => {
  const { data: systemParamsList } = useGetSystemParams({});
  const { onPostSystemParams } = usePostSystemParams();
  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: systemParamsFormResolver,
    defaultValues: {
      salary: systemParamsList
        ? systemParamsList[0]?.salaryPerMonth.toString()
        : '',
      hours: systemParamsList
        ? systemParamsList[0]?.workingHoursPerMonth.toString()
        : '',
      percent: systemParamsList ? systemParamsList[0]?.profit.toString() : '',
    },
  });

  const [monetaryValue, setMonetaryValue] = useState<string>('');
  const [timeValue, setTimeValue] = useState<string>('');

  function OnMathSalaryPerHours() {
    if (
      monetaryValue.length > 0 &&
      timeValue.length > 0 &&
      monetaryValue !== '0' &&
      timeValue !== '0'
    ) {
      const value: number =
        parseFloat(monetaryValue.replace('.', '').replace(',', '.')) /
        parseFloat(timeValue.replace(',', '.'));
      return value.toFixed(2).replace('.', ',');
    } else {
      return '--,--';
    }
  }

  function OnSaveForm(data: SystemParamsFormProps) {
    if (systemParamsList && systemParamsList?.length > 0) {
      console.log('Lista em atualização');
      console.log(data);
    } else {
      console.log('Criar Parametros');
      console.log(data);
      const params: ISystemParamsDTO = {
        salaryPerMonth: parseFloat(data.salary.replace('.', '')),
        workingHoursPerMonth: parseFloat(data.hours.replace('.', '')),
        profit: parseFloat(data.percent.replace('.', '')),
      };
      onPostSystemParams(params);
    }
  }

  return (
    <form className="flex flex-col gap-5">
      <div className="flex w-full gap-5">
        <InputMonetaryFormat
          label="Salário Mensal"
          registerName="salary"
          errors={errors.salary?.message ? errors.salary.message : ''}
          setFormValue={setValue}
          setStateValue={setMonetaryValue}
          initialValue={
            systemParamsList
              ? systemParamsList[0].salaryPerMonth.toString()
              : ''
          }
        />
        <InputTimeFormat
          label="Horas de Trabalho Mensal"
          timeTipe="h"
          registerName="hours"
          errors={errors.hours?.message ? errors.hours.message : ''}
          setFormValue={setValue}
          setStateValue={setTimeValue}
        />
        <div className="w-full flex justify-center pt-3">
          <p className="font-bold text-[20px]">
            Valor/Hora: R$ {OnMathSalaryPerHours()}
          </p>
        </div>
      </div>
      <div className="flex gap-5 w-full">
        <InputPercentFormat
          label="% Lucro"
          registerName="percent"
          errors={errors.percent?.message ? errors.percent.message : ''}
          setFormValue={setValue}
        />
        <div className="w-full"></div>
        <div className="w-full"></div>
      </div>
      <div className="flex justify-between my-10">
        <Button
          variant="contained"
          className="bg-gray-200 hover:bg-gray-300 text-gray-500 h-12 rounded-xl font-bold"
        >
          <KeyboardReturn />
        </Button>
        <Button
          variant="contained"
          className="bg-budget-standard hover:bg-[#2cb8a7] h-12 rounded-xl font-bold min-w-32 text-lg"
          onClick={handleSubmit(OnSaveForm)}
        >
          SALVAR
        </Button>
      </div>
    </form>
  );
};

export default SystemParamsForm;
