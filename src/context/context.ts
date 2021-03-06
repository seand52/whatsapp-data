import React from "react";
import {
  IMessageData,
  IPieChart,
  IHeatMapChart,
  IRadarChart,
  ILineGraphData
} from "../utils/parseChat";

interface Total {
  value: number;
  identifier: string;
}

export interface ITotals {
  totalDays: Total;
  totalMessages: Total;
  totalWords: Total;
  totalCharacters: Total;
}

export interface IAverages {
  averageWordsPerMessage: Total;
  averageLettersPerMessage: Total;
  averageMessagesPerDay: Total;
  averageLettersPerDay: Total;
}

export interface AppStateInterface {
  messagesData: IMessageData[] | [];
  pieChartData: IPieChart[] | [];
  heatMapData: IHeatMapChart[] | [];
  radarData: IRadarChart[] | [];
  people: string[] | [];
  years: [number | 'ALL'] | [];
  currentYear: number | 'ALL' | null
  lineGraphData: ILineGraphData[] | [];
  lineGraphDataHours: ILineGraphData[] | [];
  totals: ITotals | {};
  averages: IAverages | {};
  groupName: string | null;
  error: string | null;
}
export const initialState: AppStateInterface = {
  messagesData: [],
  pieChartData: [],
  heatMapData: [],
  radarData: [],
  people: [],
  years: [],
  currentYear: null,
  lineGraphData: [],
  lineGraphDataHours: [],
  averages: {},
  totals: {},
  groupName: null,
  error: null
};

const AppContext = React.createContext({ state: initialState, dispatch: null });

export const AppProvider = AppContext.Provider;
export const AppConsumer = AppContext.Consumer;
export default AppContext;
