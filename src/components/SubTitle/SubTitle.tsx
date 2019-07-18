import React from 'react'
import styles from './index.module.scss'

interface Props {
  subTitle: string
}

export default function SubTitle({subTitle}: Props) {
  return (
    <h2 className={styles.sub_title}>
      {subTitle}
    </h2>
  )
}
