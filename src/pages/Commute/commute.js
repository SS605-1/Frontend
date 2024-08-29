import React from 'react';
import { useLocation } from 'react-router-dom';

const Commute = () => {
  const location = useLocation();
  const shop = location.state.shopName;
  localStorage.setItem('shopName', shop);
  const address = location.state.shopAddress;
  console.log(shop);
  return (
    <div className="flex flex-col justify-center">
      <div className="flex flex-col justify-center h-[127px]">
        <span className="font-bold text-black text-2xl">{shop}</span>
        <span className="font-light text-black text-[15px]">{address}</span>
      </div>
      <div>
        <h1>로그인</h1>
      </div>
    </div>
  );
};

export default Commute;
