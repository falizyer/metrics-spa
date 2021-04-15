import React from "react";
import {Switch, Redirect, withRouter} from "react-router-dom";

import ErrorBoundaryRoute from "component/error-boundary-route";
import Dataset from "view/dataset";

const AppRoutes = (props) => {
  if (props.location.pathname === "/") {
    return <Redirect to="/dataset"/>;
  }

  return (
    <Switch>
      <ErrorBoundaryRoute path="/dataset" component={Dataset}/>
    </Switch>
  );
};

export default withRouter(AppRoutes);
