import { UserGraphQLResolver } from "@/Application/Containers/Users/GraphQL/Resolvers/UserGraphQLResolver";

const resolvers = {
  Query: {
    ...UserGraphQLResolver.Query,
  },
  Mutation: {
    ...UserGraphQLResolver.Mutation,
  },
};

export { resolvers };
