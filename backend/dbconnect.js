const dotenv = require("dotenv");
import { Pool } from "pg";
dotenv.config();
const DatabaseUrl = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}
:${process.env.DB_PORT}/${process.env.DB_Database}`;

const proConfig = process.env.DB_ProdUrl;

const pool = new Pool({
  connectionString:
    process.env.NODE_ENV === "production" ? proConfig : DatabaseUrl,
  ssl: {
    rejectUnauthorized: false,
  },
});
export default pool;
