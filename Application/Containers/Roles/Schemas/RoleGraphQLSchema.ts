const RoleGraphQLSchemaModel = `
  type Role {
    id: ID

    name: String!

    created_at: String
    updated_at: String
  }
`;

const RoleGraphQLSchemaQuery = `
  type Query {
    GetAllRoles: [Role]
    GetOneRole(id: ID!): Role
  }
`;

const RoleGraphQLSchemaMutation = `
  type Mutation {
    CreateRole(input: CreateRoleInput!): Role
    UpdateRole(input: UpdateRoleInput!): Role
    DeleteRole(id: ID!): Role
  }
`;

const RoleGraphQLSchemaInputs = `
  input CreateRoleInput {
    name: String!
  }

  input UpdateRoleInput {
    id: ID!

    name: String

    updated_at: String
  }
`;

const RoleGraphQLSchema = `
  ${RoleGraphQLSchemaModel}
  ${RoleGraphQLSchemaQuery}
  ${RoleGraphQLSchemaMutation}
  ${RoleGraphQLSchemaInputs}
`;

export { RoleGraphQLSchema };
