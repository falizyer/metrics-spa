import React from "react";
import {NavLink} from "react-router-dom";

import MainHeader from "component/main-header";
import MainFooter from "component/main-footer";
import Section from "component/section";

import AppRoutes from "./app.routes";

function App() {
  return (
    <>
      <MainHeader>
        <Section>
          <NavLink to="/" style={{textDecoration: "none", color: "#000"}}><h1>Test App</h1></NavLink>
        </Section>
      </MainHeader>

      <AppRoutes/>

      <MainFooter>
        <Section>
        </Section>
      </MainFooter>
    </>
  );
}

export default App;
