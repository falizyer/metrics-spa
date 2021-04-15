import React, {useCallback, useContext} from "react";
import {groupBy} from "lodash";

import Section from "component/section";
import DataSetRoutes from "./dataset.routes";
import DatasetContextProvider, {DatasetContext} from "./dataset.context";
import FileArea from "../component/file-area";
import {csvJSON} from "utils";
import Nav from "../component/nav";
import Dropdown from "../component/dropdown";

function Dataset() {
  return (
    <DatasetContextProvider>
      <DatasetControls/>
      <DataSetRoutes/>
      <DatasetAdditionalInfo/>
    </DatasetContextProvider>
  );
}

function DatasetAdditionalInfo() {
  const [state, dispatch] = useContext(DatasetContext);

  const items = Object.keys(groupBy(state.dataset, "main_species"))
    .filter(key => key !== "undefined")
    .map(key => ({title: key, value: "main_species"}));

  const onDataSetFilter = useCallback($event => {
    dispatch({
      type: "DATASET/FILTER",
      payload: $event.target.value,
    });
  }, [dispatch]);

  return (
    !!state.dataset.length &&
    <Section direction="row">
        <Dropdown label="main_species" items={items} onChange={onDataSetFilter}/>
    </Section>
  );
}

function DatasetControls() {
  const [state, dispatch] = useContext(DatasetContext);

  const onDataSetLoad = useCallback(async $event => {
    dispatch({
      type: "DATASET/LOAD",
      payload: csvJSON(await $event.target.value[0].text()),
    });
  }, [dispatch]);

  return (
    <>
      <Nav/>

      <Section direction="row">
        <FileArea onChange={onDataSetLoad}/>
      </Section>
    </>
  );
}

export default Dataset;
