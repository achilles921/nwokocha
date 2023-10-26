const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");

const app = express();

const port = process.env.API_PORT || 3001;
const appPort = process.env.SERVER_PORT || 3000;
const appOrigin = `http://localhost:${appPort}`;

app.use(morgan("dev"));
app.use(helmet());
app.use(cors({ origin: appOrigin }));

app.get("/api/external", (req, res) => {
  res.send({
    msg: "Your access token was successfully validated!",
  });
});

app.listen(port, () => console.log(`API Server listening on port ${port}`));
