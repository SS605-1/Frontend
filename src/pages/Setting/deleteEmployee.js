import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/layout/header';
import Button from '../../components/Button';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../style/theme';
import Divider from '@mui/material/Divider';
import axios from 'axios';

const DeleteEmployee = () => {
  // state에서 전달된 직원 정보를 가져옴
  const location = useLocation();
  const { employees } = location.state || {}; // employees가 undefined일 수 있으므로 기본값 설정
  const title = '직원 관리';
  const token = localStorage.getItem('token');
  const handleDeleteClick = async (employee) => {
    try {
      await axios({
        method: 'DELETE',
        url: `${process.env.REACT_APP_REST_API_URL}/store/delete/employee?employeeId=${employee.employeeId}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
    } catch (error) {
      console.error('직원 삭제 오류:', error.message);
    }
  };
  return (
    <>
      <Header title={title} />
      <div className="flex w-[375px] h-[56px] items-center pt-[23px]">
        {employees && employees.length > 0 ? (
          <ul>
            {employees.map((employee) => (
              <div
                key={employee.employeeId}
                className="flex flex-col gap-y-[14px]"
              >
                <div className="flex flex-start space-x-[68px] ml-[23px]">
                  <li className="flex items-center font-bold text-xl">
                    {employee.employeeNickname}
                  </li>
                  <Button
                    color="secondary"
                    className="w-[151px] h-[26px] font-normal text-sm"
                    onClick={handleDeleteClick}
                  >
                    직원 삭제하기
                  </Button>
                </div>
                <ThemeProvider theme={theme}>
                  <Divider
                    sx={{
                      backgroundColor: 'secondary.main',
                      borderBottomWidth: 1
                    }}
                    aria-hidden="true"
                    className="w-[375px]"
                  />
                </ThemeProvider>
              </div>
            ))}
          </ul>
        ) : (
          <p>삭제할 직원이 없습니다.</p>
        )}
      </div>
    </>
  );
};

export default DeleteEmployee;
