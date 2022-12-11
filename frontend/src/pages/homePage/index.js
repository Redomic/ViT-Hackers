import React, { useState, useEffect } from "react";
import ReactMaps, {
  GeolocateControl,
  Marker,
  Popup,
  Source,
  Layer,
} from "react-map-gl";
import { axiosUser } from "../../axiosInstance";

import "./styles.css";
import Buttons from "./Buttons";

import mapboxgl from "mapbox-gl";
/* eslint-disable import/no-webpack-loader-syntax, import/no-unresolved */
mapboxgl.workerClass =
  require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;
/* eslint-enable import/no-webpack-loader-syntax, import/no-unresolved */

const Home = () => {
  const [userLocation, setUserLocation] = useState();
  const [hoveredMarker, setHoveredMarker] = useState();
  const [allZones, setAllZones] = useState();
  const [viewport, setViewport] = useState({
    latitude: 50.450001,
    longitude: 30.523333,
    zoom: 10,
  });

  const geolocateControlStyle = {
    right: 10,
    top: 10,
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
        });
        // setViewport({
        //   longitude: position.coords.longitude,
        //   latitude: position.coords.latitude,
        //   zoom: 14,
        // });
      },
      () => {
        alert("Please allow location access in order to mark zones");
      }
    );

    axiosUser
      .get("get/markers")
      .then((res) => {
        console.log(res.data);
        setAllZones(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    console.log(userLocation);
  }, [userLocation]);

  return (
    <div className="home-container">
      <ReactMaps
        {...viewport}
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onMove={(e) => {
          setViewport(e.viewState);
        }}
        mapStyle="mapbox://styles/jonesxdd/clbifzuyd004q14mzxv6ovw4u"
      >
        <GeolocateControl
          style={geolocateControlStyle}
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
          auto
        />
        {userLocation ? (
          <Marker
            latitude={50.450001}
            longitude={30.523333}
            // latitude={userLocation.latitude}
            // longitude={userLocation.longitude}

            // latitude={viewport.latitude}
            // longitude={viewport.longitude}

            offsetLeft={-24}
            offsetTop={-24}
          >
            <img
              src="https://img.icons8.com/emoji/48/null/person-walking.png"
              style={{ pointerEvents: "none" }}
            />
          </Marker>
        ) : null}
        {allZones ? (
          <>
            {allZones.safe.map((zone) => {
              const date = new Date(zone.made_on);
              return (
                <React.Fragment key={zone.made_on}>
                  <Marker
                    latitude={zone.st_y}
                    longitude={zone.st_x}
                    offsetLeft={-24}
                    offsetTop={-24}
                  >
                    <div
                      className="circular-marker"
                      style={{ backgroundColor: "rgba(0, 250, 0, 0.7)" }}
                      onMouseEnter={() => {
                        setHoveredMarker(zone);
                      }}
                      onMouseLeave={() => {
                        setHoveredMarker();
                      }}
                    ></div>
                  </Marker>
                  {hoveredMarker == zone ? (
                    <Popup
                      longitude={hoveredMarker.st_x}
                      latitude={hoveredMarker.st_y}
                      offsetTop={-50}
                      closeButton={false}
                    >
                      <p>
                        <b>Made on:</b>{" "}
                        {date.toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
                        <br />
                        <b>By:</b> {hoveredMarker.user_id}
                        <br />
                        <b>Marked:</b> Safe
                        <br />
                      </p>
                    </Popup>
                  ) : null}
                </React.Fragment>
              );
            })}
            {allZones.danger.map((zone) => {
              const date = new Date(zone.made_on);
              return (
                <React.Fragment key={zone.made_on}>
                  <Marker
                    latitude={zone.st_y}
                    longitude={zone.st_x}
                    offsetLeft={-24}
                    offsetTop={-24}
                  >
                    <div
                      className="circular-marker"
                      style={{ backgroundColor: "rgba(250, 0, 0, 0.7)" }}
                      onMouseEnter={() => {
                        setHoveredMarker(zone);
                      }}
                      onMouseLeave={() => {
                        setHoveredMarker();
                      }}
                    ></div>
                  </Marker>
                  {hoveredMarker == zone ? (
                    <Popup
                      longitude={hoveredMarker.st_x}
                      latitude={hoveredMarker.st_y}
                      offsetTop={-60}
                      closeButton={false}
                    >
                      <p>
                        <b>Made on:</b>{" "}
                        {date.toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
                        <br />
                        <b>By:</b> {hoveredMarker.user_id}
                        <br />
                        <b>Marked:</b> Danger
                        <br />
                      </p>
                    </Popup>
                  ) : null}
                </React.Fragment>
              );
            })}
            {allZones.supplies.map((zone) => {
              const date = new Date(zone.made_on);
              return (
                <React.Fragment key={zone.made_on}>
                  <Marker
                    latitude={zone.st_y}
                    longitude={zone.st_x}
                    offsetLeft={-24}
                    offsetTop={-24}
                  >
                    <div
                      className="circular-marker"
                      style={{ backgroundColor: "rgba(255, 165, 0, 0.7)" }}
                      onMouseEnter={() => {
                        setHoveredMarker(zone);
                      }}
                      onMouseLeave={() => {
                        setHoveredMarker();
                      }}
                    ></div>
                  </Marker>
                  {hoveredMarker == zone ? (
                    <Popup
                      longitude={hoveredMarker.st_x}
                      latitude={hoveredMarker.st_y}
                      offsetTop={-60}
                      closeButton={false}
                    >
                      <p>
                        <b>Made on:</b>{" "}
                        {date.toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
                        <br />
                        <b>By:</b> {hoveredMarker.user_id}
                        <br />
                        <b>Marked:</b> {hoveredMarker.supplies_type}
                        <br />
                      </p>
                    </Popup>
                  ) : null}
                </React.Fragment>
              );
            })}
          </>
        ) : null}
      </ReactMaps>
      <div className="top-left">
        {userLocation ? (
          <Buttons userLocation={userLocation} setAllZones={setAllZones} />
        ) : null}
      </div>
    </div>
  );
};

export default Home;
