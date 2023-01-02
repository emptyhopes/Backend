import { RoleGraphQLResolver } from "@/Application/Containers/Roles/Resolvers/RoleGraphQLResolver";

const resolvers = {
  Query: {
    ...RoleGraphQLResolver.Query,
  },
  Mutation: {
    ...RoleGraphQLResolver.Mutation,
  },
};

export { resolvers };
