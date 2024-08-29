import React, { useEffect } from 'react';
import { ReactComponent as SplashIcon } from '../../assets/app/logo.svg';
import { useNavigate } from 'react-router-dom';

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login');
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col justify-center items-center pt-[144px]">
      <SplashIcon />
      <div className="text-[#3A70FF] text-[36px] font-bold pt-[16px] drop-shadow-lg">
        SS605
      </div>
    </div>
  );
};
export default SplashScreen;
