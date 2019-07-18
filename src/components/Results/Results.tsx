import React, { useContext } from "react";
import PieChart from "../PieChart/PieChart";
import HeatMap from "../HeatMap/HeatMap";
import RadarChart from "../RadarChart/RadarChart";
import LineGraphData from "../LineGraph/LineGraph";
import AppContext from "../../context/context";
import styles from "./index.module.scss";
import Title from "../Title/Title";
import Figures from "../Figures/Figures";
import SubTitle from "../SubTitle/SubTitle";

const Results: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);
  return (
    <div>
      <Title />
      <Figures title="Totals" totals={state.totals} />
      <Figures title="Averages" totals={state.averages} />
      <div className={`${styles.chart_container} ${styles.heat_map_container}`}>
        <SubTitle subTitle="Heat Map" />
        <HeatMap data={state.heatMapData} />
      </div>
      <div className={styles.chart_container}>
        <SubTitle subTitle="Pie Chart" />
        <PieChart data={state.pieChartData} />
      </div>
      <div className={styles.chart_container}>
        <RadarChart data={state.radarData} people={state.people} />
      </div>
      <div className={styles.chart_container}>
        <LineGraphData data={state.lineGraphData} />
      </div>
      <div className={styles.chart_container}>
        <LineGraphData data={state.lineGraphDataHours} />
      </div>
    </div>
  );
};

export default Results;
