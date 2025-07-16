const sql = require("mssql");
require("dotenv").config();

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  options: {
    trustServerCertificate: true,
    encrypt: false,
  },
};

const pool = new sql.ConnectionPool(config);
const poolConnect = pool.connect(); 

async function query(queryText, params = {}) {
  await poolConnect;
  const request = pool.request();

  for (const key in params) {
    const value = params[key];

    if (typeof value === "number") {
      if (Number.isInteger(value)) {
        request.input(key, sql.BigInt, value);
      } else {
        request.input(key, sql.Float, value);
      }
    } else if (typeof value === "boolean") {
      request.input(key, sql.Bit, value);
    } 
    else if (value instanceof Date) {
    request.input(key, sql.DateTime, value);
    }
    else {
      request.input(key, sql.NVarChar, value);
    }
  }

  return request.query(queryText);
}

module.exports = { query };
