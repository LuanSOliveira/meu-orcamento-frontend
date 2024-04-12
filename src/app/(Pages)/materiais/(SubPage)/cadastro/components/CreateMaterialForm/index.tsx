'use client';

import { usePostOtherMaterials } from '@/hooks/Queries';
import CustomButton from '@/shared/components/CustomButton';
import InputAreaText from '@/shared/components/InputsComponents/InputAreaText';
import InputMonetaryFormat from '@/shared/components/InputsComponents/InputMonetaryFormat';
import InputSufixFormat from '@/shared/components/InputsComponents/InputSufixFormat';
import InputText from '@/shared/components/InputsComponents/InputText';
import {
  OtherMaterialsFormProps,
  OtherMaterialsFormResolver,
} from '@/shared/formSchemas';
import { BUDGET_ROUTS } from '@/shared/routes/routes';
import { KeyboardReturn } from '@mui/icons-material';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const CreateMaterialForm = () => {
  const [measure, setMeasure] = useState<string>('weight');
  const [monetaryValue, setMonetaryValue] = useState<string>('');
  const [measureValue, setMeasureValue] = useState<string>('');
  const router = useRouter();
  const {
    handleSubmit,
    setValue,
    register,
    watch,
    formState: { errors },
  } = useForm({
    resolver: OtherMaterialsFormResolver,
    defaultValues: {
      name: '',
      type: 'weight',
      imageLink: '',
      value: '',
      weight: '',
      otherInformations: '',
    },
  });
  const { onPostOtherMaterials } = usePostOtherMaterials();

  function OnMathValue() {
    if (
      monetaryValue.length > 0 &&
      measureValue.length > 0 &&
      monetaryValue !== '0' &&
      measureValue !== '0'
    ) {
      const value: number =
        parseFloat(monetaryValue.replace('.', '').replace(',', '.')) /
        parseFloat(measureValue.replace(',', '.'));
      return value.toFixed(2).replace('.', ',');
    } else {
      return '--,--';
    }
  }

  function OnChangeMeasure(value: string) {
    setMeasure(value);
    setValue('type', value);
  }

  function OnSaveForm(data: OtherMaterialsFormProps) {
    onPostOtherMaterials(data);
  }

  return (
    <form className="flex flex-col gap-5">
      <div className="w-full flex gap-10">
        <InputText
          label="Nome do Material"
          formRegister={register}
          registerName="name"
          required={true}
          errors={errors.name?.message ? errors.name.message : ''}
        />
        <FormControl className="w-1/4">
          <InputLabel data-test="selectInput" id="select-label">
            Medida
          </InputLabel>
          <Select
            labelId="select-label"
            label="Medida"
            value={measure}
            onChange={(e) => OnChangeMeasure(e.target.value)}
          >
            <MenuItem value={'weight'}>Peso</MenuItem>
            <MenuItem value={'unit'}>Unidade</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="w-full">
        <InputText
          label="Link da Imagem"
          formRegister={register}
          registerName="imageLink"
        />
      </div>
      <div className="w-full flex gap-6">
        <InputMonetaryFormat
          label="Valor (R$)"
          registerName="value"
          errors={errors.value?.message ? errors.value.message : ''}
          setFormValue={setValue}
          setStateValue={setMonetaryValue}
        />
        {watch('type') === 'weight' ? (
          <InputSufixFormat
            label="Gramas do Material"
            sufix="g"
            registerName="weight"
            errors={errors.weight?.message ? errors.weight.message : ''}
            setFormValue={setValue}
            setStateValue={setMeasureValue}
          />
        ) : (
          <InputSufixFormat
            label="Quantidade de Unidades"
            sufix="un"
            registerName="weight"
            errors={errors.weight?.message ? errors.weight.message : ''}
            setFormValue={setValue}
            setStateValue={setMeasureValue}
          />
        )}
        <div className="w-full flex justify-center pt-3">
          <p className="font-bold text-[20px]">
            {watch('type') === 'weight'
              ? `Preço/Grama: R$ ${OnMathValue()}`
              : `Preço/Und: R$ ${OnMathValue()}`}
          </p>
        </div>
      </div>
      <div className="w-full">
        <InputAreaText
          label="Outras Informações"
          formRegister={register}
          viewFormValue={watch}
          registerName="otherInformations"
        />
      </div>
      <div className="flex justify-between my-10">
        <CustomButton
          buttonTheme="secondary"
          type="back"
          label={<KeyboardReturn />}
          onClickButton={() => router.push(BUDGET_ROUTS.materials)}
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

export default CreateMaterialForm;
