import { UserGraphQLResolver } from "@/Application/Containers/Users/Resolvers/UserGraphQLResolver";
import { RoleGraphQLResolver } from "@/Application/Containers/Roles/Resolvers/RoleGraphQLResolver";

const resolvers = {
  Query: {
    ...UserGraphQLResolver.Query,
    ...RoleGraphQLResolver.Query,
  },
  Mutation: {
    ...UserGraphQLResolver.Mutation,
    ...RoleGraphQLResolver.Mutation,
  },
};

export { resolvers };
