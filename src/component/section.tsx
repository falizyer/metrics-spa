import React from "react";
import styled from "styled-components";

const SectionComponent = styled.section<any>`
  display: flex;
  flex-direction: ${props => props.direction || "column"};
  justify-content: ${props => props.justify || "space-between"};
  max-width: 1280px;
  margin: 0 auto;
  width: 100%;
  padding: ${props => props.theme.spacing.padding};
`;

function Section({children, direction}: any) {
  return <SectionComponent direction={direction}>{children}</SectionComponent>;
}

export default Section;
