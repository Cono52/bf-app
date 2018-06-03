import styled from 'styled-components';

const Button = styled.button`
  background: linear-gradient(-500deg, #423669, #bb29bb);
  text-decoration: none;
  outline: none;
  border: none;
  height: 3em;
  padding: 0 2em;
  color: white;
  border-radius: 2px;
  &:hover {
    background: #c703c7;
  }
  &:active {
    background: #6c0081;
  }
`;

export default Button;
