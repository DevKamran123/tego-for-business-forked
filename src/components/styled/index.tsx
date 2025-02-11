import { Checkbox, Input } from "antd";
import styled from "styled-components";

export const TPassword = styled(Input.Password)`
  padding: 15px;
  border-radius: 0;
  border: 1px solid #a6a6a6;
  background: rgba(255, 255, 255, 0.5) !important;
  color: #373737;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  height: 50px;

  &:focus,
  &:active,
  &:focus-within,
  &:hover {
    border-color: #a6a6a6;
    box-shadow: none !important;
  }

  &:-webkit-autofill {
    background: rgba(255, 255, 255) !important;
    -webkit-box-shadow: 0 0 0px 1000px #ffffff inset !important;
    -webkit-text-fill-color: #373737 !important;
  }
  &::placeholder {
    color: #a6a6a6 !important;
  }
`;

export const TInput = styled(Input)`
  padding: 15px;
  border-radius: 0;
  border: 1px solid #a6a6a6;
  background: rgba(255, 255, 255, 0.5) !important;
  color: #373737;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  height: 50px;
  font-family: "Plus Jakarta Sans", sans-serif;

  &:focus,
  &:active,
  &:focus-within,
  &:hover {
    border-color: #a6a6a6;
    box-shadow: none !important;
  }

  &:-webkit-autofill {
    background: rgba(255, 255, 255) !important;
    -webkit-box-shadow: 0 0 0px 1000px #ffffff inset !important;
    -webkit-text-fill-color: #373737 !important;
  }
  &::placeholder {
    color: #dbdbdb !important;
  }

  .ant-input-group-addon {
    background-color: transparent !important;
    padding: 0 !important;
    border: none !important;
    padding-right: 10px !important;
    border-right: 1px solid #a6a6a6 !important;
  }
  input {
    padding: 0 !important;
    padding-left: 10px !important;
    border: none !important;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    &:focus,
    &:active,
    &:focus-within,
    &:hover {
      border-color: #373737;
      box-shadow: none !important;
    }
    &:-webkit-autofill {
      background: rgba(255, 255, 255) !important;
      -webkit-box-shadow: 0 0 0px 1000px #ffffff inset !important;
      -webkit-text-fill-color: #373737 !important;
    }
    &::placeholder {
      color: #dbdbdb !important;
    }
  }
`;

export const TInputLabel = styled.label`
  color: #a6a6a6;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-bottom: 10px;
  display: inline-block;
`;

export const TCheckbox = styled(Checkbox)`
  font-family: "Plus Jakarta Sans", sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 20.16px;
  letter-spacing: 0%;

  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: #AF2E2F !important;
    border-color: #AF2E2F !important;
    &:hover,
    &:focus,
    &:focus-within {
      border-color: #AF2E2F !important;
      background-color: #AF2E2F !important;
    }
  }
  .ant-checkbox {
    align-self: center!important;
    margin-top: 1px;
    border-color: #AF2E2F !important;
  }
  .ant-checkbox-wrapper: .ant-checkbox.ant-wave-target .ant-checkbox-inner,
  .ant-checkbox:hover.ant-wave-target .ant-checkbox-inner,
  .ant-checkbox-input:focus + .ant-checkbox-inner,
  .ant-checkbox-wrapper:not(.ant-checkbox-wrapper-disabled):hover
    .ant-checkbox-inner,
  .ant-checkbox:not(.ant-checkbox-disabled):hover .ant-checkbox-inner {
    border-color: #AF2E2F !important;
  }
  label.ant-checkbox-wrapper {
    align-items: center !important;
    display: flex;
  }
`;
