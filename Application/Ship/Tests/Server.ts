import { ApolloServer } from "@apollo/server";

import { schema } from "@/Application/Ship/GraphQL/Schemas/index";
import { resolvers } from "@/Application/Ship/GraphQL/Resolvers/index";

const server = new ApolloServer({
  typeDefs: schema,
  resolvers: resolvers,
});

export { server };
