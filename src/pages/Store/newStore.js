import React from 'react';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const NewStore = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#3A70FF'
      },
      secondary: {
        main: '#D9D9D9'
      }
    }
  });

  return (
    <div className="flex flex-col w-full y-full gap-y-[100px]">
      <div className="flex justify-start">
        <Logo className="w-[180px] h-[157px]" />
      </div>
      <div className="flex flex-col items-center gap-y-[98px]">
        <span className="text-black font-bold text-2xl flex flex-col justify-center w-[375px] h-8">
          등록할 점포 정보를 입력해주세요.
        </span>
        <div className="flex flex-col gap-y-[61px] w-full y-full items-center">
          <div className="flex w-full h-[55px] justify-center items-center gap-x-[19px]">
            <span className="text-black font-bold text-2xl">점포 이름</span>
            <input
              type="text"
              className="rounded-[20px] bg-wink-gray w-[188px] h-full"
            />
          </div>
          <ThemeProvider theme={theme}>
            <Button
              variant="contained"
              disableElevation
              sx={{ width: 220, height: 47, borderRadius: 7.5 }}
              color="primary"
              className="text-white font-bold text-xl"
            >
              확인
            </Button>
          </ThemeProvider>
        </div>
      </div>
    </div>
  );
};

export default NewStore;
