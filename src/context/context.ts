import React from "react";
import { IMessageData, IPieChart, IHeatMapChart, IRadarChart, ILineGraphData } from "../utils/parseChat";


export interface AppStateInterface {
  messagesData: IMessageData | [];
  pieChartData: IPieChart | [],
  heatMapData: IHeatMapChart | [],
  radarData: IRadarChart | [],
  people: string[] | [],
  lineGraphData: ILineGraphData | [],
  lineGraphDataHours: ILineGraphData | []
}
export const initialState: AppStateInterface = {
  messagesData: [],
  pieChartData: [],
  heatMapData: [],
  radarData: [],
  people: [],
  lineGraphData: [],
  lineGraphDataHours: [],
};

const AppContext = React.createContext({ state: initialState, dispatch: null });

export const AppProvider = AppContext.Provider;
export const AppConsumer = AppContext.Consumer;
export default AppContext;
