import { ApolloServer } from "apollo-server";

import { schema } from "@Application/Ship/GraphQL/Schemas/index";
import { resolvers } from "@Application/Ship/GraphQL/Resolvers/index";

class Application {
  server = new ApolloServer({ typeDefs: schema, resolvers: resolvers });

  Run() {
    this.Listen();
  }

  Listen() {
    this.server.listen().then(({ url }) => console.log(`🚀 Server ready at ${url}`));
  }
}

export default new Application();
