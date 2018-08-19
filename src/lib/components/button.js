import styled from "styled-components";
import theme from "../theme";

const Button = styled.button`
  background: linear-gradient(
    -500deg,
    ${theme.colors.darkPurple},
    ${theme.colors.lightPurple}
  );
  text-decoration: none;
  outline: none;
  border: none;
  height: 3em;
  padding: 0 2em;
  color: white;
  border-radius: 2px;
  &:hover {
    background: linear-gradient(
      -500deg,
      ${theme.colors.lightPurple},
      ${theme.colors.lightPurple}
    );
  }
  &:active {
    background: linear-gradient(
      -500deg,
      ${theme.colors.darkPurple},
      ${theme.colors.darkPurple}
    );
  }
`;

export default Button;
