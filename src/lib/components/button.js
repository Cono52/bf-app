import styled from "styled-components";

const Button = styled.button`
  background: linear-gradient(-500deg, var(--dark-purple), var(--light-purple));
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
      var(--light-purple),
      var(--light-purple)
    );
  }
  &:active {
    background: linear-gradient(
      -500deg,
      var(--dark-purple),
      var(--dark-purple)
    );
  }
`;

export default Button;
