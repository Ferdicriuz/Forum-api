const express = require("express");
const app = express();
const authRoutes = require("./routes/authRoutes");
const threadRoutes = require("./routes/threadRoutes");
const commentRoutes = require("./routes/commentRoutes");
const adminRoutes = require("./routes/adminRoutes");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./graphql/schema");




app.use(express.json());
app.use("/graphql", graphqlHTTP({
  schema,
  graphiql: true
}));

app.use("/auth", authRoutes);
app.use("/threads",threadRoutes);
app.use("/", commentRoutes );
app.use("/admin", adminRoutes);

module.exports = app;