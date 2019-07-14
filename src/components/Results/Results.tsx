import React, { useContext } from "react";
import PieChart from "../PieChart/PieChart";
import HeatMap from "../HeatMap/HeatMap";
import AppContext from "../../context/context";
import styles from "./index.module.scss";

const Results: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);
  return (
    <div>
      <h1>Results</h1>
      <div className={styles.pie_chart_container}>
        <PieChart data={state.pieChartData} />
      </div>
      <div className={styles.heat_map_container}>
        <HeatMap data={state.heatMapData} />
      </div>
    </div>
  );
};

export default Results;
