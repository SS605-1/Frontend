import React from 'react';
import Button from '@mui/material/Button';
import { ThemeProvider } from '@mui/material/styles';
import Theme from '../style/theme.js';
import PropTypes from 'prop-types';

const CustomButton = ({
  children,
  variant = 'contained',
  disableElevation = true,
  sx = { width: 146, height: 47, borderRadius: 7.5 },
  color = 'primary',
  className = 'text-white font-semibold text-xl',
  onClick,
  ...props
}) => {
  return (
    <ThemeProvider theme={Theme}>
      <Button
        variant={variant}
        disableElevation={disableElevation}
        sx={sx}
        color={color}
        className={className}
        onClick={onClick}
        {...props}
      >
        {children}
      </Button>
    </ThemeProvider>
  );
};

CustomButton.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.string,
  disableElevation: PropTypes.bool,
  sx: PropTypes.object,
  color: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func
};

export default CustomButton;
