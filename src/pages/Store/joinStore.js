import React from 'react';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const JoinStore = () => {
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
    <div className="flex flex-col w-full y-full">
      <div className="flex justify-start">
        <Logo className="w-[180px] h-[157px]" />
      </div>
      <div>
        <div className="flex flex-col items-center gap-y-[75px]">
          <span className="flex flex-col justify-center w-[289px] h-[107px] text-2xl font-bold text-black">
            사장님이 알려주신 점포 초대 코드를 아래에 입력해주세요.
          </span>
          <div className="flex flex-col gap-y-[33px]">
            <input
              type="password"
              placeholder="초대 코드 입력"
              className="border-[3px] rounded-[20px] border-wink-blue w-[220px] h-[95px] placeholder:text-center placeholder:text-black placeholder:font-normal placeholder:text-xl"
            />
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
    </div>
  );
};

export default JoinStore;
