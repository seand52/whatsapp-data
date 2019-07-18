import React from 'react'
import styles from './index.module.scss'

interface ITotals {
  totalCharacters: number
  totalDays: number
  totalMessages: number
  totalWords: number
}

interface Props {
  totals: ITotals | {}
  title: string
}
export default function Figures({totals, title}: Props) {
  return (
    <section className={styles.figures}>
      <h2>{title}</h2>
      <div className={styles.figures_container}>
        {Object.keys(totals).map((item, index) => {
          return (
            <div className={styles.figures_item} key={index}>
              <h3>
                {item}
              </h3>
              <p>{totals[item]}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
