import { GraphQLResponse } from "@apollo/server";

import { server } from "@/Application/Ship/Tests/Server";
import { prisma } from "@/Application/Ship/Prisma/Client";

import {
  GetAllRolesPaginationInputInterface,
  GetOneRoleByIDInputInterface,
  GetOneRoleByNameInputInterface,
  CreateRoleInputInterface,
  UpdateRoleInputInterface,
  DeleteRoleByIDInputInterface,
  DeleteRoleByNameInputInterface,
  RoleOutputInterface,
} from "@/Application/Containers/Roles/Types/RolesTypes";

class RolesResponse extends null {
  static async GetAllRolesResponse(): Promise<GraphQLResponse<{ GetAllRoles: RoleOutputInterface[] }>> {
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

  static async GetAllRolesPaginationResponse({
    input,
  }: GetAllRolesPaginationInputInterface): Promise<GraphQLResponse<{ GetAllRolesPagination: RoleOutputInterface[] }>> {
    const response = await server.executeOperation<{ GetAllRolesPagination: RoleOutputInterface[] }>({
      query: `#graphql
                query GetAllRolesPagination ($input: GetAllRolesPaginationInput!) {
                  GetAllRolesPagination (input: $input) {
                      id
                      name
                      created_at
                      updated_at
                    }
                }
            `,

      variables: {
        input: {
          take: input.take,
          skip: input.skip,
        },
      },
    });

    return response;
  }

  static async GetOneRoleByIDResponse({
    id,
  }: GetOneRoleByIDInputInterface): Promise<GraphQLResponse<{ GetOneRoleByID: RoleOutputInterface }>> {
    const response = await server.executeOperation<{ GetOneRoleByID: RoleOutputInterface }>({
      query: `#graphql
                query GetOneRoleByID ($id: ID!) {
                    GetOneRoleByID (id: $id) {
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

  static async GetOneRoleByNameResponse({
    name,
  }: GetOneRoleByNameInputInterface): Promise<GraphQLResponse<{ GetOneRoleByName: RoleOutputInterface }>> {
    const response = await server.executeOperation<{ GetOneRoleByName: RoleOutputInterface }>({
      query: `#graphql
                query GetOneRoleByID ($name: String!) {
                    GetOneRoleByName (name: $name) {
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

  static async CreateRoleResponse({
    input,
  }: CreateRoleInputInterface): Promise<GraphQLResponse<{ CreateRole: RoleOutputInterface }>> {
    const response = await server.executeOperation<{ CreateRole: RoleOutputInterface }>({
      query: `#graphql
                mutation CreateRole ($input: CreateRoleInput!) {
                  CreateRole (input: $input) {
                    id
                    name
                    created_at
                    updated_at
                  }
                }
              `,

      variables: {
        input: {
          name: input.name,
        },
      },
    });

    return response;
  }

  static async UpdateRoleResponse({
    input,
  }: UpdateRoleInputInterface): Promise<GraphQLResponse<{ UpdateRole: RoleOutputInterface }>> {
    const response = await server.executeOperation<{ UpdateRole: RoleOutputInterface }>({
      query: `#graphql
                mutation UpdateRole ($input: UpdateRoleInput!) {
                  UpdateRole (input: $input) {
                    id
                    name
                    created_at
                    updated_at
                  }
                }
              `,

      variables: {
        input: {
          id: input.id,
          name: input.name,
        },
      },
    });

    return response;
  }

  static async DeleteRoleByIDResponse({
    id,
  }: DeleteRoleByIDInputInterface): Promise<GraphQLResponse<{ DeleteRoleByID: RoleOutputInterface }>> {
    const response = await server.executeOperation<{ DeleteRoleByID: RoleOutputInterface }>({
      query: `#graphql
              mutation DeleteRoleByID ($id: ID!) {
                DeleteRoleByID (id: $id) {
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

  static async DeleteRoleByNameResponse({
    name,
  }: DeleteRoleByNameInputInterface): Promise<GraphQLResponse<{ DeleteRoleByName: RoleOutputInterface }>> {
    const response = await server.executeOperation<{ DeleteRoleByName: RoleOutputInterface }>({
      query: `#graphql
              mutation DeleteRoleByName ($name: String!) {
                DeleteRoleByName (name: $name) {
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

  static async GetRoleID(name: string): Promise<RoleOutputInterface | null> {
    const response = await this.GetAllRolesResponse();

    let result = null;

    if (response.body.kind === "single") {
      if (response.body.singleResult.errors) return null;

      const data = response.body.singleResult.data?.GetAllRoles;

      if (data) result = data.filter((value) => value.name === name)[0];
    }

    return result;
  }

  static async ClearRoleID() {
    const length = await prisma.role.count();

    await prisma.$executeRawUnsafe(`ALTER SEQUENCE roles_id_seq RESTART WITH ${length + 1}`);
  }
}

export { RolesResponse };
