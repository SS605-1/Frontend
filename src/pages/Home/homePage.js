import React, { useEffect, useState } from 'react';
import { ReactComponent as Logo } from '../../assets/app/logo.svg';
import Button from '../../components/Button.js';
import Divider from '@mui/material/Divider';
import theme from '../../style/theme.js';
import { ThemeProvider } from '@mui/material/styles';
import { ReactComponent as Shop } from '../../assets/emoji/shop.svg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [storeList, setStoreList] = useState([]);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  // 점포 생성 버튼 관련 핸들러
  const handleButtonClick = () => {
    navigate('/SignIn');
  };

  // 가게 이름을 클릭했을 때, 점포 페이지로 라우팅.
  const handleShopClick = (shop) => {
    // 클릭한 가게의 storeId를 localStorage에 저장
    localStorage.setItem('storeId', shop.storeId);

    // 가게 이름과 주소를 state로 전달
    navigate('/Commute', {
      state: { shopName: shop.name, shopAddress: shop.streetAddress }
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios({
          method: 'GET',
          url: `${process.env.REACT_APP_REST_API_URL}/store/user`,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        });

        // 가게 이름, 도로명 주소, storeId를 객체로 저장
        const storeData = res.data.map((store) => ({
          storeId: store.id,
          name: store.name,
          streetAddress: store.streetAddress
        }));
        setStoreList(storeData);
      } catch (error) {
        console.error(
          'store 조회 error!!',
          error.message,
          error.response?.data
        );
      }
    };

    fetchData();
  }, [token]);

  // storeList에서 이름만 표시
  const shopList = storeList.map((shop, index) => (
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
        <div className="h-[26px]" onClick={() => handleShopClick(shop)}>
          {shop.name}
        </div>
      </div>
    </div>
  ));

  return (
    <div className="flex flex-col w-full h-full gap-y-[86px]">
      <div className="flex justify-start">
        <Logo className="w-[180px] h-[157px]" />
      </div>
      <div className="flex flex-col items-center">
        <ThemeProvider theme={theme}>{shopList}</ThemeProvider>
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
      <div className="flex flex-col items-center">
        <Button
          variant="contained"
          disableElevation
          sx={{ width: 295, height: 95, borderRadius: 7.5 }}
          color="primary"
          className="text-white font-semibold text-xl"
          onClick={handleButtonClick}
        >
          점포 가입/생성하기
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
