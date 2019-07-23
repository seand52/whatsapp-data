import React from 'react'
import styles from './index.module.scss'
import { ITotals, IAverages } from '../../context/context';


interface Props {
  totals: ITotals | IAverages | {}
  title: string
}

export default function Figures({totals, title}: Props) {
  debugger
  return (
    <section className={styles.figures}>
      <h2 className={styles.figures__title}>{title}</h2>
      <div className={styles.figures_container}>
        {Object.keys(totals).map((item, index) => {
          return (
            <div className={styles.figures_item} key={index}>
              <h3>
                {totals[item].identifier}
              </h3>
              <p>{totals[item].value}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
