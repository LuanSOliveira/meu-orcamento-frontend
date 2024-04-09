'use client';

import Drawer from '@mui/material/Drawer';
import { useAppSelector } from '@/store/hooks';
import { standardColor } from '@/shared/constants';
import HomeIcon from '@mui/icons-material/Home';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import SettingsIcon from '@mui/icons-material/Settings';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import React from 'react';

const Sidebar = () => {
  const sidebarState = useAppSelector((state) => state.sidebar);
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <Drawer
        sx={{
          width: sidebarState.value ? 240 : 0,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: sidebarState.value ? 240 : 0,
            background: standardColor,
            borderColor: standardColor,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={sidebarState.value}
      >
        <List
          sx={{color: 'white'}}
          subheader={
            <ListSubheader 
              sx={{
                width: '100%', 
                padding: 0, 
                marginLeft:7, 
                backgroundColor: standardColor, 
                fontSize: 20, 
                color: 'white'}}>
              NOVELORUMI
            </ListSubheader>
          }
        
        >
          <ListItemButton>
            <ListItemIcon>
              <HomeIcon sx={{color:'white'}} />
            </ListItemIcon>
            <ListItemText primary="Inicio" />
          </ListItemButton>

          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <SettingsIcon sx={{color:'white'}}/>
            </ListItemIcon>
            <ListItemText primary="Configurações" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          <Collapse in={open} timeout="auto">
            <ListItemButton sx={{ pl: 9 }}>
              <ListItemText primary="Linhas" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 9 }}>
              <ListItemText primary="Materiais" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 9 }}>
              <ListItemText primary="Parâmetros" />
            </ListItemButton>
          </Collapse>
          
          <ListItemButton>
            <ListItemIcon>
              <MonetizationOnIcon sx={{color:'white'}}/>
            </ListItemIcon>
            <ListItemText primary="Orçamento" />
          </ListItemButton>
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;
