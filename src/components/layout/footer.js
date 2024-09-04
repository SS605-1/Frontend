import React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as HomeIcon } from '../../assets/emoji/home.svg';
import { ReactComponent as ScheduleIcon } from '../../assets/emoji/schedule.svg';
import { ReactComponent as SettingIcon } from '../../assets/emoji/setting.svg';

export default function Footer() {
  const [value, setValue] = React.useState('recents');
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);

    const shopName = localStorage.getItem('shopName');
    const shopAddress = localStorage.getItem('shopAddress');

    if (newValue === 'home') {
      navigate('/commute', { state: { shopName, shopAddress } });
    } else if (newValue === 'schedule') {
      navigate('/schedule');
    } else if (newValue === 'setting') {
      navigate('/setting');
    }
  };

  return (
    <div
      className="absolute bottom-0 left-0 w-full"
      style={{
        maxWidth: '375px',
        height: '72px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'center',
        borderTop: '1px solid red' // #root와 일치시키기 위한 경계선
      }}
    >
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => handleChange(event, newValue)}
        sx={{
          backgroundColor: '#FFFFFF',
          color: '#232322',
          height: '72px', // 높이를 72px로 고정
          width: '100%',
          position: 'absolute', // absolute로 변경
          bottom: 0,
          left: 0,
          '& .MuiBottomNavigationAction-label': {
            color: '#232322',
            fontSize: '7px !important'
          }
        }}
      >
        <BottomNavigationAction
          label="Home"
          value="home"
          icon={<HomeIcon />}
          sx={{ minWidth: 'unset', color: '#232322' }}
        />
        <BottomNavigationAction
          label="Schedule"
          value="schedule"
          icon={<ScheduleIcon />}
          sx={{ minWidth: 'unset', color: '#232322' }}
        />
        <BottomNavigationAction
          label="Setting"
          value="setting"
          icon={<SettingIcon />}
          sx={{ minWidth: 'unset', color: '#232322' }}
        />
      </BottomNavigation>
    </div>
  );
}
