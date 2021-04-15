import React, {useCallback, useContext, useMemo} from "react";

import Section from "component/section";
import DataSetRoutes from "./dataset.routes";
import DatasetContextProvider, {DatasetContext} from "./dataset.context";
import FileArea from "component/file-area";
import {csvJSON} from "utils";
import Nav from "component/nav";
import Dropdown from "component/dropdown";

function DataHOC() {
  const [state, dispatch] = useContext(DatasetContext);

  return (
    <>
      <DatasetControls dispatch={dispatch}/>
      <DataSetRoutes/>
      <DatasetAdditionalInfo main_species={state.main_species} dispatch={dispatch}/>
    </>
  );
}

function Dataset() {
  return (
    <DatasetContextProvider>
      <DataHOC/>
    </DatasetContextProvider>
  );
}

function DatasetAdditionalInfo({main_species, dispatch}) {
  const items = useMemo(() => main_species.map(key => ({
    title: key,
    value: "main_species"
  })), [main_species]);

  const onDataSetFilter = useCallback($event => {
    dispatch({
      type: "DATASET/FILTER",
      payload: $event.target.value,
    });
  }, [dispatch]);

  return (
    !!main_species.length &&
    <Section direction="row">
        <Dropdown label="main_species" items={items} onChange={onDataSetFilter}/>
    </Section>
  );
}

function DatasetControls({dispatch}) {
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
