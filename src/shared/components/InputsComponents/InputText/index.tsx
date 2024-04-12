/* eslint-disable @typescript-eslint/no-explicit-any */
import { TextField } from '@mui/material';
import { UseFormRegister } from 'react-hook-form';

interface Props {
  label: string;
  formRegister: UseFormRegister<any>;
  registerName: string;
  required?: boolean;
  errors?: string;
}

const InputText = ({
  label,
  formRegister,
  registerName,
  required = false,
  errors,
}: Props) => {
  return (
    <>
      {required ? (
        <div className="w-full">
          <TextField
            label={label}
            fullWidth={true}
            {...formRegister(registerName)}
          />
          {errors && <span style={{ color: 'red' }}>{errors}</span>}
        </div>
      ) : (
        <TextField
          label={label}
          fullWidth={true}
          {...formRegister(registerName)}
        />
      )}
    </>
  );
};

export default InputText;
