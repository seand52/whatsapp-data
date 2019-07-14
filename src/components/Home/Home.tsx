import React, {useContext} from "react";
import styles from "./index.module.scss";
import { Parser, IMessageData } from "../../utils/parseChat";
import AppContext from "../../context/context";
import { setMessageData, setPieChartData, setHeatMapData } from "../../context/actions";
import { withRouter, RouteComponentProps } from "react-router-dom";


const Home: React.FC = (props: any) => {
  const {dispatch} = useContext(AppContext)

  const onHandleInput = (event: any) => {
    const reader = new FileReader();
    const file = event.target.files[0];
    let messages: IMessageData[] = []
    reader.onload = function(event) {
      if (event.target !== null && reader.result !== null) {
        if (typeof reader.result === "string") {
          reader.result
            .split("\n")
            .forEach(item => messages.push(Parser.formatLine(item)));
        }
      }
      const pieChartData = Parser.getPieChartData(messages)
      const heatMapData = Parser.getHeapMapData(messages)
      dispatch(setMessageData(messages))
      dispatch(setPieChartData(pieChartData))
      dispatch(setHeatMapData(heatMapData))
      props.history.push('/results')
    };
    reader.readAsText(file);
  };

  return (
    <div className={styles.home}>
      <div>
        Upload your whatsapp chat log to view interesting statistics! Don't
        worry, all the data is parsed and processed on the client side and
        nothing is stored in a database.
      </div>
      <input
        onChange={onHandleInput}
        type="file"
        name="file"
        className={styles.file__input}
      />
      <label htmlFor="file">Choose a file</label>
    </div>
  );
};

export default withRouter(Home);
