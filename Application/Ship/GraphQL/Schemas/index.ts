import { RoleGraphQLSchema } from "@/Application/Containers/Roles/Schemas/RoleGraphQLSchema";
import { UserGraphQLSchema } from "@/Application/Containers/Users/Schemas/UserGraphQLSchema";
import { TokenGraphQLSchema } from "@/Application/Containers/Tokens/Schemas/TokenGraphQLSchema";

const schema = `#graphql
  ${RoleGraphQLSchema}
  ${UserGraphQLSchema}
  ${TokenGraphQLSchema}
`;

export { schema };
