import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as Icon from 'react-feather';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  makeStyles
} from '@material-ui/core';


import gerReq from 'src/apiCall/get'

// import GoogleMapReact from 'google-map-react';
const { compose, withProps } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  Polygon
} = require("react-google-maps");
const { DrawingManager } = require("react-google-maps/lib/components/drawing/DrawingManager");


const Map = () => {

  const [q, setQ] = useState("")
  const [searchData, setSearchData] = useState([])

  useEffect(() => {
    console.log("state updated")
  }, [searchData])

  const searchHandle = async () => {
    try {
      console.log("q---->>", q)
      let data = await gerReq(`/openstreet?q=${q}`)
      console.log("data-->>", data)

      let pasrseREs = JSON.parse(data.data)
      // console.log("pasrseREs-->>", pasrseREs[0])
      // console.log("data.data[0].geojson-->>", pasrseREs[0].geojson)
      // console.log("pasrseREs[0].geojson.coordinate-->>", pasrseREs[0].geojson.coordinates)


      let finalRes = pasrseREs.map(i => {
        if (i.geojson) {
          console.log("geojson found")
          console.log("i.geojson.coordinates-->>", i.geojson.coordinates)
          if (i.geojson.type == "Polygon") {
            let res = i.geojson.coordinates[0].map(item => {
              // console.log("item-->>", item)
              return { lat: item[1], lng: item[0] }
            }
            )
            // console.log("res--->>", {
            //   display_name: i.display_name,
            //   type: i.type,
            //   coords: res
            // })
            return {
              display_name: i.display_name,
              type: i.type,
              coords: res
            }
          }

        }
        else {
          console.log("geo json not found...")
        }
      })

      let newRes = []
      for (let i of finalRes) {
        if (i) {
          if (i.type == "administrative") {//for city
            newRes.push(i)
          }
        }

      }
      console.log("newRes->>", newRes)
      setSearchData(newRes)
    } catch (error) {

    }
  }

  return (
    <div>
      <TextField onChange={(event) => setQ(event.target.value)} ></TextField >
      <Button onClick={searchHandle}>search</Button>
      <GoogleMap
        defaultZoom={10}
        defaultCenter={searchData.length > 0
          ? searchData[0].coords[0] : { lat: 12.9038424, lng: 77.4601025 }}
      >
        <Marker position={searchData.length > 0
          ? searchData[0].coords[0] : { lat: 12.9038424, lng: 77.4601025 }} />

        {searchData.length > 0 ?
          searchData.map((i) => {
            // console.log("iii-->>", i)
            return <Polygon
              path={i.coords}
              // path={reversedCoords}
              key={i.display_name}
              options={{
                fillColor: "#e02a2a",
                fillOpacity: 0.4,
                strokeColor: "#000",
                strokeOpacity: 1,
                strokeWeight: 1
              }}
              onClick={() => {
                console.log("ahmet")
              }}
            ></Polygon>

          }) : <Polygon
            path={[{ lat: 12.9038424, lng: 77.4601025 }]}
            // path={reversedCoords}
            key={1}
            options={{
              fillColor: "#e02a2a",
              fillOpacity: 0.4,
              strokeColor: "#000",
              strokeOpacity: 1,
              strokeWeight: 1
            }}
            onClick={() => {
              console.log("ahmet")
            }}
          ></Polygon>
        }

      </GoogleMap>
    </div >
  )
}



const MapViewWrapped = withScriptjs(withGoogleMap(Map))

const MapView = () => {
  return (
    <div>
      <MapViewWrapped
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${"AIzaSyDR53bbBnWKEKiuRB7Tbs4YsF8sVp-HCgU"}`}
        loadingElement={<div style={{ height: `80%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  )
}
export default MapView;
