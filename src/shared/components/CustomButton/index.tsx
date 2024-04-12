/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { ThemeProvider } from '@emotion/react';
import { Button, createTheme } from '@mui/material';

interface Props {
  buttonTheme: 'primary' | 'secondary';
  type: 'save' | 'back' | 'navigate';
  onClickButton: any;
  label: string | React.ReactNode;
}

const CustomButton = ({ buttonTheme, type, onClickButton, label }: Props) => {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#2cb8a7',
      },
      secondary: {
        main: '#E5E7EB',
      },
    },
  });

  const saveButtonProps = {
    color: 'white',
    borderRadius: 3,
    minWidth: 150,
    fontWeight: 'bold',
    fontSize: 15,
    height: 45,
  };

  const backButtonProps = {
    color: '#27292c',
    borderRadius: 3,
    minWidth: 80,
    fontWeight: 'bold',
    fontSize: 25,
    height: 45,
  };

  const navigateButtonProps = {
    color: 'white',
    borderRadius: 3,
    minWidth: 150,
    fontWeight: 'bold',
    fontSize: 20,
    height: 55,
  };

  function ButtonTypeFormat() {
    if (type === 'save') {
      return saveButtonProps;
    } else if (type === 'back') {
      return backButtonProps;
    } else if (type === 'navigate') {
      return navigateButtonProps;
    } else {
      return {};
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Button
        variant="contained"
        color={buttonTheme}
        sx={ButtonTypeFormat()}
        onClick={onClickButton}
      >
        {label}
      </Button>
    </ThemeProvider>
  );
};

export default CustomButton;
