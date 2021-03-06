import React from "react";
import { ResponsiveCalendar } from "@nivo/calendar";
import styles from "./index.module.scss";
import { IHeatMapChart } from "../../utils/parseChat";

interface IProps {
  data: IHeatMapChart[];
}

export default function HeatMap({ data }: IProps) {
  if (data.length) {
    return (
      // <div className={styles.heat_map_container}>
        <ResponsiveCalendar
          data={data}
          from={data && data[0].day}
          to={data[data.length - 1].day}
          emptyColor="#eeeeee"
          colors={["#61cdbb", "#97e3d5", "#e8c1a0", "#f47560"]}
          margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
          yearSpacing={40}
          monthBorderColor="#ffffff"
          dayBorderWidth={2}
          dayBorderColor="#ffffff"
          legends={[
            {
              anchor: "bottom-right",
              direction: "row",
              translateY: 36,
              itemCount: 4,
              itemWidth: 42,
              itemHeight: 36,
              itemsSpacing: 14,
              itemDirection: "right-to-left"
            }
          ]}
        />
      // </div>
    );
  }
  return null;
}
