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

interface Props {
  item: ListaProps;
}

const ItenSidebar = ({ item }: Props) => {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const listConfig = item.children;

  return (
    <>
      <ListItemButton
        onClick={item.label == 'Configurações' ? handleClick : undefined}
      >
        <ListItemIcon>
          <item.icone sx={{ color: 'white' }} />
        </ListItemIcon>
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
          <ListItemButton sx={{ pl: 9 }}>
            <ListItemText primary={item} />
          </ListItemButton>
        ))}
      </Collapse>
    </>
  );
};

export default ItenSidebar;
