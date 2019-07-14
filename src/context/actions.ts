import {
  IMessageData,
  IPieChart,
  IHeatMapChart,
  IRadarChart,
  ILineGraphData
} from "../utils/parseChat";

export const SET_MESSAGES_DATA = "SET_MESSAGES_DATA";
export const SET_PIECHART_DATA = "SET_PIECHART_DATA";
export const SET_HEATMAP_DATA = "SET_HEATMAP_DATA";
export const SET_RADAR_DATA = "SET_RADAR_DATA";
export const SET_LINE_GRAPH_DATA = "SET_LINE_GRAPH_DATA";
export const SET_LINE_GRAPH_DATA_HOURS = "SET_LINE_GRAPH_DATA_HOURS";

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

export const setRadarData = (data: IRadarChart[], people: string[]) => {
  return {
    type: SET_RADAR_DATA,
    payload: { radarData: data, people }
  };
};

export const setLineGraphData = (data: ILineGraphData[]) => {
  return {
    type: SET_LINE_GRAPH_DATA,
    payload: { lineGraphData: data }
  };
};

export const setLineGraphDataHours = (data: ILineGraphData[]) => {
  return {
    type: SET_LINE_GRAPH_DATA_HOURS,
    payload: { lineGraphDataHours: data }
  };
};