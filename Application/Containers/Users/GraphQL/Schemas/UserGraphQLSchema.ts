const UserGraphQLSchemaModel = `
  type User {
    id: ID

    email: String!
    username: String!
    password: String!

    role_id: Int

    is_activated: Boolean
    is_protected: Boolean

    created_at: String
    updated_at: String
  }
`;

const UserGraphQLSchemaQuery = `
  type Query {
    GetAllUsers: [User]
    GetOneUser(id: ID!): User
  }
`;

const UserGraphQLSchemaMutation = `
  type Mutation {
    CreateUser(input: CreateUserInput!): User
    UpdateUser(input: UpdateUserInput!): User
    DeleteUser(id: ID!): User
  }
`;

const UserGraphQLSchemaInputs = `
  input CreateUserInput {
    email: String!
    username: String!
    password: String!

    role_id: Int!
  }

  input UpdateUserInput {
    id: String!

    email: String
    username: String
    password: String

    role_id: Int

    is_activated: Boolean
    is_protected: Boolean

    created_at: String
    updated_at: String
  }
`;

const UserGraphQLSchema = `
  ${UserGraphQLSchemaModel}
  ${UserGraphQLSchemaQuery}
  ${UserGraphQLSchemaMutation}
  ${UserGraphQLSchemaInputs}
`;

export { UserGraphQLSchema };
