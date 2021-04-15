import React from "react";
import styled from "styled-components";

const LimitedBlockComponent = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1280px;
  margin: 0 auto;
  width: 100%;
  padding: ${props => props.theme.spacing.padding};
`;

function LimitedBlock({children}) {
  return <LimitedBlockComponent>{children}</LimitedBlockComponent>;
}

export default LimitedBlock;
