import { SvgIconTypeMap } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { OverridableComponent } from '@mui/material/OverridableComponent';

export interface ListaProps {
  label: string;
  icone: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>;
  expand: boolean;
  children: string[];
}

export const ListSideBarItens: ListaProps[] = [
  {
    label: 'Inicio',
    icone: HomeIcon,
    expand: false,
    children: [],
  },
  {
    label: 'Configurações',
    icone: SettingsIcon,
    expand: true,
    children: ['Linhas', 'Materias', 'Parametros'],
  },
  {
    label: 'Orçamento',
    icone: MonetizationOnIcon,
    expand: false,
    children: [],
  },
];
