import React, { useContext, useState } from "react";
import { withRouter } from "react-router-dom";
import Swal from "sweetalert2";
import { setAllData } from "../../context/actions";
import AppContext from "../../context/context";
import Figures from "../Figures/Figures";
import HeatMap from "../HeatMap/HeatMap";
import LineGraphData from "../LineGraph/LineGraph";
import PieChart from "../PieChart/PieChart";
import RadarChart from "../RadarChart/RadarChart";
import SubTitle from "../SubTitle/SubTitle";
import Title from "../Title/Title";
import styles from "./index.module.scss";
import YearOptions from "../YearOptions/YearOptions";
import { PacmanLoader } from "react-spinners";

export type GraphType = "HEAT MAP" | "LINE GRAPH MONTHS" | "LINE GRAPH HOURS";

const Results: React.FC = (props: any) => {
  const { state, dispatch } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const getNewYearData = (selectedYear: number | "ALL"): void => {
    setLoading(true);
    setTimeout(function() {
      dispatch(setAllData(state.messagesData, dispatch, selectedYear));
      setLoading(false);
    }, 0);
  };
  if (!state.messagesData.length) {
    Swal.fire({
      title: "All the data displayed will be destroyed",
      text: "You will be redirected to the home page",
      type: "warning",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "OK!"
    }).then(result => {
      if (result.value) {
        props.history.push("/");
      }
    });
    return null;
  } else {
    return (
      <div className={styles.results_container}>
        <div className={styles.left}>
          <YearOptions
            currentYear={state.currentYear}
            onChangeYear={getNewYearData}
            years={state.years}
          />
        </div>
        <div className={styles.right}>
          {!loading ? (
            <React.Fragment>
              <Title
                groupName={state.groupName}
                startDate={state.messagesData[0].date}
                endDate={state.messagesData[state.messagesData.length - 1].date}
              />
              <Figures title="Totals" totals={state.totals} />
              <Figures title="Averages" totals={state.averages} />
              <div
                style={{
                  width: "100%",
                  height: `${state.currentYear && state.currentYear === 'ALL' ? state.years.length * 200: '200'}px`,
                  marginBottom: "50px"
                }}
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
                  <LineGraphData
                    legend="Time"
                    data={state.lineGraphDataHours}
                  />
                </div>
              </div>
            </React.Fragment>
          ) : (
            <div className={styles.loading_home}>
              <div className={styles.loader_container}>
                <PacmanLoader size={100} color="#37D7B7" loading={loading} />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
};

export default withRouter(Results);
