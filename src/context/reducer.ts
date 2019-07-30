import { AppStateInterface } from "./context";
import * as Actions from "../context/actions";

export default function reducer(state: AppStateInterface, action: any) {
  if (!action) {
    return {...state}}
  switch (action.type) {
    case Actions.ADD_DATA:
      return {
        ...state,
        messagesData: action.payload.messagesData,
        pieChartData: action.payload.pieChartData,
        heatMapData: action.payload.heatMapData,
        radarData: action.payload.radarData,
        people: action.payload.people,
        years: action.payload.years,
        currentYear: action.payload.currentYear,
        lineGraphData: action.payload.lineGraphData,
        lineGraphDataHours: action.payload.lineGraphDataHours,
        totals: action.payload.totals,
        averages: action.payload.averages,
        groupName: action.payload.groupName
      };
    case Actions.SET_ERROR:
      return {
        ...state,
        error: "error"
      };
    case Actions.CLEAR_ERROR:
      return {
        ...state,
        error: null
      };
    case Actions.ADD_HEATMAP_DATA:
      return {
        ...state,
        heatMapData: action.payload.heatMapData
      };
    case Actions.ADD_LINE_GRAPH_MONTHS_DATA:
      return {
        ...state,
        lineGraphData: action.payload.lineGraphData
      };
    case Actions.ADD_LINE_GRAPH_HOURS_DATA:
      return {
        ...state,
        lineGraphDataHours: action.payload.lineGraphDataHours
      };
      case Actions.SET_CURRENT_YEAR:
        return {
          ...state,
          currentYear: action.payload.currentYear
        }
    default:
      return state;
  }
}
