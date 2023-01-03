const TokenGraphQLSchemaModel = `
  type Token {
    id: ID
    refresh: String!
    secret: String!
    user_id: String!
    created_at: String
    updated_at: String
  }
`;

const TokenGraphQLSchemaQuery = `
  type Query {
    GetAllTokens: [Token]
    GetAllTokensPagination(input: GetAllTokensPaginationInput!): [Token]
    GetOneTokenByID(id: ID!): Token
    GetOneTokenByUserID(user_id: String!): Token
  }
`;

const TokenGraphQLSchemaMutation = `
  type Mutation {
    CreateToken(input: CreateTokenInput!): Token
    UpdateToken(input: UpdateTokenInput!): Token
    DeleteTokenByID(id: ID!): Token
    DeleteTokenByUserID(user_id: String!): Token
  }
`;

const TokenGraphQLSchemaInputs = `
  input GetAllTokensPaginationInput {
    take: Int!
    skip: Int!
  }

  input CreateTokenInput {
    refresh: String!
    secret: String!
    user_id: String!
  }

  input UpdateTokenInput {
    id: ID!
    refresh: String!
    secret: String!
    user_id: String!
  }
`;

const TokenGraphQLSchema = `
  ${TokenGraphQLSchemaModel}
  ${TokenGraphQLSchemaQuery}
  ${TokenGraphQLSchemaMutation}
  ${TokenGraphQLSchemaInputs}
`;

export { TokenGraphQLSchema };
