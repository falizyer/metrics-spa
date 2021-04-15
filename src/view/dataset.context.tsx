import React, {createContext, useMemo, useReducer} from "react";
import {groupBy} from "lodash";

export interface DatasetMap {
  standid: string;
  longitude: string;
  latitude: string;
  main_species: string;
  vol_m3_per_ha: string;
  age_years: string;
  size_in_ha: string;
}

const defaultValue = {
  dataset: [],
  filter: {},
  map_center: [0, 0],
  map_data: [],
  main_species: [],
};

export const DatasetContext = createContext<[{ dataset: DatasetMap[], filter: {}, map_center: [number, number], map_data: any[], main_species: string[] }, any]>([defaultValue as any, () => void 0]);

function DatasetReducer(state, action) {
  switch (action.type) {
    case "DATASET/LOAD":
      return {
        ...state,
        dataset: action.payload,
        map_center: [+action.payload[0].longitude, +action.payload[0].latitude],
        map_data: action.payload.map(payload => {
          return {
            ...payload,
            coordinates: [+payload.longitude, +payload.latitude]
          }
        }),
        main_species: Object.keys(groupBy(action.payload, "main_species"))
          .filter(key => key !== "undefined")
      };
    case "DATASET/FILTER":
      if (action.payload.title === "Any") {
        return {
          ...state,
          filter: {},
        }
      }

      return {
        ...state,
        filter: {
          [action.payload.value]: action.payload.title,
        },
      };
  }
  return state;
}

function DatasetContextProvider({children}) {
  const [state, dispatch] = useReducer(DatasetReducer, defaultValue);
  const value = useMemo<any>(() => [state, dispatch], [state]);


  return (
    <DatasetContext.Provider value={value}>
      {children}
    </DatasetContext.Provider>
  );
}

export default DatasetContextProvider;
