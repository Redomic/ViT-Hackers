import React, { useState } from "react";
import { axiosUser } from "../../axiosInstance";

import "./styles.css";

function Buttons({ userLocation, viewport, setAllZones }) {
  const [showSupplies, setShowSupplies] = useState(false);

  const markDangerHandler = () => {
    axiosUser
      .post("mark/danger", { danger_location: { ...userLocation } })
      .then((res) => {
        console.log(res.data);
        axiosUser
          .get("get/markers")
          .then((res2) => {
            console.log(res2.data);
            setAllZones(res2.data.results);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const markSafeHandler = () => {
    axiosUser
      .post("mark/safe", { safe_location: { ...userLocation } })
      .then((res) => {
        console.log(res.data);
        axiosUser
          .get("get/markers")
          .then((res2) => {
            console.log(res2.data);
            setAllZones(res2.data.results);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const markSuppliesHandler = (type) => {
    axiosUser
      .post("mark/supplies", {
        supplies_location: { ...userLocation },
        supplies_type: type,
      })
      .then((res) => {
        console.log(res.data);
        axiosUser
          .get("get/markers")
          .then((res2) => {
            console.log(res2.data);
            setAllZones(res2.data.results);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="buttons-container">
        <button className="buttons" id="danger" onClick={markDangerHandler}>
          Mark
          <br />
          Danger
        </button>
        <button className="buttons" id="safe" onClick={markSafeHandler}>
          Mark
          <br />
          Safe
        </button>
        <button
          className="buttons"
          id="supplies"
          onClick={() => {
            setShowSupplies(!showSupplies);
          }}
        >
          Mark
          <br />
          Supplies
        </button>
      </div>
      {showSupplies ? (
        <div className="buttons-container" style={{ marginTop: "7px" }}>
          <button
            className="extra-buttons"
            onClick={() => {
              markSuppliesHandler("Food");
            }}
          >
            Mark Food
          </button>
          <button
            className="extra-buttons"
            onClick={() => {
              markSuppliesHandler("Shelter");
            }}
          >
            Mark Shelter
          </button>
          <button
            className="extra-buttons"
            onClick={() => {
              markSuppliesHandler("Medicine");
            }}
          >
            Mark Medicine
          </button>
        </div>
      ) : null}
    </>
  );
}

export default Buttons;
