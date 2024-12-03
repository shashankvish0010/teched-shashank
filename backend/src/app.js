const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
app.use(express.json());

app.use(cors());
app.use(require("../routes/routes"));

app.listen(process.env.PORT, () =>
  console.log(`Server is running ${process.env.PORT}`)
);
