const express = require("express");
const app = express();

app.use(express.json());

app.use("/auth", require("./routes/authRoutes"));
app.use("/threads", require("./routes/threadRoutes"));
app.use("/", require("./routes/commentRoutes"));

module.exports = app;