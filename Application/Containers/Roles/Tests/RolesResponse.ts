import { server } from "@/Application/Ship/Tests/Server";

import { RoleOutputInterface } from "@/Application/Containers/Roles/Types/RolesTypes";

class RolesResponse extends null {
  static async GetAllRolesResponse() {
    const response = await server.executeOperation<{ GetAllRoles: RoleOutputInterface[] }>({
      query: `#graphql
                query {
                    GetAllRoles {
                      id
                      name
                      created_at
                      updated_at
                    }
                }
            `,
    });

    return response;
  }

  static async GetOneRoleByIDResponse() {
    const response = await server.executeOperation<{ GetOneRoleByID: RoleOutputInterface[] }>({
      query: `#graphql
                query {
                    GetOneRoleByID {
                      id
                      name
                      created_at
                      updated_at
                    }
                }
            `,
    });

    return response;
  }

  static async GetOneRoleByNameResponse() {
    const response = await server.executeOperation<{ GetOneRoleByName: RoleOutputInterface[] }>({
      query: `#graphql
                query {
                    GetOneRoleByName {
                      id
                      name
                      created_at
                      updated_at
                    }
                }
            `,
    });

    return response;
  }

  static async CreateRoleResponse(name: string) {
    const response = await server.executeOperation<{ CreateRole: RoleOutputInterface }>({
      query: `#graphql
                mutation Mutation($CreateRoleInput: CreateRoleInput!) {
                  CreateRole(input: $CreateRoleInput) {
                    id
                    name
                    created_at
                    updated_at
                  }
                }
              `,

      variables: {
        CreateRoleInput: {
          name: name,
        },
      },
    });

    return response;
  }

  // update;

  static async DeleteRoleByIDResponse(id: number) {
    const response = await server.executeOperation<{ DeleteRoleByID: RoleOutputInterface }>({
      query: `#graphql
              mutation Mutation($id: ID!) {
                DeleteRoleByID(id: $id) {
                  id
                  name
                  created_at
                  updated_at
                }
              }
            `,

      variables: {
        id: id,
      },
    });

    return response;
  }

  static async DeleteRoleByNameResponse(name: string) {
    const response = await server.executeOperation<{ DeleteRoleByName: RoleOutputInterface }>({
      query: `#graphql
              mutation Mutation($name: String!) {
                DeleteRoleByName(name: $name) {
                  id
                  name
                  created_at
                  updated_at
                }
              }
            `,

      variables: {
        name: name,
      },
    });

    return response;
  }
}

export { RolesResponse };
