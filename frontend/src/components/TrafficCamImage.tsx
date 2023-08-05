import React from 'react'

import {
  Image
} from 'react-bootstrap'
import { IndividualLocatonProps } from './IndividualLocation'

interface Props {
  loc: IndividualLocatonProps
}

const TrafficCamImage = ({ loc }: Props) => {
  console.log(loc)
  return <div style={{ width: '100%' }}>
    <Image fluid src={loc.image} width="100%" height="auto" alt='Lakeside' />
  </div>
}

export default TrafficCamImage