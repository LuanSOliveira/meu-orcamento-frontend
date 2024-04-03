'use client';

import Drawer from '@mui/material/Drawer';
import { useAppSelector } from '@/store/hooks';
import { standardColor } from '@/shared/constants';

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
      ></Drawer>
    </>
  );
};

export default Sidebar;
