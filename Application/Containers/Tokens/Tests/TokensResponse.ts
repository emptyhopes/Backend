import { GraphQLResponse } from "@apollo/server";

import { server } from "@/Application/Ship/Tests/Server";
import { prisma } from "@/Application/Ship/Prisma/Client";

import {
  GetAllTokensPaginationInputInterface,
  GetOneTokenByIDInputInterface,
  GetOneTokenByUserIDInputInterface,
  CreateTokenInputInterface,
  UpdateTokenInputInterface,
  DeleteTokenByIDInputInterface,
  DeleteTokenByUserIDInputInterface,
  TokenOutputInterface,
} from "@/Application/Containers/Tokens/Types/TokensTypes";

class TokensResponse extends null {
  static async GetAllTokensResponse(): Promise<GraphQLResponse<{ GetAllTokens: TokenOutputInterface[] }>> {
    const response = await server.executeOperation<{ GetAllTokens: TokenOutputInterface[] }>({
      query: `#graphql
        query { 
          GetAllTokens { 
            id
            refresh
            secret
            user_id
            created_at
            updated_at
          } 
        }
      `,
    });

    return response;
  }

  static async GetAllTokensPaginationResponse({
    input,
  }: GetAllTokensPaginationInputInterface): Promise<
    GraphQLResponse<{ GetAllTokensPagination: TokenOutputInterface[] }>
  > {
    const response = await server.executeOperation<{ GetAllTokensPagination: TokenOutputInterface[] }>({
      query: `#graphql 
        query GetAllTokensPagination ($input: GetAllTokensPaginationInput!) { 
          GetAllTokensPagination (input: $input) { 
            id
            refresh
            secret
            user_id
            created_at
            updated_at
          } 
        }
      `,

      variables: { input: { take: input.take, skip: input.skip } },
    });

    return response;
  }

  static async GetOneTokenByIDResponse({
    id,
  }: GetOneTokenByIDInputInterface): Promise<GraphQLResponse<{ GetOneTokenByID: TokenOutputInterface }>> {
    const response = await server.executeOperation<{ GetOneTokenByID: TokenOutputInterface }>({
      query: `#graphql 
        query GetOneTokenByID ($id: ID!) { 
          GetOneTokenByID (id: $id) {
            id
            refresh
            secret
            user_id
            created_at
            updated_at
          }
        }
      `,

      variables: { id: id },
    });

    return response;
  }

  static async GetOneTokenByUserIDResponse({
    user_id,
  }: GetOneTokenByUserIDInputInterface): Promise<GraphQLResponse<{ GetOneTokenByUserID: TokenOutputInterface }>> {
    const response = await server.executeOperation<{ GetOneTokenByUserID: TokenOutputInterface }>({
      query: `#graphql 
        query GetOneTokenByUserID ($user_id: String!) { 
            GetOneTokenByUserID (user_id: $user_id) { 
            id
            refresh
            secret
            user_id
            created_at
            updated_at
          } 
        }
      `,

      variables: { user_id: user_id },
    });

    return response;
  }

  static async CreateTokenResponse({
    input,
  }: CreateTokenInputInterface): Promise<GraphQLResponse<{ CreateToken: TokenOutputInterface }>> {
    const response = await server.executeOperation<{ CreateToken: TokenOutputInterface }>({
      query: `#graphql
          mutation CreateToken ($input: CreateTokenInput!) {
            CreateToken (input: $input) {
              id
              refresh
              secret
              user_id
              created_at
              updated_at
            }
          }
        `,

      variables: { input: { refresh: input.refresh, secret: input.secret, user_id: input.user_id } },
    });

    return response;
  }

  static async UpdateTokenResponse({
    input,
  }: UpdateTokenInputInterface): Promise<GraphQLResponse<{ UpdateToken: TokenOutputInterface }>> {
    const response = await server.executeOperation<{ UpdateToken: TokenOutputInterface }>({
      query: `#graphql
          mutation UpdateToken ($input: UpdateTokenInput!) {
            UpdateToken (input: $input) {
              id
              refresh
              secret
              user_id
              created_at
              updated_at
            }
          }
        `,

      variables: { input: { id: input.id, refresh: input.refresh, secret: input.secret, user_id: input.user_id } },
    });

    return response;
  }

  static async DeleteTokenByIDResponse({
    id,
  }: DeleteTokenByIDInputInterface): Promise<GraphQLResponse<{ DeleteTokenByID: TokenOutputInterface }>> {
    const response = await server.executeOperation<{ DeleteTokenByID: TokenOutputInterface }>({
      query: `#graphql 
        mutation DeleteTokenByID ($id: ID!) { 
          DeleteTokenByID (id: $id) { 
            id
            refresh
            secret
            user_id
            created_at
            updated_at
          } 
        }
      `,

      variables: { id: id },
    });

    return response;
  }

  static async DeleteTokenByUserIDResponse({
    user_id,
  }: DeleteTokenByUserIDInputInterface): Promise<GraphQLResponse<{ DeleteTokenByUserID: TokenOutputInterface }>> {
    const response = await server.executeOperation<{ DeleteTokenByUserID: TokenOutputInterface }>({
      query: `#graphql 
        mutation DeleteTokenByUserID ($user_id: String!) { 
          DeleteTokenByUserID (user_id: $user_id) { 
            id
            refresh
            secret
            user_id
            created_at
            updated_at
          } 
        }
      `,
      variables: { user_id: user_id },
    });

    return response;
  }

  static async GetTokenIDByUserID(user_id: string): Promise<TokenOutputInterface | null> {
    let result = null;
    const response = await this.GetAllTokensResponse();

    if (response.body.kind === "single") {
      if (response.body.singleResult.errors) return null;
      const data = response.body.singleResult.data?.GetAllTokens;
      if (data) result = data.filter((value) => value.user_id === user_id)[0];
    }

    return result;
  }

  static async GetCountTokens() {
    return await prisma.token.count();
  }
}

export { TokensResponse };
