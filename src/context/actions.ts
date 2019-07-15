import { AppStateInterface } from "./context";

export const ADD_DATA = "ADD_DATA";

export const setAllData = (data: AppStateInterface) => {
  return {
    type: ADD_DATA,
    payload: {
      messagesData: data.messagesData,
      pieChartData: data.pieChartData,
      heatMapData: data.heatMapData,
      radarData: data.radarData,
      people: data.people,
      lineGraphData: data.lineGraphData,
      lineGraphDataHours: data.lineGraphDataHours,
      totals: data.totals,
      averages: data.averages
    }
  };
};
