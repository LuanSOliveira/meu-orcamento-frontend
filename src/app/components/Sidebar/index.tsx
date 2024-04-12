'use client';

import Drawer from '@mui/material/Drawer';
import { useAppSelector } from '@/store/hooks';
import { standardColor } from '@/shared/constants';
import { List, ListSubheader } from '@mui/material';
import React from 'react';
import { ListSideBarItens } from './data/index';
import ItenSidebar from './components/ItenSidebar/index';

const Sidebar = () => {
  const sidebarState = useAppSelector((state) => state.sidebar);

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
          sx={{ color: 'white' }}
          subheader={
            <ListSubheader
              sx={{
                padding: 0,
                marginLeft: 7,
                backgroundColor: standardColor,
                fontSize: 20,
                color: 'white',
              }}
            >
              NOVELORUMI
            </ListSubheader>
          }
        >
          {ListSideBarItens.map((item) => (
            <ItenSidebar key={item.label} item={item} />
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;
