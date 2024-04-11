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
import {
  useGetSystemParams,
  usePatchSystemParams,
  usePostSystemParams,
} from '@/hooks/Queries';
import { ISystemParamsDTO } from '../../types';
import { useRouter } from 'next/navigation';
import { BUDGET_ROUTS } from '@/shared/routes/routes';

const SystemParamsForm = () => {
  const router = useRouter();
  const { data: systemParamsList } = useGetSystemParams({});
  const { onPostSystemParams } = usePostSystemParams();
  const { onPatchSystemParams } = usePatchSystemParams(
    systemParamsList ? systemParamsList[0].id : '',
  );
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
    const params: ISystemParamsDTO = {
      salaryPerMonth: parseFloat(data.salary.replace('.', '')),
      workingHoursPerMonth: parseFloat(data.hours.replace('.', '')),
      profit: parseFloat(data.percent.replace('.', '')),
    };
    if (systemParamsList && systemParamsList?.length > 0) {
      onPatchSystemParams(params);
      console.log('atualizado');
    } else {
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
          initialValue={
            systemParamsList
              ? systemParamsList[0].workingHoursPerMonth.toString()
              : ''
          }
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
          initialValue={
            systemParamsList ? systemParamsList[0].profit.toString() : ''
          }
        />
        <div className="w-full"></div>
        <div className="w-full"></div>
      </div>
      <div className="flex justify-between my-10">
        <Button
          variant="contained"
          className="bg-gray-200 hover:bg-gray-300 text-gray-500 h-12 rounded-xl font-bold"
        >
          <KeyboardReturn onClick={() => router.push(BUDGET_ROUTS.home)} />
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
