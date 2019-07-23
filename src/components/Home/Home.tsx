import React, { useContext, useState } from "react";
import { withRouter } from "react-router-dom";
import { PacmanLoader } from "react-spinners";
import backgroundImage from "../../assets/background.jpg";
import { setAllData } from "../../context/actions";
import AppContext from "../../context/context";
import { IMessageData, Parser } from "../../utils/parseChat";
import styles from "./index.module.scss";
import Swal from "sweetalert2";
import { demoData } from "../../utils/demoData";

const Home: React.FC = (props: any) => {
  const { dispatch } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const onHandleInput = (event: any) => {
    setLoading(true);
    const reader = new FileReader();
    const file = event.target.files[0];
    let messages: IMessageData[] = [];
    reader.onload = function(event) {
      try {
        if (event.target !== null && reader.result !== null) {
          if (typeof reader.result === "string") {
            reader.result
              .split("\n")
              .forEach(item => messages.push(Parser.formatLine(item)));
          }
        }
        calculateData(messages);
        setLoading(false);
        props.history.push("/results");
      } catch (err) {
        setLoading(false);
        Swal.fire({
          title: "Sorry, there was a problem loading your data!",
          text: "Make sure the file you are uploading is of the correct format",
          type: "error",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK!"
        }).then(result => {
          if (result.value) {
            props.history.push("/");
          }
        });
      }
    };
    reader.readAsText(file);
  };

  const calculateData = (messages: IMessageData[]) => {
    try {
      const pieChartData = Parser.getPieChartData(messages);
      const heatMapData = Parser.getHeapMapData(messages);
      const { radarData, people } = Parser.getRadarData(messages);
      const lineGraphDataMonths = Parser.getLineGraphDataMonths(
        messages,
        people
      );
      const lineGraphDataHours = Parser.getLineGraphDataHour(messages, people);
      const totals = Parser.getTotals(messages);
      const averages = Parser.getAverages(totals);
      dispatch(
        setAllData({
          messagesData: messages.filter(item => item !== undefined),
          pieChartData,
          heatMapData,
          radarData,
          people,
          lineGraphData: lineGraphDataMonths,
          lineGraphDataHours,
          totals,
          averages,
          groupName: messages[0].name
        })
      );
    } catch (err) {
      Swal.fire({
        title: "Sorry, there was a problem loading your data!",
        text: "Make sure the file you are uploading is of the correct format",
        type: "error",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK!"
      }).then(result => {
        if (result.value) {
          props.history.push("/");
        }
      });
    }
  };

  const setDemoData = () => {
    setLoading(true)
    calculateData(demoData);
    setLoading(false)
    props.history.push("/results");
  };
  console.log(loading)
  if (loading) {
    return (
      <div className={styles.loading_home}>
        <div className={styles.loader_container}>
          <PacmanLoader size={100} color="#37D7B7" loading={loading} />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.home}>
      <div className={styles.left}>
        <img src={backgroundImage} />
      </div>
      <div className={styles.right}>
        <h2>Analyse your whatsapp group chats with awesome graphs!</h2>
        <p className={styles.input_description}>
          Upload your <span>Whatsapp</span> chat log here
        </p>
        <div className={styles.options}>
          <input
            onChange={onHandleInput}
            type="file"
            id="file"
            className={styles.file__input}
          />
          <label htmlFor="file">Choose a file</label>
          <button onClick={setDemoData} className={styles.demo_data_btn}>
            View Demo Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Home);
