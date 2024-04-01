'use client';

import { ReactQueryProvider } from './react-query-provider';
import { ReduxProvider } from './redux-provider';

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <ReduxProvider>
      <ReactQueryProvider>{children}</ReactQueryProvider>
    </ReduxProvider>
  );
};
