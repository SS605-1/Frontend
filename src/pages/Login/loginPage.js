import React from 'react';
import { ReactComponent as SplashIcon } from '../../assets/app/logo.svg';
import { ReactComponent as KakaoLoginButton } from '../../assets/login/kakao_login_button.svg';
import { KAKAO_AUTH_URL } from '../../apis/api/auth';

const LoginPage = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="pt-[144px]">
        <SplashIcon />
        <div className="flex flex-col items-center pt-[125px]">
          <a href={KAKAO_AUTH_URL}>
            <KakaoLoginButton />
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
