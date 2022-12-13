import { gql } from "apollo-server";

import { UserGraphQLSchema } from "@Application/Containers/Users/GraphQL/Schemas/UserGraphQLSchema";

const schema = gql`
  ${UserGraphQLSchema}
`;

export { schema };
