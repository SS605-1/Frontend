import React from 'react';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import Button from '../../components/Button.js';
import Divider from '@mui/material/Divider';
import theme from '../../style/theme.js';
import { ThemeProvider } from '@mui/material/styles';
import { ReactComponent as Shop } from '../../assets/shop.svg';

const HomePage = () => {
  const dummyData = [
    'CU 정릉솔샘점',
    '파리바게뜨 카페정릉점',
    '공차 성신여대점'
  ];
  const shopList = dummyData.map((shop, index) => (
    <div key={index} className="flex flex-col justify-start gap-y-[14px]">
      <Divider
        sx={{
          backgroundColor: 'secondary.main',
          width: 295,
          borderBottomWidth: 1
        }}
        aria-hidden="true"
      />
      <div className="flex gap-x-[32px] mb-4 ml-7">
        <Shop className="w-[28px] h-[28px]" />
        <div className="h-[26px]">{shop}</div>
      </div>
    </div>
  ));
  return (
    <div className="flex flex-col w-full h-full gap-y-[86px]">
      <div className="flex  justify-start">
        <Logo className="w-[180px] h-[157px]" />
      </div>
      <div className="flex flex-col items-center">
        <ThemeProvider theme={theme}>{shopList}</ThemeProvider>
      </div>
      <div className="flex flex-col items-center">
        <Button
          variant="contained"
          disableElevation
          sx={{ width: 295, height: 95, borderRadius: 7.5 }}
          color="primary"
          className="text-white font-semibold  text-xl"
        >
          점포 가입/생성하기
        </Button>
      </div>
    </div>
  );
};
export default HomePage;
