import React from 'react'

import {
  Image
} from 'react-bootstrap'
import IndividualLocation, { IndividualLocatonProps } from './IndividualLocation'

interface Props {
  loc: IndividualLocatonProps
}

const TrafficCamImage = ({ loc }: Props) => {
  return <div style={{ width: '100%' }}>
    <IndividualLocation loc={loc} />
    <Image fluid src={loc.image} width="100%" height="auto" className='mt-2' alt={loc?.geo?.ROAD} />
  </div>
}

export default TrafficCamImage