import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import PropTypes from 'prop-types';
import { ReactComponent as BackIcon } from '../../assets/app/back.svg';
import { useNavigate } from 'react-router-dom';

Header.propTypes = {
  title: PropTypes.string.isRequired
};

export default function Header({ title }) {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // 이전 화면으로 이동
  };

  return (
    <Box
      className="w-full border-b border-wink-gray"
      sx={{
        position: 'relative',
        top: 0,
        maxWidth: '375px',
        maxHeight: '53px',
        width: '100%'
      }}
    >
      <AppBar
        position="static"
        sx={{ backgroundColor: '#ffffff', width: '100%' }}
        elevation={0}
      >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'center',
            position: 'relative'
          }}
        >
          <IconButton
            size="large"
            edge="start"
            color="main"
            aria-label="menu"
            sx={{ position: 'absolute', left: '20px' }} // left 값을 조정하여 아이콘 위치 미세 조정
            onClick={goBack}
          >
            <BackIcon />
          </IconButton>
          <Typography
            sx={{
              fontSize: 20,
              textAlign: 'center',
              fontWeight: 'bold',
              color: 'black'
            }}
            noWrap
            component="div"
          >
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
