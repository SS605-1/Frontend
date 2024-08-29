import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';
import { ReactComponent as Logo } from '../../assets/app/logo.svg';
import Button from '../../components/Button.js';
import { useNavigate } from 'react-router-dom';

const NewStore = () => {
  const token = localStorage.getItem('token');
  const inputRef = useRef(null); // input을 참조하는 useRef
  const [isKakaoLoaded, setIsKakaoLoaded] = useState(false);
  const [places, setPlaces] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    const storeName = inputRef.current.value; // 버튼 클릭 시 input의 값을 가져옴
    console.log('입력된 초대 코드:', storeName);
    if (isKakaoLoaded) {
      const kakao = window.kakao;
      const placeService = new kakao.maps.services.Places(); // 새 장소검색 서비스 생성
      placeService.keywordSearch(storeName, (data, status) => {
        if (status === kakao.maps.services.Status.OK) {
          // 카카오 맵이 잘 로드 됐으면
          setPlaces(data);
          console.log(places);
          setIsModalOpen(true);
        } else {
          console.log('키워드 서치 실패 : ', status);
        }
      });
    }
  };

  const handleClose = () => {
    // 모달에서 닫기 버튼 클릭하면 모달 닫힘
    setIsModalOpen(false);
  };

  const handleOutsideClick = (e) => {
    // 모달 밖을 클릭하면 모달 꺼짐
    if (e.target.id === 'modal-container') {
      handleClose();
    }
  };

  const handleItemClick = async (place) => {
    // 클릭시 가게 이름, 지번 주소, 도로명 주소 백으로 보내고 페이지 이동
    // axios를 통해 서버로 POST 요청 보내기

    try {
      console.log(
        place.place_name,
        place.road_address_name,
        place.address_name
      );
      const res = await axios.post(
        `${process.env.REACT_APP_REST_API_URL}/store/register`,
        {
          storeName: place.place_name,
          streetAddress: place.road_address_name,
          lotNumberAddress: place.address_name
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      );
      navigate('/HomePage', { state: { response: res.data } });
    } catch (error) {
      console.error('StoreRegister error!!', error);
    }
  };

  const renderPlaceList = (data) => {
    if (data.length === 0) return <Typography>No results found</Typography>;
    return (
      <List>
        {data.map((place) => (
          <ListItem
            key={place.id}
            button
            onClick={() => handleItemClick(place)}
          >
            <ListItemText
              primary={place.place_name}
              secondary={
                <>
                  <Typography component="span">
                    {place.road_address_name || place.address_name}
                  </Typography>
                  {place.phone && (
                    <Typography component="span">{place.phone}</Typography>
                  )}
                </>
              }
            />
          </ListItem>
        ))}
      </List>
    );
  };

  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
      setIsKakaoLoaded(true);
    } else {
      console.error('Kakao maps library is not available.');
    }
  }, []); // 렌더링 직후 단 한번, 카카오 라이브러리 로딩이 잘 되었는지 확인

  return (
    <div className="flex flex-col w-full y-full gap-y-[100px]">
      <div className="flex justify-start">
        <Logo className="w-[180px] h-[157px]" />
      </div>
      <div className="flex flex-col items-center gap-y-[98px]">
        <span className="text-black font-bold text-2xl flex flex-col justify-center w-[375px] h-8">
          등록할 점포 정보를 입력해주세요.
        </span>
        <div className="flex flex-col gap-y-[61px] w-full y-full items-center">
          <div className="flex w-full h-[55px] justify-center items-center gap-x-[19px]">
            <span className="text-black font-bold text-2xl">점포 이름</span>
            <input
              type="text"
              className="rounded-[20px] bg-wink-gray w-[188px] h-full text-center"
              ref={inputRef}
            />
          </div>
          <Button
            variant="contained"
            disableElevation
            sx={{ width: 220, height: 47, borderRadius: 7.5 }}
            color="primary"
            className="text-white font-bold text-xl"
            onClick={handleSubmit}
          >
            확인
          </Button>
        </div>
      </div>

      {/* 모달 조건 렌더링 */}
      {isModalOpen && (
        <div
          id="modal-container"
          onClick={handleOutsideClick}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        >
          <Box
            sx={{
              width: '70%',
              maxHeight: '80vh',
              overflowY: 'auto',
              bgcolor: 'background.paper',
              borderRadius: 1,
              boxShadow: 24,
              p: 2,
              position: 'relative',
              margin: 'auto',
              top: '10%'
            }}
          >
            <Typography variant="h6" component="h2">
              검색 결과
            </Typography>
            {renderPlaceList(places)}
            <Button
              variant="contained"
              color="secondary"
              onClick={handleClose}
              sx={{ borderRadius: 4 }}
              className="text-sm text-white"
            >
              닫기
            </Button>
          </Box>
        </div>
      )}
    </div>
  );
};

export default NewStore;
