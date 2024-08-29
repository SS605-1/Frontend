import React from 'react';
import Divider from '@mui/material/Divider';
import theme from '../../style/theme.js';
import { ThemeProvider } from '@mui/material/styles';
import { ReactComponent as Won } from '../../assets/emoji/won.svg';
import { ReactComponent as Staff } from '../../assets/emoji/staff.svg';
import { ReactComponent as AddEmployee } from '../../assets/emoji/addEmployee.svg';

const SettingPage = () => {
  const profileUrl = localStorage.getItem('profile');
  const userName = localStorage.getItem('name');

  // 버튼 텍스트와 아이콘을 함께 관리
  const buttonList = [
    { label: '임금 계산 절차', icon: <Won /> },
    { label: '직원 관리', icon: <Staff /> },
    { label: '새 직원 초대', icon: <AddEmployee /> }
  ];

  return (
    <div>
      <div className="flex flex-col gap-y-[31px] mt-[32px]">
        <div className="w-[97px] h-[24px] font-bold text-xl text-black ">
          나의 프로필
        </div>
        <div className="flex flex-col gap-y-[86px]">
          <div className="flex w-[281px] h-[100px] justify-between items-center">
            <img
              src={profileUrl}
              alt="프로필 이미지"
              className="w-[100px] h-[100px] rounded-full ml-2"
            />
            <div className="flex flex-col gap-y-[14px]">
              <div className="font-bold text-[16px] flex justify-start gap-x-2">
                이름
                <span className="font-normal text-[16px]">{userName}</span>
              </div>
              <div className="font-bold text-[16px] flex gap-x-2">
                직급
                <span className="font-normal text-[16px]">사장/관리자 </span>
              </div>
            </div>
          </div>
          <div>
            {buttonList.map((button, index) => (
              <div key={index} className="w-[295px] h-[55px]">
                <ThemeProvider theme={theme}>
                  <Divider
                    sx={{
                      backgroundColor: 'secondary.main',
                      width: 295,
                      borderBottomWidth: 1
                    }}
                    aria-hidden="true"
                  />
                </ThemeProvider>
                <div className="flex ml-5 gap-x-8 items-center h-full">
                  {button.icon}
                  <div>{button.label}</div>
                </div>
              </div>
            ))}
            <ThemeProvider theme={theme}>
              <Divider
                sx={{
                  backgroundColor: 'secondary.main',
                  width: 295,
                  borderBottomWidth: 1
                }}
                aria-hidden="true"
              />
            </ThemeProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingPage;
