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
    GetAllRolesPagination(input: GetAllRolesPaginationInput!): [Role]
    GetOneRoleByID(id: ID!): Role
    GetOneRoleByName(name: String!): Role
  }
`;

const RoleGraphQLSchemaMutation = `
  type Mutation {
    CreateRole(input: CreateRoleInput!): Role
    UpdateRole(input: UpdateRoleInput!): Role
    DeleteRoleByID(id: ID!): Role
    DeleteRoleByName(name: String!): Role
  }
`;

const RoleGraphQLSchemaInputs = `
  input GetAllRolesPaginationInput {
    take: Int!
    skip: Int!
  }

  input CreateRoleInput {
    name: String!
  }

  input UpdateRoleInput {
    id: ID!
    name: String!
  }
`;

const RoleGraphQLSchema = `
  ${RoleGraphQLSchemaModel}
  ${RoleGraphQLSchemaQuery}
  ${RoleGraphQLSchemaMutation}
  ${RoleGraphQLSchemaInputs}
`;

export { RoleGraphQLSchema };
