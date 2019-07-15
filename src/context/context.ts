import React from "react";
import {
  IMessageData,
  IPieChart,
  IHeatMapChart,
  IRadarChart,
  ILineGraphData
} from "../utils/parseChat";

interface ITotals {
  totalDays: number
  totalMessages: number;
  totalWords: number;
  totalCharacters: number;
}

interface IAverages {
  averageWordsPerMessage: string
  averageLettersPerMessage: string
  averageMessagesPerDay: string
  averageLettersPerDay: string
}

export interface AppStateInterface {
  messagesData: IMessageData[] | [];
  pieChartData: IPieChart[] | [];
  heatMapData: IHeatMapChart[] | [];
  radarData: IRadarChart[] | [];
  people: string[] | [];
  lineGraphData: ILineGraphData[] | [];
  lineGraphDataHours: ILineGraphData[] | [];
  totals: ITotals | {};
  averages: IAverages | {};
}
export const initialState: AppStateInterface = {
  messagesData: [],
  pieChartData: [],
  heatMapData: [],
  radarData: [],
  people: [],
  lineGraphData: [],
  lineGraphDataHours: [],
  averages: {},
  totals: {}
};

const AppContext = React.createContext({ state: initialState, dispatch: null });

export const AppProvider = AppContext.Provider;
export const AppConsumer = AppContext.Consumer;
export default AppContext;
