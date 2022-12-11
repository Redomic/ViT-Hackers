require("dotenv").config({ path: "../.env" });
const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "vithackers",
  password: "shack13579",
  port: 5432,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
