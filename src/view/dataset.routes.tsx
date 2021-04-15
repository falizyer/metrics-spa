import React, {useContext} from "react";
import {Switch, Redirect, withRouter} from "react-router-dom";

import ErrorBoundaryRoute from "component/error-boundary-route";

// Child Views
import Map from "view/dataset/map";
import Histogram from "view/dataset/histogram";
import {DatasetContext} from "./dataset.context";

const DataSetRoutes = (props) => {
  const [state, dispatch] = useContext(DatasetContext);

  if (!state.dataset.length) {
    return <Redirect to="/dataset"/>;
  } else if (!props.location.pathname.startsWith("/dataset/")) {
    return <Redirect to="/dataset/histogram"/>;
  }

  return (
    <Switch>
      <ErrorBoundaryRoute path="/dataset/histogram" component={Histogram} exact/>
      <ErrorBoundaryRoute path="/dataset/map" component={Map} exact/>
    </Switch>
  );
};

export default withRouter(DataSetRoutes);
