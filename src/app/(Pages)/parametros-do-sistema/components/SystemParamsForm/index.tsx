'use client';

import InputMonetaryFormat from '@/shared/components/InputsComponents/InputMonetaryFormat';
import KeyboardReturn from '@mui/icons-material/KeyboardReturn';
import { useForm } from 'react-hook-form';
import {
  SystemParamsFormProps,
  systemParamsFormResolver,
} from '@/shared/formSchemas';
import { useEffect, useState } from 'react';
import {
  useGetSystemParams,
  usePatchSystemParams,
  usePostSystemParams,
} from '@/hooks/Queries';
import { ISystemParamsDTO } from '../../types';
import { useRouter } from 'next/navigation';
import { BUDGET_ROUTS } from '@/shared/routes/routes';
import CustomButton from '@/shared/components/CustomButton';
import InputSufixFormat from '@/shared/components/InputsComponents/InputSufixFormat';

const SystemParamsForm = () => {
  const router = useRouter();
  const { data: systemParamsList } = useGetSystemParams({});
  const { onPostSystemParams } = usePostSystemParams();
  const { onPatchSystemParams } = usePatchSystemParams(
    systemParamsList ? systemParamsList[0]?.id : '',
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

  useEffect(() => {
    if (systemParamsList) {
      setMonetaryValue(systemParamsList[0]?.salaryPerMonth.toString());
      setTimeValue(systemParamsList[0]?.workingHoursPerMonth.toString());
    }
  }, [systemParamsList]);

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
      salaryPerMonth: data.salary,
      workingHoursPerMonth: data.hours,
      profit: data.percent,
    };
    if (systemParamsList && systemParamsList?.length > 0) {
      onPatchSystemParams(params);
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
              ? systemParamsList[0]?.salaryPerMonth.toString()
              : ''
          }
        />
        <InputSufixFormat
          label="Horas de Trabalho Mensal"
          sufix="h"
          registerName="hours"
          errors={errors.hours?.message ? errors.hours.message : ''}
          setFormValue={setValue}
          setStateValue={setTimeValue}
          initialValue={
            systemParamsList
              ? systemParamsList[0]?.workingHoursPerMonth.toString()
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
        <InputSufixFormat
          label="% Lucro"
          sufix="%"
          registerName="percent"
          errors={errors.percent?.message ? errors.percent.message : ''}
          setFormValue={setValue}
          initialValue={
            systemParamsList ? systemParamsList[0]?.profit.toString() : ''
          }
        />
        <div className="w-full"></div>
        <div className="w-full"></div>
      </div>
      <div className="flex justify-between my-10">
        <CustomButton
          buttonTheme="secondary"
          type="back"
          label={<KeyboardReturn />}
          onClickButton={() => router.push(BUDGET_ROUTS.home)}
        />
        <CustomButton
          buttonTheme="primary"
          type="save"
          label="SALVAR"
          onClickButton={handleSubmit(OnSaveForm)}
        />
      </div>
    </form>
  );
};

export default SystemParamsForm;
