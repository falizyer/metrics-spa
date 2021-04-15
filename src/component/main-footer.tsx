import React from "react";
import styled from "styled-components";

const MainHeaderComponent = styled.footer`
  display: flex;
  flex-direction: column;
  margin-top: auto;
  background-color: ${props => props.theme.palette.secondary.main};
`;

function MainFooter({children}) {
  return <MainHeaderComponent>{children}</MainHeaderComponent>;
}

export default MainFooter;
