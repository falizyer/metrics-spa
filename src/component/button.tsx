import React from "react";
import styled from "styled-components";

const ButtonComponent = styled.button`
  
`;

function Button({children}) {
  return <ButtonComponent>{children}</ButtonComponent>;
}

export default Button;
