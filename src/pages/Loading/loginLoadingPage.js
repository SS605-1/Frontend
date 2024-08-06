import { ReactComponent as LogoIcon } from '../../assets/logo.svg';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';

const LoginLoadingPage = () => {
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get('code');
  useEffect(() => {
    const kakaoLogin = async () => {
      await axios({
        method: 'GET',
        url: `${process.env.REACT_APP_REDIRECT_URL}/?code=${code}`,
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }).then((res) => {
        console.log(res);
        localStorage.setItem('name', res.data.acount.kakaoName);
        navigate('/main');
      });
    };
    kakaoLogin();
  }, []);
  console.log(code);
  return (
    <div className="flex flex-col justify-center items-center min-w-full min-h-full gap-y-5">
      <div className="animate-spin">
        <LogoIcon />
      </div>
      <div>
        <p className="text-[#3A70FF] text-[36px] font-bold pt-[16px] drop-shadow-lg">
          로딩중입니다, 잠시만 기다려주세요.
        </p>
      </div>
    </div>
  );
};

export default LoginLoadingPage;
