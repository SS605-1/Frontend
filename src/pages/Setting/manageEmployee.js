import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/layout/header';
import Footer from '../../components/layout/footer';
import axios from 'axios';
import Button from '../../components/Button';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../style/theme';
import Divider from '@mui/material/Divider';

const ManageEmployee = () => {
  const [employees, setEmployees] = useState([]);
  const token = localStorage.getItem('token');
  const title = '직원 관리';
  const storeId = localStorage.getItem('storeId');
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();

  const handleButtonClick = () => {
    // 모든 직원의 id와 nickname을 배열 형태로 만듦
    const employeeData = employees.map((employee) => ({
      employeeId: employee.id,
      employeeNickname: employee.nickname
    }));

    // /DeleteEmployee로 navigate하면서 모든 직원 정보를 state로 넘김
    navigate('/DeleteEmployee', { state: { employees: employeeData } });
  };

  const handleKeyPress = async (event, employeeId) => {
    if (event.key === 'Enter') {
      console.log('Enter key was pressed. Input value:', inputValue);
      try {
        const salaryRes = await axios({
          method: 'POST',
          url: `${process.env.REACT_APP_REST_API_URL}/store/salary?employeeId=${employeeId}&salary=${inputValue}&storeId=${storeId}`,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        });
        console.log(salaryRes);
      } catch (error) {
        console.error('월급 업데이트 오류:', error.message);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 직원 목록 가져오기
        const res = await axios({
          method: 'GET',
          url: `${process.env.REACT_APP_REST_API_URL}/store/user/accounts?storeId=${storeId}`,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        });

        console.log('응답 데이터:', res.data);

        let responseData;
        try {
          responseData =
            typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
        } catch (parseError) {
          console.error('JSON 파싱 오류:', parseError.message);
          return;
        }

        // 직원 정보 배열로 변환 및 저장
        if (Array.isArray(responseData)) {
          const fetchedEmployees = responseData.map((user) => ({
            id: user.id,
            nickname: user.nickname,
            prevSalary: null, // 초기값 설정
            currentSalary: null // 초기값 설정
          }));
          setEmployees(fetchedEmployees);

          // 월급 정보 가져오기
          try {
            const getSalaryRes = await axios({
              method: 'GET',
              url: `${process.env.REACT_APP_REST_API_URL}/salary/calculate?storeId=${storeId}`,
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
              }
            });
            console.log('월급 데이터:', getSalaryRes.data);

            // 월급 데이터와 직원 데이터 매칭
            const updatedEmployees = fetchedEmployees.map((employee) => {
              const salaryData = getSalaryRes.data.find(
                (salary) => salary.employeeId === employee.id
              );
              return {
                ...employee,
                prevSalary: salaryData ? salaryData.prevSalary : 'N/A',
                currentSalary: salaryData ? salaryData.currentSalary : 'N/A'
              };
            });

            setEmployees(updatedEmployees);
          } catch (error) {
            console.log('월급 가져오기 오류!', error.message);
          }
        } else {
          console.error('응답 데이터가 배열이 아닙니다:', responseData);
        }
      } catch (error) {
        console.error('Fetch 오류!', error.message, error.response?.data);
      }
    };

    fetchData();
  }, [token, storeId]);

  return (
    <>
      <Header title={title} />
      <div className="flex pt-[23px]">
        <ul>
          {employees.map((employee) => (
            <>
              <div>
                <li
                  key={employee.id}
                  className="flex justify-center space-x-[15px]"
                >
                  <div className="flex items-center font-bold text-xl">
                    {employee.nickname}
                  </div>
                  <div className="flex flex-col items-center">
                    <p className="font-normal text-sm">전월 월급</p>
                    <p>{employee.prevSalary}</p>
                  </div>
                  <div className="flex flex-col">
                    <p className="font-normal text-sm">오늘까지 당월 월급</p>
                    <p>{employee.currentSalary}</p>
                  </div>
                  <div className="flex flex-col justify-items-center">
                    <p className="font-normal text-sm">기본급(시급)</p>
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={(e) => handleKeyPress(e, employee.id)}
                      className="flex justify-center items-center border-[1px] text-sm rounded-[20px] border-black w-[66px] h-[19px] text-center"
                    />
                  </div>
                </li>
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
            </>
          ))}
        </ul>
      </div>
      <ThemeProvider theme={theme}>
        <Button
          color="secondary"
          className="w-[151px] h-[26px] font-normal text-sm absolute bottom-[90px] right-[36px]"
          onClick={handleButtonClick}
        >
          직원 편집하기
        </Button>
      </ThemeProvider>
      <Footer />
    </>
  );
};

export default ManageEmployee;
