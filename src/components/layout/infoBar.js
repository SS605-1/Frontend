import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

InfoBar.propTypes = {
  name: PropTypes.string.isRequired
};

export default function InfoBar({ name }) {
  return (
    <Box
      className="w-full border-b border-wink-gray"
      sx={{
        position: 'relative',
        top: 0,
        maxWidth: '375px',
        width: '100%'
      }}
    >
      <AppBar
        position="static"
        sx={{ backgroundColor: '#ffffff', width: '100%' }}
        elevation={0}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'center' }}>
          <Typography
            sx={{ fontSize: 20, flexGrow: 1, textAlign: 'center' }}
            noWrap
            component="div"
            className="font-bold text-black"
          >
            {name}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
