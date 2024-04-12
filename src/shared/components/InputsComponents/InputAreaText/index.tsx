/* eslint-disable @typescript-eslint/no-explicit-any */
import { TextField } from '@mui/material';
import { UseFormRegister, UseFormWatch } from 'react-hook-form';

interface Props {
  label: string;
  formRegister: UseFormRegister<any>;
  registerName: string;
  required?: boolean;
  errors?: string;
  viewFormValue: UseFormWatch<any>;
}

const InputAreaText = ({
  label,
  formRegister,
  registerName,
  required = false,
  errors,
  viewFormValue,
}: Props) => {
  return (
    <>
      {required ? (
        <div className="w-full">
          <TextField
            label={label}
            fullWidth={true}
            multiline
            rows={4}
            {...formRegister(registerName)}
          />
          {errors && <span style={{ color: 'red' }}>{errors}</span>}
        </div>
      ) : (
        <TextField
          label={label}
          fullWidth={true}
          multiline
          rows={4}
          {...formRegister(registerName)}
        />
      )}
    </>
  );
};

export default InputAreaText;
