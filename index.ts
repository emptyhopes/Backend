import { UserGraphQLSchema } from "@/Application/Containers/Users/GraphQL/Schemas/UserGraphQLSchema";

const schema = `#graphql
  ${UserGraphQLSchema}
`;

export { schema };
