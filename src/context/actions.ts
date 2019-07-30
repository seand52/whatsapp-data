import { AppStateInterface } from "./context";
import {
  IMessageData,
  Parser,
  IHeatMapChart,
  ILineGraphData
} from "../utils/parseChat";
import { GraphType } from "../components/Results/Results";

export const ADD_DATA = "ADD_DATA";

export const ADD_HEATMAP_DATA = "ADD_HEATMAP_DATA";
export const ADD_LINE_GRAPH_MONTHS_DATA = "ADD_LINE_GRAPH_MONTHS_DATA";
export const ADD_LINE_GRAPH_HOURS_DATA = "ADD_LINE_GRAPH_HOURS_DATA";

export const SET_CURRENT_YEAR = "SET_CURRENT_YEAR";

export const SET_ERROR = "SET_ERROR";
export const CLEAR_ERROR = "CLEAR_ERROR";

const setError = () => {
  return {
    type: SET_ERROR
  };
};

export const clearError = () => {
  return {
    type: CLEAR_ERROR
  };
};

const setCurrentYear = (currentYear: number | 'ALL') => {
  return {
    type: SET_CURRENT_YEAR,
    payload: {
      currentYear
    }
  };
};
const setHeatMapData = (heatMapData: IHeatMapChart[]) => {
  return {
    type: ADD_HEATMAP_DATA,
    payload: {
      heatMapData
    }
  };
};

const setLineGraphMonthsData = (lineGraphData: ILineGraphData[]) => {
  return {
    type: ADD_LINE_GRAPH_MONTHS_DATA,
    payload: {
      lineGraphData
    }
  };
};

const setLineGraphHoursData = (lineGraphDataHours: ILineGraphData[]) => {
  return {
    type: ADD_LINE_GRAPH_HOURS_DATA,
    payload: {
      lineGraphDataHours
    }
  };
};

export const setAllData = (
  messages: IMessageData[],
  dispatch: any,
  currentYear: number | 'ALL',
) => {
  try {
    let filteredMessages;
    if (currentYear !== 'ALL' && currentYear) {
      filteredMessages = messages.filter(item => item && item.year === currentYear.toString())
      
    }
    const pieChartData = Parser.getPieChartData(filteredMessages || messages);
    const heatMapData = Parser.getHeapMapData(filteredMessages || messages);
    const { people, years } = Parser.getGroupParticpants(messages);
    const radarData = Parser.getRadarData(filteredMessages || messages, people);
    const lineGraphDataMonths = Parser.getLineGraphDataMonths(
      filteredMessages || messages,
      people
    );
    const lineGraphDataHours = Parser.getLineGraphDataHour(
      filteredMessages || messages,
      people
    );
    const totals = Parser.getTotals(filteredMessages || messages);
    const averages = Parser.getAverages(totals);
    dispatch({
      type: ADD_DATA,
      payload: {
        messagesData: messages.filter(item => item !== undefined),
        pieChartData,
        heatMapData,
        radarData,
        people,
        years: years.length === 1 ? ['ALL'] :  [...years.map(item => parseInt(item)), 'ALL'],
        currentYear: currentYear,
        lineGraphData: lineGraphDataMonths,
        lineGraphDataHours,
        totals,
        averages,
        groupName: messages[0].name,
        error: null
      }
    });
  } catch (err) {
    dispatch(setError());
  }
};


