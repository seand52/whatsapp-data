import React, { useContext } from "react";
import PieChart from "../PieChart/PieChart";
import HeatMap from "../HeatMap/HeatMap";
import RadarChart from "../RadarChart/RadarChart";
import LineGraphData from "../LineGraph/LineGraph";
import { withRouter, RouteComponentProps } from "react-router-dom";
import AppContext from "../../context/context";
import styles from "./index.module.scss";
import Title from "../Title/Title";
import Figures from "../Figures/Figures";
import SubTitle from "../SubTitle/SubTitle";
import Swal from 'sweetalert2'

const Results: React.FC = (props: any) => {
  const { state } = useContext(AppContext);
  debugger;
  if (!state.messagesData.length) {
    Swal.fire({
      title: 'All the data displayed will be destroyed',
      text: "You will be redirected to the home page",
      type: 'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'OK!'
    }).then((result) => {
      if (result.value) {
        props.history.push("/");
      }
    })
    return null
  } else {
    return (
      <div>
        <Title
          groupName={state.groupName}
          startDate={state.messagesData[0].date}
          endDate={state.messagesData[state.messagesData.length - 1].date}
        />
        <Figures title="Totals" totals={state.totals} />
        <Figures title="Averages" totals={state.averages} />
        <div
          className={`${styles.chart_container} ${styles.heat_map_container}`}
        >
          <SubTitle subTitle="Messages Heat Map" />
          <HeatMap data={state.heatMapData} />
        </div>
        <div className={styles.chart_group_one}>
          <div className={styles.chart_container}>
            <SubTitle subTitle="Group Member Activity" />
            <PieChart data={state.pieChartData} />
          </div>
          <div className={styles.chart_container}>
            <SubTitle subTitle="Activity by Day of the Week" />
            <RadarChart data={state.radarData} people={state.people} />
          </div>
        </div>
        <div className={styles.chart_group_two}>
          <div className={styles.chart_container}>
            <SubTitle subTitle="Message count by Month" />
            <LineGraphData legend="Month" data={state.lineGraphData} />
          </div>
          <div className={styles.chart_container}>
            <SubTitle subTitle="Message count by Time of the Day" />
            <LineGraphData legend="Time" data={state.lineGraphDataHours} />
          </div>
        </div>
      </div>
    );
  }
};

export default withRouter(Results);
