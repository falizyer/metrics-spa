import React from "react";
import {NavLink, Redirect, withRouter} from "react-router-dom";

import styled from "styled-components";
import LimitedBlock from "./limited-block";

const NavComponent = styled.nav`
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.palette.secondary.main};
`;

const NavUlComponent = styled.ul`
  display: flex;
  flex-direction: row;
  list-style: none;
`;

const NavLiComponent = styled.li`
  margin: 0 5px;
  a {
    text-decoration: none;
    padding: 10px 20px;
    color: #CCC;
  }

  a.active {
    color: #FFF;
  }
`;

function Nav(props) {
  return (
    props.location.pathname.startsWith("/dataset/") &&
    <NavComponent>
        <LimitedBlock>
            <NavUlComponent>
                <NavLiComponent><NavLink to="/dataset/histogram">Histogram</NavLink></NavLiComponent>
                <NavLiComponent><NavLink to="/dataset/map">Map</NavLink></NavLiComponent>
            </NavUlComponent>
        </LimitedBlock>
    </NavComponent>
  );
}

export default withRouter(Nav);
