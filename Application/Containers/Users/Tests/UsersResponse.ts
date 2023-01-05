import { GraphQLResponse } from "@apollo/server";

import { server } from "@/Application/Ship/Tests/Server";
import { prisma } from "@/Application/Ship/Prisma/Client";

import {
  GetAllUsersPaginationInputInterface,
  GetOneUserByIDInputInterface,
  GetOneUserByUsernameInputInterface,
  GetOneUserByEmailInputInterface,
  CreateUserInputInterface,
  UpdateUserInputInterface,
  DeleteUserByIDInputInterface,
  DeleteUserByUsernameInputInterface,
  DeleteUserByEmailInputInterface,
  UserOutputInterface,
} from "@/Application/Containers/Users/Types/UsersTypes";

class UsersResponse extends null {
  static async GetAllUsersResponse(): Promise<GraphQLResponse<{ GetAllUsers: UserOutputInterface[] }>> {
    const response = await server.executeOperation<{ GetAllUsers: UserOutputInterface[] }>({
      query: `#graphql 
        query { 
          GetAllUsers { 
            id
            email
            username
            password
            role_id
            created_at
            updated_at
          } 
        }
      `,
    });

    return response;
  }

  static async GetAllUsersPaginationResponse({
    input,
  }: GetAllUsersPaginationInputInterface): Promise<GraphQLResponse<{ GetAllUsersPagination: UserOutputInterface[] }>> {
    const response = await server.executeOperation<{ GetAllUsersPagination: UserOutputInterface[] }>({
      query: `#graphql 
        query GetAllUsersPagination ($input: GetAllUsersPaginationInput!) { 
          GetAllUsersPagination (input: $input) { 
            id
            email
            username
            password
            role_id
            created_at
            updated_at 
          } 
        }
      `,

      variables: { input: { take: input.take, skip: input.skip } },
    });

    return response;
  }

  static async GetOneUserByIDResponse({
    id,
  }: GetOneUserByIDInputInterface): Promise<GraphQLResponse<{ GetOneUserByID: UserOutputInterface }>> {
    const response = await server.executeOperation<{ GetOneUserByID: UserOutputInterface }>({
      query: `#graphql 
        query GetOneUserByID ($id: ID!) { 
          GetOneUserByID (id: $id) {
            id
            email
            username
            password
            role_id
            created_at
            updated_at
          }
        }
      `,

      variables: { id: id },
    });

    return response;
  }

  static async GetOneUserByUsernameResponse({
    username,
  }: GetOneUserByUsernameInputInterface): Promise<GraphQLResponse<{ GetOneUserByUsername: UserOutputInterface }>> {
    const response = await server.executeOperation<{ GetOneUserByUsername: UserOutputInterface }>({
      query: `#graphql 
        query GetOneUserByUsername ($username: String!) { 
          GetOneUserByUsername (username: $username) { 
            id
            email
            username
            password
            role_id
            created_at
            updated_at
          } 
        }
      `,

      variables: { username: username },
    });

    return response;
  }

  static async GetOneUserByEmailResponse({
    email,
  }: GetOneUserByEmailInputInterface): Promise<GraphQLResponse<{ GetOneUserByEmail: UserOutputInterface }>> {
    const response = await server.executeOperation<{ GetOneUserByEmail: UserOutputInterface }>({
      query: `#graphql 
        query GetOneUserByEmail ($email: String!) { 
          GetOneUserByEmail (email: $email) { 
            id
            email
            username
            password
            role_id
            created_at
            updated_at
          } 
        }
      `,

      variables: { email: email },
    });

    return response;
  }

  static async CreateUserResponse({
    input,
  }: CreateUserInputInterface): Promise<GraphQLResponse<{ CreateUser: UserOutputInterface }>> {
    const variables: CreateUserInputInterface = {
      input: { email: input.email, username: input.username, password: input.password },
    };

    if (input.role_id) {
      variables.input.role_id = input.role_id;
    }

    const response = await server.executeOperation<{ CreateUser: UserOutputInterface }>({
      query: `#graphql 
        mutation CreateUser ($input: CreateUserInput!) { 
          CreateUser (input: $input) { 
            id
            email
            username
            password
            role_id
            created_at
            updated_at
          } 
        }
      `,

      variables: variables,
    });

    return response;
  }

  static async UpdateUserResponse({
    input,
  }: UpdateUserInputInterface): Promise<GraphQLResponse<{ UpdateUser: UserOutputInterface }>> {
    const response = await server.executeOperation<{ UpdateUser: UserOutputInterface }>({
      query: `#graphql 
        mutation UpdateUser ($input: UpdateUserInput!) { 
          UpdateUser (input: $input) { 
            id
            email
            username
            password
            role_id
            created_at
            updated_at
          } 
        }
      `,

      variables: {
        input: {
          id: input.id,
          email: input.email,
          username: input.username,
          password: input.password,
          role_id: input.role_id,
        },
      },
    });

    return response;
  }

  static async DeleteUserByIDResponse({
    id,
  }: DeleteUserByIDInputInterface): Promise<GraphQLResponse<{ DeleteUserByID: UserOutputInterface }>> {
    const response = await server.executeOperation<{ DeleteUserByID: UserOutputInterface }>({
      query: `#graphql 
        mutation DeleteUserByID ($id: ID!) { 
          DeleteUserByID (id: $id) { 
            id
            email
            username
            password
            role_id
            created_at
            updated_at
          } 
        }
      `,

      variables: { id: id },
    });

    return response;
  }

  static async DeleteUserByUsernameResponse({
    username,
  }: DeleteUserByUsernameInputInterface): Promise<GraphQLResponse<{ DeleteUserByUsername: UserOutputInterface }>> {
    const response = await server.executeOperation<{ DeleteUserByUsername: UserOutputInterface }>({
      query: `#graphql 
        mutation DeleteUserByUsername ($username: String!) { 
          DeleteUserByUsername (username: $username) { 
            id
            email
            username
            password
            role_id
            created_at
            updated_at
          } 
        }
      `,

      variables: { username: username },
    });

    return response;
  }

  static async DeleteUserByEmailResponse({
    email,
  }: DeleteUserByEmailInputInterface): Promise<GraphQLResponse<{ DeleteUserByEmail: UserOutputInterface }>> {
    const response = await server.executeOperation<{ DeleteUserByEmail: UserOutputInterface }>({
      query: `#graphql 
        mutation DeleteUserByEmail ($email: String!) { 
          DeleteUserByEmail (email: $email) { 
            id
            email
            username
            password
            role_id
            created_at
            updated_at
          } 
        }
      `,

      variables: { email: email },
    });

    return response;
  }

  static async GetUserIDByUsername(username: string): Promise<UserOutputInterface | null> {
    let result = null;
    const response = await this.GetAllUsersResponse();

    if (response.body.kind === "single") {
      if (response.body.singleResult.errors) return null;
      const data = response.body.singleResult.data?.GetAllUsers;
      if (data) result = data.filter((value) => value.username === username)[0];
    }

    return result;
  }

  static async GetUserIDByEmail(email: string): Promise<UserOutputInterface | null> {
    let result = null;
    const response = await this.GetAllUsersResponse();

    if (response.body.kind === "single") {
      if (response.body.singleResult.errors) return null;
      const data = response.body.singleResult.data?.GetAllUsers;
      if (data) result = data.filter((value) => value.email === email)[0];
    }

    return result;
  }

  static async GetCountUsers() {
    return await prisma.user.count();
  }
}

export { UsersResponse };
