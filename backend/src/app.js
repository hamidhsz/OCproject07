console.log("Hello");
const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { sequelize } = require("./models");
const config = require("./config/config");

console.log("Server starting ....");

const app = express();
app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(cors());

app.use((req, res, next) => {
  // console.log(req.body);
  next();
});

require("./routes")(app);

//to truncate all the tables >>>>>>
//sequelize.sync({ force: true })
sequelize.sync().then(() => {
  app.listen(config.port);
  console.log(`Server started on port ${config.port}`);
});
