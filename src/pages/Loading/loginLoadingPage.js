import { ReactComponent as LogoIcon } from '../../assets/app/logo.svg';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';

const LoginLoadingPage = () => {
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get('code');
  useEffect(() => {
    const kakaoLogin = async () => {
      try {
        const res = await axios({
          method: 'GET',
          url: `${process.env.REACT_APP_REST_API_URL}/oauth2/kakao?code=${code}`,
          headers: {
            'Content-Type': 'application/json;charset=UTF-8'
          }
        });
        console.log(res.data);
        localStorage.setItem('name', res.data.nickname); // 토큰, 이름, 프로필등을 로컬스토리지에 저장해 사용
        localStorage.setItem('profile', res.data.profile_image_url);
        localStorage.setItem('token', res.data.token.accessToken);
        console.log(localStorage.getItem('token'));
        const token = localStorage.getItem('token');
        try {
          const storeRes = await axios({
            // 등록가게 조회
            method: 'GET',
            url: `${process.env.REACT_APP_REST_API_URL}/store/user`,
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          });
          if (storeRes.data && storeRes.data.length > 0) {
            navigate('/HomePage');
          } else {
            navigate('/Main');
          }
        } catch (error) {
          console.error(
            'store lookup error!!',
            error.message,
            error.response.data
          );
        }
      } catch (error) {
        console.error(
          'token transmit error!!',
          error.message,
          error.response.data
        );
      }
    };

    kakaoLogin();
  }, []);

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
