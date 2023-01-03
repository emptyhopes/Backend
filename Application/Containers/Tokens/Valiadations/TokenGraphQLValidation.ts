import { GraphQLError } from "graphql";

import { prisma } from "@/Application/Ship/Prisma/Client/index";

import {
  GetAllTokensPaginationInputInterface,
  GetOneTokenByIDInputInterface,
  GetOneTokenByUserIDInputInterface,
  CreateTokenInputInterface,
  UpdateTokenInputInterface,
  DeleteTokenByIDInputInterface,
  DeleteTokenByUserIDInputInterface,
} from "@/Application/Containers/Tokens/Types/TokensTypes";

class TokenGraphQLValidations extends null {
  static async GetAllTokensPaginationValidation({ input }: GetAllTokensPaginationInputInterface) {
    return input;
  }

  static async GetOneTokenByIDValidation({ id }: GetOneTokenByIDInputInterface) {
    const token = await prisma.token.findUnique({ where: { id: Number(id) } });
    if (!token) throw new GraphQLError("The user does not exist.", { extensions: { code: "BAD_USER_INPUT" } });

    return id;
  }

  static async GetOneTokenByUserIDValidation({ user_id }: GetOneTokenByUserIDInputInterface) {
    const token = await prisma.token.findUnique({ where: { user_id: String(user_id) } });
    if (!token) throw new GraphQLError("The user does not exist.", { extensions: { code: "BAD_USER_INPUT" } });

    return user_id;
  }

  static async CreateTokenValidation({ input }: CreateTokenInputInterface) {
    const token = await prisma.token.findUnique({ where: { user_id: String(input.user_id) } });
    if (token) throw new GraphQLError("The user already exists.", { extensions: { code: "BAD_USER_INPUT" } });

    return input;
  }

  static async UpdateTokenValidation({ input }: UpdateTokenInputInterface) {
    input.id = Number(input.id);

    return input;
  }

  static async DeleteTokenByIDValidation({ id }: DeleteTokenByIDInputInterface) {
    const token = await prisma.token.findUnique({ where: { id: Number(id) } });
    if (!token) throw new GraphQLError("The user does not exist.", { extensions: { code: "BAD_USER_INPUT" } });

    return id;
  }

  static async DeleteTokenByUserIDValidation({ user_id }: DeleteTokenByUserIDInputInterface) {
    const token = await prisma.token.findUnique({ where: { user_id: String(user_id) } });
    if (!token) throw new GraphQLError("The user does not exist.", { extensions: { code: "BAD_USER_INPUT" } });

    return user_id;
  }
}

export { TokenGraphQLValidations };
