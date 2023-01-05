import { RoleGraphQLResolver } from "@/Application/Containers/Roles/Resolvers/RoleGraphQLResolver";
import { UserGraphQLResolver } from "@/Application/Containers/Users/Resolvers/UserGraphQLResolver";
import { TokenGraphQLResolver } from "@/Application/Containers/Tokens/Resolvers/TokensGraphQLResolver";

const resolvers = {
  Query: {
    // Roles
    ...RoleGraphQLResolver.Query,
    // Users
    ...UserGraphQLResolver.Query,
    // Tokens
    ...TokenGraphQLResolver.Query,
  },
  Mutation: {
    // Roles
    ...RoleGraphQLResolver.Mutation,
    // Users
    ...UserGraphQLResolver.Mutation,
    // Tokens
    ...TokenGraphQLResolver.Mutation,
  },

  // Users
  User: UserGraphQLResolver.User,
};

export { resolvers };
