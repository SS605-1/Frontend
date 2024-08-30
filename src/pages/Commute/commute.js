import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '../../components/Button';
import Box from '@mui/material/Box';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../style/theme';
import axios from 'axios';

const Commute = () => {
  const location = useLocation();
  const [message, setMessage] = useState(null); // 상태 추가
  const [userCoords, setUserCoords] = useState(null); // 사용자 위치 상태 추가
  const [shopCoords, setShopCoords] = useState(null); // 가게 위치 상태 추가
  const shop = location.state.shopName;
  localStorage.setItem('shopName', shop);
  const token = localStorage.getItem('token');
  const address = location.state.shopAddress;
  const storeId = localStorage.getItem('storeId');
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const date = String(today.getDate()).padStart(2, '0');
  const hours = String(today.getHours()).padStart(2, '0');
  const minutes = String(today.getMinutes()).padStart(2, '0');
  const seconds = String(today.getSeconds()).padStart(2, '0');
  const milliseconds = String(today.getMilliseconds()).padStart(3, '0');

  const currentTime = `${year}-${month}-${date}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;

  console.log(currentTime);

  // 거리 계산 함수 (사용자의 위치와 가게의 위치 사이의 거리 계산)
  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3; // 지구 반지름 (미터)
    const phi1 = (lat1 * Math.PI) / 180; // φ1 -> phi1
    const phi2 = (lat2 * Math.PI) / 180; // φ2 -> phi2
    const deltaPhi = ((lat2 - lat1) * Math.PI) / 180; // Δφ -> deltaPhi
    const deltaLambda = ((lon2 - lon1) * Math.PI) / 180; // Δλ -> deltaLambda

    const a =
      Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
      Math.cos(phi1) *
        Math.cos(phi2) *
        Math.sin(deltaLambda / 2) *
        Math.sin(deltaLambda / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // 미터 단위 거리 반환
  };

  const handleGoToWorkClick = async () => {
    if (!userCoords || !shopCoords) return;

    const distance = getDistance(
      userCoords.latitude,
      userCoords.longitude,
      shopCoords.lat,
      shopCoords.lng
    );

    if (distance <= 100) {
      try {
        await axios.post(
          `${process.env.REACT_APP_REST_API_URL}/schedule/actual`,
          {
            storeId: storeId,
            actualWorkDTO: {
              startDateTime: currentTime,
              endDateTime: currentTime
            }
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        );

        setMessage('출근에 성공하셨습니다!');
        setTimeout(() => {
          setMessage(null);
        }, 3000);
      } catch (error) {
        console.error('gotowork error!!', error.message);
      }
    } else {
      setMessage('출근지 근처로 이동해주세요!');
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }
  };

  const handleLeaveWorkClick = async () => {
    if (!userCoords || !shopCoords) return;

    const distance = getDistance(
      userCoords.latitude,
      userCoords.longitude,
      shopCoords.lat,
      shopCoords.lng
    );

    if (distance <= 100) {
      try {
        await axios.patch(
          `${process.env.REACT_APP_REST_API_URL}/schedule/actual`,
          {
            storeId: storeId,
            actualWorkDTO: {
              startDateTime: null,
              endDateTime: currentTime
            }
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        );

        setMessage('퇴근에 성공하셨습니다!');
        setTimeout(() => {
          setMessage(null);
        }, 3000);
      } catch (error) {
        console.error('gotowork error!!', error.message);
      }
    } else {
      setMessage('출근지 근처로 이동해주세요!');
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }
  };

  useEffect(() => {
    const kakao = window.kakao;
    if (!kakao || !kakao.maps) {
      console.error('KaKao Maps API is not loaded');
      return;
    }
    const mapContainer = document.getElementById('map');
    if (!mapContainer) {
      console.error('Map container is not found');
      return;
    }

    const mapOption = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3
    };
    const map = new kakao.maps.Map(mapContainer, mapOption);

    const geocoder = new kakao.maps.services.Geocoder();
    geocoder.addressSearch(address, function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
        const marker = new kakao.maps.Marker({
          map: map,
          position: coords
        });

        const infowindow = new kakao.maps.InfoWindow({
          content: `<div style="width:150px;text-align:center;padding:6px 0;">${shop}</div>`
        });
        infowindow.open(map, marker);
        map.setCenter(coords);

        // 가게 위치를 상태로 저장
        setShopCoords({ lat: result[0].y, lng: result[0].x });
      }
    });

    // 사용자 위치 가져오기
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserCoords({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      },
      (error) => {
        console.error('Error getting user location', error);
      }
    );
  }, []);

  return (
    <div className="flex flex-col justify-center">
      {message && (
        <div className="bg-green-500 text-white p-3 rounded-lg shadow-lg mb-3">
          {message}
        </div>
      )}

      <div className="flex flex-col justify-center h-[127px]">
        <span className="font-bold text-black text-2xl">{shop}</span>
        <span className="font-light text-black text-[15px]">{address}</span>
      </div>
      <div id="map" className="w-[375px] h-[433px]"></div>

      <div className="flex justify-center items-center gap-x-[33px] h-[55px]">
        <Button
          variant="contained"
          disableElevation
          sx={{ width: 146, height: 36, borderRadius: 7.5 }}
          color="primary"
          className="text-white font-bold text-xl"
          onClick={handleGoToWorkClick}
        >
          출근
        </Button>
        <Button
          variant="contained"
          disableElevation
          sx={{ width: 146, height: 36, borderRadius: 7.5 }}
          color="secondary"
          className="text-white font-bold text-xl"
          onClick={handleLeaveWorkClick}
        >
          퇴근
        </Button>
      </div>

      <ThemeProvider theme={theme}>
        <Box
          sx={{
            width: 375,
            height: 72,
            bgcolor: 'primary.main'
          }}
          className="flex flex-col justify-center"
        >
          <p className="font-normal text-[16px] text-white">이번 달 월급은</p>

          <p className="font-bold text-[16px] text-white flex justify-center gap-x-1">
            _________원
            <span className="font-normal text-[16px] text-white">입니다.</span>
          </p>
        </Box>
      </ThemeProvider>
    </div>
  );
};

export default Commute;
