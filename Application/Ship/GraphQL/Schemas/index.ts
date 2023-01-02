import { UserGraphQLSchema } from "@/Application/Containers/Users/Schemas/UserGraphQLSchema";
import { RoleGraphQLSchema } from "@/Application/Containers/Roles/Schemas/RoleGraphQLSchema";

const schema = `#graphql
  ${UserGraphQLSchema}
  ${RoleGraphQLSchema}
`;

export { schema };
