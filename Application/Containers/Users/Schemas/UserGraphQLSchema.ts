const UserGraphQLSchemaModel = `
  type User {
    id: ID
    email: String!
    username: String!
    password: String!
    is_activated: Boolean
    role_id: Int
    created_at: String
    updated_at: String
  }
`;

const UserGraphQLSchemaQuery = `
  type Query {
    GetAllUsers: [User]
    GetAllUsersPagination(input: GetAllUsersPaginationInput!): [User]
    GetOneUserByID(id: ID!): User
    GetOneUserByUsername(username: String!): User
    GetOneUserByEmail(email: String!): User
  }
`;

const UserGraphQLSchemaMutation = `
  type Mutation {
    CreateUser(input: CreateUserInput!): User
    UpdateUser(input: UpdateUserInput!): User
    DeleteUserByID(id: ID!): User
    DeleteUserByUsername(username: String!): User
    DeleteUserByEmail(email: String!): User
  }
`;

const UserGraphQLSchemaInputs = `
  input GetAllUsersPaginationInput {
    take: Int!
    skip: Int!
  }

  input CreateUserInput {
    email: String!
    username: String!
    password: String!
    role_id: Int
  }

  input UpdateUserInput {
    id: ID!
    email: String!
    username: String!
    password: String!
    is_activated: Boolean!
    role_id: Int!
  }
`;

const UserGraphQLSchema = `
  ${UserGraphQLSchemaModel}
  ${UserGraphQLSchemaQuery}
  ${UserGraphQLSchemaMutation}
  ${UserGraphQLSchemaInputs}
`;

export { UserGraphQLSchema };
