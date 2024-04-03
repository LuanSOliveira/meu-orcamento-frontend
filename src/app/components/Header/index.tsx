'use client';

import { changeSideBarState } from '@/store/reducers/SidebarSlice';
import { useDispatch } from 'react-redux';
import MenuIcon from '@mui/icons-material/Menu';

const Header = () => {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center px-4 py-2 w-full border-b-2 border-budget-standard">
      <MenuIcon onClick={() => dispatch(changeSideBarState())} />
      <div className="flex w-full justify-end">
        <img
          width="60"
          height="60"
          src="https://img.icons8.com/color/60/ball-winder.png"
          alt="ball-winder"
        />
      </div>
    </div>
  );
};

export default Header;
