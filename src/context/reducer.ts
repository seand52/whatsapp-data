import { AppStateInterface } from "./context";
import * as Actions from "../context/actions";

export default function reducer(state: AppStateInterface, action: any) {
  switch (action.type) {
    case Actions.ADD_DATA:
      return {
        ...state,
        messagesData: action.payload.messagesData,
        pieChartData: action.payload.pieChartData,
        heatMapData: action.payload.heatMapData,
        radarData: action.payload.radarData,
        people: action.payload.people,
        lineGraphData: action.payload.lineGraphData,
        lineGraphDataHours: action.payload.lineGraphDataHours,
        totals: action.payload.totals,
        averages: action.payload.averages,
        groupName: action.payload.groupName
      };
    default:
      return state;
  }
}
