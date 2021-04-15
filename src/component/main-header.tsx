import React from "react";
import styled from "styled-components";

const MainHeaderComponent = styled.header`
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.palette.primary.main};
`;

function MainHeader({children}) {
  return <MainHeaderComponent>{children}</MainHeaderComponent>;
}

export default MainHeader;
