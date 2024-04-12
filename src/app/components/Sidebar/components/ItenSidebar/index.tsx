import {
  Collapse,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { ListaProps } from '../../data/index';
import React from 'react';
import { useRouter } from 'next/navigation';

interface Props {
  item: ListaProps;
}

const ItenSidebar = ({ item }: Props) => {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  const handleClick = () => {
    setOpen(!open);
  };

  const listConfig = item.children;

  return (
    <>
      <ListItemButton
        onClick={item.label == 'Configurações' ? handleClick : undefined}
      >
        <ListItemIcon>{item.icone}</ListItemIcon>
        <ListItemText primary={item.label} />
        {item.label == 'Configurações' ? (
          open ? (
            <ExpandLess />
          ) : (
            <ExpandMore />
          )
        ) : null}
      </ListItemButton>

      <Collapse in={open} timeout="auto">
        {listConfig.map((item) => (
          <ListItemButton key={item.label} sx={{ pl: 9 }}>
            <ListItemText
              primary={item.label}
              onClick={() => router.push(item.route)}
            />
          </ListItemButton>
        ))}
      </Collapse>
    </>
  );
};

export default ItenSidebar;
