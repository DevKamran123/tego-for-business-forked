import styled from 'styled-components';
import { DatePicker as AntDatePicker } from 'antd';

export const StyledDatePicker = styled(AntDatePicker)`
  &.ant-picker {
    // Your custom styles here
    width: 100%;
    border: 2.2px solid #3E4095;
    border-radius: 2.93px;
    
    .ant-picker-suffix {
      display: none;
    }
    
    input {
      font-size: 14px;
      color: #333;
      outline: none;
    }
  }
`;