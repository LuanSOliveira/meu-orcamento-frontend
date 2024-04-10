import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

export interface ListaProps {
  label: string;
  icone: React.ReactNode;
  expand: boolean;
  children: string[];
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
    children: ['Linhas', 'Materias', 'Parametros'],
  },
  {
    label: 'Orçamento',
    icone: <MonetizationOnIcon sx={{ color: 'white' }} />,
    expand: false,
    children: [],
  },
];
