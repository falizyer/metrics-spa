import React, {useContext, useEffect, useMemo, useState} from "react";
import ReactMapboxGl, {Layer, Feature, Popup} from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import Section from "component/section";

import {DatasetContext} from "view/dataset.context";

import {filterDataset} from "utils";

const ReactMap = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAP_ACCESS_TOKEN,
});

function Map() {
  const [state, dispatch] = useContext(DatasetContext);
  const _dataset = filterDataset(state.dataset, state.filter);
  const [selected, setSelected] = useState(null);
  const center = useMemo<[number, number]>(() => [+_dataset[0].longitude, +_dataset[0].latitude], [state.filter]);
  const dataset = useMemo(() => _dataset, [state.filter]);

  return (
    <Section>
      <ReactMap
        style="mapbox://styles/mapbox/dark-v9"
        center={center}
        containerStyle={{
          height: "calc(100vh - 400px)",
          width: "calc(100% - 40px)",
        }}
      >
        <Layer type="symbol" id="marker" layout={{"icon-image": "marker-15"}}>
          {dataset.map((datum) => {
            return (
              <Feature key={datum.standid} coordinates={[+datum.longitude, +datum.latitude]}
                       onClick={($event: any) => setSelected(datum)}/>
            );
          })}
        </Layer>

        {selected &&
        <Popup
            coordinates={[+selected.longitude, +selected.latitude]}
            onClick={() => setSelected(null)}
            anchor="top">
            <ul>
                <li>
                    <label>Unique ID of the stand</label>
                    <div>{selected.standid}</div>
                </li>
                <li>
                    <label>Eastern longitude of stand location</label>
                    <div>{selected.longitude}</div>
                </li>
                <li>
                    <label>Northern latitude of stand location</label>
                    <div>{selected.latitude}</div>
                </li>
                <li>
                    <label>Predominant tree species</label>
                    <div>{selected.latitude}</div>
                </li>
                <li>
                    <label>Relative wood volume</label>
                    <div>{selected.vol_m3_per_ha}</div>
                </li>
                <li>
                    <label>Average age of trees</label>
                    <div>{selected.age_years}</div>
                </li>
                <li>
                    <label>Size of forest stand in hectares</label>
                    <div>{selected.size_in_ha}</div>
                </li>
            </ul>
        </Popup>}
      </ReactMap>
    </Section>
  );
}

export default Map;
