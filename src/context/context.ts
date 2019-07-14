import React from "react";
import { IMessageData, IPieChart, IHeatMapChart } from "../utils/parseChat";
import reducer from "./reducer";

export interface AppStateInterface {
  messagesData: IMessageData | [];
  pieChartData: IPieChart | [],
  heatMapData: IHeatMapChart | []
}
export const initialState: AppStateInterface = {
  messagesData: [],
  pieChartData: [],
  heatMapData: []
};

const AppContext = React.createContext({ state: initialState, dispatch: null });

export const AppProvider = AppContext.Provider;
export const AppConsumer = AppContext.Consumer;
export default AppContext;
