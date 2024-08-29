import React, { useState } from 'react';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import Button from '../../components/Button.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const JoinStore = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');
  let code;
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  const handleButtonClick = async () => {
    code = inputValue;
    try {
      await axios({
        method: 'POST',
        url: `${process.env.REACT_APP_REST_API_URL}/store/registerEmployee?code=${code}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
      navigate('/HomePage');
    } catch (error) {
      console.error('code accept error!!', error.message, error.response?.data);
    }
  };

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
              onChange={handleInputChange}
              className="border-[3px] rounded-[20px] border-wink-blue w-[220px] h-[95px] text-center placeholder:text-center placeholder:text-black placeholder:font-normal placeholder:text-xl"
            />

            <Button
              variant="contained"
              disableElevation
              sx={{ width: 220, height: 47, borderRadius: 7.5 }}
              color="primary"
              className="text-white font-bold text-xl"
              onClick={handleButtonClick}
            >
              확인
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinStore;
