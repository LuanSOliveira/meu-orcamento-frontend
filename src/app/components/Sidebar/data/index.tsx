import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { BUDGET_ROUTS } from '@/shared/routes/routes';

interface ListaConfig {
  label: string;
  route: string;
}

export interface ListaProps {
  label: string;
  icone: React.ReactNode;
  expand: boolean;
  children: ListaConfig[];
}

export const ListSideBarItens: ListaProps[] = [
  {
    label: 'Inicio',
    icone: <HomeIcon sx={{ color: 'white' }} />,
    expand: false,
    children: [],
  },
  {
    label: 'Configurações',
    icone: <SettingsIcon sx={{ color: 'white' }} />,
    expand: true,
    children: [
      {
        label: 'Linhas',
        route: BUDGET_ROUTS.lines,
      },
      {
        label: 'Materiais',
        route: BUDGET_ROUTS.materials,
      },
      {
        label: 'Parâmetros',
        route: BUDGET_ROUTS.systemParams,
      },
    ],
  },
  {
    label: 'Orçamento',
    icone: <MonetizationOnIcon sx={{ color: 'white' }} />,
    expand: false,
    children: [],
  },
];
