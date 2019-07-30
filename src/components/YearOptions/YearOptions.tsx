import React from "react";
import styles from "./index.module.scss";
import { GraphType } from "../Results/Results";

interface Props {
  years: any[];
  currentYear: number | "ALL";
  onChangeYear: (year: number | "ALL") => void;
}
export default function YearOptions({
  years,
  currentYear,
  onChangeYear
}: Props) {

  return (
    <ul className={styles.years_list}>
      {years.length > 1
        ? years.map((item, index) => {
            return (
              <li
                onClick={() => onChangeYear(item)}
                className={
                  currentYear == item
                    ? styles["year_item__active"]
                    : styles["year_item"]
                }
                key={index}
              >
                {item}
              </li>
            );
          })
        : null}
    </ul>
  );
}
