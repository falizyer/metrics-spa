import React, {createContext, useReducer} from "react";

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
};

export const DatasetContext = createContext<[{dataset: DatasetMap[], filter: {}}, any]>([defaultValue, () => void 0]);

function DatasetReducer(state, action) {
  switch (action.type) {
    case "DATASET/LOAD":
      return {
        ...state,
        dataset: action.payload,
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

  return (
    <DatasetContext.Provider value={[state, dispatch]}>
      {children}
    </DatasetContext.Provider>
  );
}

export default DatasetContextProvider;
