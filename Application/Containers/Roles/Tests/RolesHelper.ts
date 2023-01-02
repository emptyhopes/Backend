import { server } from "@/Application/Ship/Tests/Server";

import { RoleInterfaceOutput } from "@/Application/Containers/Roles/Types/RolesTypes";

const CreateRoleResponse = async (name: string) => {
  const response = await server.executeOperation<{ CreateRole: RoleInterfaceOutput }>({
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
};

const DeleteRoleResponse = async (ID: number) => {
  const response = await server.executeOperation<{ DeleteRole: RoleInterfaceOutput }>({
    query: `#graphql
            mutation Mutation($DeleteRoleID: ID!) {
              DeleteRole(id: $DeleteRoleID) {
                id
                name
                created_at
                updated_at
              }
            }
          `,

    variables: {
      DeleteRoleID: ID,
    },
  });

  return response;
};

const GetAllRolesResponse = async () => {
  const response = await server.executeOperation<{ GetAllRoles: RoleInterfaceOutput[] }>({
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
};

export { CreateRoleResponse, DeleteRoleResponse, GetAllRolesResponse };
