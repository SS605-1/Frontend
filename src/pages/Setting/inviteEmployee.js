import React, { useEffect, useState } from 'react';
import axios from 'axios';

const InviteEmployee = () => {
  const shop = localStorage.getItem('shopName');
  const token = localStorage.getItem('token');
  const [code, setCode] = useState('');
  const storeId = Number(localStorage.getItem('storeId'));

  useEffect(() => {
    const receiveCode = async () => {
      try {
        const res = await axios({
          method: 'POST',
          url: `${process.env.REACT_APP_REST_API_URL}/store/generateCode?storeId=${storeId}`,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        });

        // 일회용 코드 저장
        setCode(res.data);
      } catch (error) {
        console.error(
          'code receive error!!',
          error.message,
          error.response?.data
        );
      }
    };

    receiveCode();
  }, []);
  return (
    <div className="flex flex-col w-full h-full items-center mt-32 gap-y-14">
      <div className="flex flex-col w-[204px] gap-y-5">
        <div className="flex flex-col">
          <div className="flex justify-start font-bold text-black text-2xl">
            {shop}
          </div>
          <div className="flex justify-start text-sm">
            점포에 새 직원을 추가합니다.
          </div>
          <div className="flex justify-start text-sm">
            새 직원에게 아래 코드를 알려주세요.
          </div>
        </div>
        <div className="flex flex-col w-[234px]">
          <div className="flex justify-start text-sm">
            직원이 코드를 입력하면, 해당 직원이
          </div>
          <div className="flex justify-start text-sm">점포에 등록됩니다.</div>
        </div>
      </div>
      <div>
        <div className="flex justify-center items-center border-[3px] rounded-[20px] border-wink-blue w-[220px] h-[95px] text-center">
          <p className="font-normal text-2xl">{code}</p>
        </div>
      </div>
    </div>
  );
};
export default InviteEmployee;
