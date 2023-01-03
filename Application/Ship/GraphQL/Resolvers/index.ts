import { RoleGraphQLResolver } from "@/Application/Containers/Roles/Resolvers/RoleGraphQLResolver";
import { UserGraphQLResolver } from "@/Application/Containers/Users/Resolvers/UserGraphQLResolver";
import { TokenGraphQLResolver } from "@/Application/Containers/Tokens/Resolvers/TokensGraphQLResolver";

const resolvers = {
  Query: {
    ...RoleGraphQLResolver.Query,
    ...UserGraphQLResolver.Query,
    ...TokenGraphQLResolver.Query,
  },
  Mutation: {
    ...RoleGraphQLResolver.Mutation,
    ...UserGraphQLResolver.Mutation,
    ...TokenGraphQLResolver.Mutation,
  },
};

export { resolvers };
