const { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLList } = require("graphql");
const Thread = require("../models/Thread");

const ThreadType = new GraphQLObjectType({
  name: "Thread",
  fields: {
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    content: { type: GraphQLString }
  }
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    threads: {
      type: new GraphQLList(ThreadType),
      resolve() {
        return Thread.find();
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});