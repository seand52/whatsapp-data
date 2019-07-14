import { IMessageData, IPieChart, IHeatMapChart } from "../utils/parseChat";

export const SET_MESSAGES_DATA = "SET_MESSAGES_DATA";
export const SET_PIECHART_DATA = "SET_PIECHART_DATA";
export const SET_HEATMAP_DATA = "SET_HEATMAP_DATA";

export const setMessageData = (messagesData: IMessageData[]) => {
  return {
    type: SET_MESSAGES_DATA,
    payload: { messagesData: messagesData }
  };
};

export const setPieChartData = (data: IPieChart[]) => {
  return {
    type: SET_PIECHART_DATA,
    payload: { pieChartData: data }
  };
};

export const setHeatMapData = (data: IHeatMapChart[]) => {
  return {
    type: SET_HEATMAP_DATA,
    payload: { heatMapData: data }
  };
};