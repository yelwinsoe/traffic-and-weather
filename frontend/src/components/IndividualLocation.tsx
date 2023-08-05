interface GeoProps {
  BUILDINGNAME: string
  ROAD: string
}

interface LatLongProps {
  latitude: number
  longitude: number
}

interface ImageMetadataProps {
  height: number
  width: number
}

export interface IndividualLocatonProps {
  geo: GeoProps
  timestamp: string
  location: LatLongProps
  image: string
  image_metadata: ImageMetadataProps
}

interface Props {
  loc: IndividualLocatonProps
}

const IndividualLocation = ({loc}: Props) => {
  if (loc.geo.ROAD !== 'NIL') {
    return <p className="mb-0">
        <strong className='fs-5'>{loc.geo.ROAD}</strong>
        {!['10', 'null'].includes(loc.geo.BUILDINGNAME) && <>
          <br />
          <small>{loc.geo.BUILDINGNAME}</small>
        </>}
        <br />
        <small>{loc.location.latitude}, {loc.location.longitude}</small>
      </p>
  } else if (!['10', 'null'].includes(loc.geo.BUILDINGNAME)) {
    return <p className="mb-0">
        <strong className='fs-5'>{loc.geo.BUILDINGNAME}</strong><br />
        <small>{loc.location.latitude}, {loc.location.longitude}</small>
      </p>
  } else {
    return <p className="mb-0"></p>
  }
}

export default IndividualLocation