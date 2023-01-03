import { ApolloServer } from "@apollo/server";

import { schema } from "@/Application/Ship/GraphQL/Schemas/index";
import { resolvers } from "@/Application/Ship/GraphQL/Resolvers/index";

const server = new ApolloServer({
  typeDefs: schema,
  resolvers: resolvers,

  includeStacktraceInErrorResponses: false,

  formatError(FormattedError) {
    return { message: FormattedError.message, extensions: { code: FormattedError.extensions?.code } };
  },
});

export { server };
