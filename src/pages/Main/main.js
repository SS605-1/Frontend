import React from 'react';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import Button from '../../components/Button.js';
import { ReactComponent as Bag } from '../../assets/bag.svg';
import { useNavigate } from 'react-router-dom';

const Main = () => {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate('/SignIn');
  };
  return (
    <div className="flex flex-col w-full h-full gap-y-[22px]">
      <div className="flex  justify-start">
        <Logo className="w-[180px] h-[157px]" />
      </div>
      <div className="flex flex-col items-center gap-y-[74px]">
        <div className="bg-wink-blue rounded-[20px] text-white w-[295px] h-[295px] flex flex-col items-center justify-center gap-y-5">
          <div className="font-bold">앗! 아직 등록된 점포가 없어요!</div>
          <div className="font-medium">
            아래 버튼을 눌러 기존 점포에 가입하거나, 새 점포를 생성하세요!
          </div>
          <Bag />
        </div>

        <Button
          variant="contained"
          disableElevation
          sx={{ width: 295, height: 95, borderRadius: 7.5 }}
          color="primary"
          className="text-white font-semibold  text-xl"
          onClick={handleButtonClick}
        >
          점포 가입/생성하기
        </Button>
      </div>
    </div>
  );
};
export default Main;
