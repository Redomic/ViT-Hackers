require("dotenv").config({ path: "./.env" });

// Imports -------------------------------------------
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const catchAsync = require("./utils/catchAsync");
const format = require("pg-format");

const db = require("./db");

const app = express();

// Middleware ----------------------------------------
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(cors({ credentials: true, origin: true }));

// Routes --------------------------------------------
app.get("/test", (req, res) => {
  res.send("CONNECTED");
});

app.get(
  "/get/markers",
  catchAsync(async (req, res, next) => {
    const results_danger = await db.query(
      format(
        "SELECT made_on, user_id, ST_X(danger_location::geometry), ST_Y(danger_location::geometry) FROM danger"
      )
    );
    const results_safe = await db.query(
      format(
        "SELECT made_on, user_id, ST_X(safezone_location::geometry), ST_Y(safezone_location::geometry) FROM safezone"
      )
    );
    const results_supplies = await db.query(
      format(
        "SELECT made_on, user_id, supplies_type, ST_X(supplies_location::geometry), ST_Y(supplies_location::geometry) FROM supplies"
      )
    );

    res.send({
      status: "success",
      results: {
        danger: results_danger.rows,
        safe: results_safe.rows,
        supplies: results_supplies.rows,
      },
    });
  })
);

app.post(
  "/mark/danger",
  catchAsync(async (req, res, next) => {
    const { danger_location } = req.body;
    const new_danger_location = `SRID=4326;POINT(${danger_location.longitude} ${danger_location.latitude})`;

    const results = await db.query(
      format(
        "INSERT INTO danger (danger_location, made_on, user_id) VALUES (%L, %L, %L)",
        new_danger_location,
        "NOW()",
        "User_x"
      )
    );

    res.send({ status: "success", message: "added danger marker" });
  })
);

app.post(
  "/mark/safe",
  catchAsync(async (req, res, next) => {
    const { safe_location } = req.body;
    const new_safe_location = `SRID=4326;POINT(${safe_location.longitude} ${safe_location.latitude})`;

    const results = await db.query(
      format(
        "INSERT INTO safezone (safezone_location, made_on, user_id) VALUES (%L, %L, %L)",
        new_safe_location,
        "NOW()",
        "User x"
      )
    );

    res.send({ status: "success", message: "added safe marker" });
  })
);

app.post(
  "/mark/supplies",
  catchAsync(async (req, res, next) => {
    const { supplies_location, supplies_type } = req.body;
    const new_supplies_location = `SRID=4326;POINT(${supplies_location.longitude} ${supplies_location.latitude})`;

    const results = await db.query(
      format(
        "INSERT INTO supplies (supplies_location, supplies_type, made_on, user_id) VALUES (%L, %L, %L, %L)",
        new_supplies_location,
        supplies_type,
        "NOW()",
        "User_x"
      )
    );

    res.send({ status: "success", message: "added supplies marker" });
  })
);

// ------------------------------------------------------------- ERROR HANDLING

app.use((err, req, res, next) => {
  if (!err.message) err.message = "Something went wrong";
  // console.log(err.message);
  console.log(err);
  res.status(200).json({
    status: "failed",
    message: err.message,
  });
});
//  Listener -----------------------------------------
port = process.env.SERVERPORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
