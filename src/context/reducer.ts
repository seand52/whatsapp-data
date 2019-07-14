import { AppStateInterface } from "./context";
import * as Actions from "../context/actions";

export default function reducer(state: AppStateInterface, action: any) {
  switch (action.type) {
    case Actions.SET_MESSAGES_DATA:
      return { ...state, messagesData: action.payload.messagesData };
    case Actions.SET_PIECHART_DATA:
      return { ...state, pieChartData: action.payload.pieChartData };
    case Actions.SET_HEATMAP_DATA:
      return { ...state, heatMapData: action.payload.heatMapData };
    case Actions.SET_RADAR_DATA:
      return {
        ...state,
        radarData: action.payload.radarData,
        people: action.payload.people
      };
    case Actions.SET_LINE_GRAPH_DATA:
      return {
        ...state,
        lineGraphData: action.payload.lineGraphData
      };
      case Actions.SET_LINE_GRAPH_DATA_HOURS:
      return {
        ...state,
        lineGraphDataHours: action.payload.lineGraphDataHours
      };
    default:
      return state;
  }
}
