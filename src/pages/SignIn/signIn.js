import React from 'react';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '../../components/Button.js';

const SignIn = () => {
  const [value, setValue] = React.useState('');

  const handleChange = (event) => {
    const newValue = event.target.value;
    setValue(newValue);
  };

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex  justify-start">
        <Logo className="w-[180px] h-[157px]" />
      </div>

      <div className="flex flex-col justify-between items-center gap-y-20">
        <Box
          sx={{ border: 3, borderRadius: 2.5, width: 273, height: 122 }}
          className="flex justify-center items-center font-semibold "
        >
          자신의 직급을 선택해주세요.
        </Box>
        <FormControl className="pt-[40px]">
          <FormLabel id="demo-controlled-radio-buttons-group" />
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={value}
            onChange={handleChange}
          >
            <FormControlLabel value="사장" control={<Radio />} label="사장" />
            <FormControlLabel value="직원" control={<Radio />} label="직원" />
          </RadioGroup>
        </FormControl>

        <Button
          variant="contained"
          disableElevation
          sx={{ width: 146, height: 47, borderRadius: 7.5 }}
          color="primary"
          className="text-white font-semibold text-xl"
        >
          확인
        </Button>
      </div>
    </div>
  );
};

export default SignIn;
