import React, {useContext} from "react";
import ReactMapboxGl, {Layer, Feature} from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import Section from "component/section";

import {DatasetContext} from "view/dataset.context";

import {filterDataset} from "utils";

const ReactMap = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAP_ACCESS_TOKEN,
});

function Map() {
  const [state, dispatch] = useContext(DatasetContext);
  const dataset = filterDataset(state.dataset, state.filter);

  return (
    <Section>
      <ReactMap
        style="mapbox://styles/mapbox/dark-v9"
        center={[+dataset[0].longitude, +dataset[0].latitude]}
        containerStyle={{
          height: "calc(100vh - 400px)",
          width: "calc(100% - 40px)",
        }}
      >
        <Layer type="circle"
               id="marker"
               paint={{
                 "circle-color": "#ff5200",
                 "circle-stroke-width": 1,
                 "circle-stroke-color": "#fff",
                 "circle-stroke-opacity": 1
               }}>
          {dataset.map((datum) => {
            return (
              <Feature key={datum.standid} coordinates={[+datum.longitude, +datum.latitude]}/>
            );
          })}
        </Layer>
      </ReactMap>
    </Section>
  );
}

export default Map;
