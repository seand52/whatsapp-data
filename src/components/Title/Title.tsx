import React from 'react'
import styles from './index.module.scss'

interface Props {
  startDate: string
  endDate: string
  groupName:string
}
export default function Title({startDate, endDate, groupName}: Props) {
  return (
    <div className={styles.title}>
      <h1>WHATSAPP CHAT - {groupName}</h1>
      <p>from {startDate} until {endDate}</p>
    </div>
  )
}
