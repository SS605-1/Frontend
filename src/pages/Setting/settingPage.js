import React, { useEffect } from 'react';
import Divider from '@mui/material/Divider';
import theme from '../../style/theme.js';
import { ThemeProvider } from '@mui/material/styles';
import { ReactComponent as Won } from '../../assets/emoji/won.svg';
import { ReactComponent as Staff } from '../../assets/emoji/staff.svg';
import { ReactComponent as AddEmployee } from '../../assets/emoji/addEmployee.svg';
import InfoBar from '../../components/layout/infoBar';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/layout/footer';
import axios from 'axios';

const SettingPage = () => {
  const navigate = useNavigate();
  const profileUrl = localStorage.getItem('profile');
  const userName = localStorage.getItem('name');
  const setting = '설정 페이지';
  const token = localStorage.getItem('token');
  const storeId = localStorage.getItem('storeId');

  // 버튼 텍스트, 아이콘, 경로를 함께 관리
  const buttonList = [
    { label: '임금 계산 절차', icon: <Won />, path: '/WageCalculate' },
    { label: '직원 관리', icon: <Staff />, path: '/ManageEmployee' },
    { label: '새 직원 초대', icon: <AddEmployee />, path: '/InviteEmployee' }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios({
          method: 'GET',
          url: `${process.env.REACT_APP_REST_API_URL}/store/check-permission?storeId=${storeId}`,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        });
        console.log(res);
      } catch (error) {
        console.error(
          'Store-check permission 오류!',
          error.message,
          error.response?.data
        );
      }
    };

    fetchData();
  }, [token]);

  return (
    <>
      <InfoBar name={setting} />
      <div>
        <div className="flex flex-col gap-y-[31px] mt-[32px]">
          <div className="w-[97px] h-[24px] font-bold text-xl text-black">
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
                  <span className="font-normal text-[16px]">사장/관리자</span>
                </div>
              </div>
            </div>
            <div>
              {buttonList.map((button, index) => (
                <div
                  key={index}
                  className="w-[295px] h-[55px] cursor-pointer"
                  onClick={() => navigate(button.path)}
                >
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
      <Footer />
    </>
  );
};

export default SettingPage;
