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

import { TokenGraphQLValidations } from "@/Application/Containers/Tokens/Valiadations/TokenGraphQLValidation";

const TokenGraphQLResolver = {
  Query: {
    GetAllTokens: async () => {
      return await prisma.token.findMany();
    },
    GetAllTokensPagination: async (_: undefined, { input }: GetAllTokensPaginationInputInterface) => {
      return await prisma.token.findMany({ take: input.take, skip: input.skip });
    },
    GetOneTokenByID: async (_: undefined, { id }: GetOneTokenByIDInputInterface) => {
      const data = await TokenGraphQLValidations.GetOneTokenByIDValidation({ id: id });
      return await prisma.token.findUnique({ where: { id: Number(data) } });
    },
    GetOneTokenByUserID: async (_: undefined, { user_id }: GetOneTokenByUserIDInputInterface) => {
      const data = await TokenGraphQLValidations.GetOneTokenByUserIDValidation({ user_id: user_id });
      return await prisma.token.findUnique({ where: { user_id: String(data) } });
    },
  },

  Mutation: {
    CreateToken: async (_: undefined, { input }: CreateTokenInputInterface) => {
      const data = await TokenGraphQLValidations.CreateTokenValidation({ input: input });
      return await prisma.token.create({ data: data });
    },
    UpdateToken: async (_: undefined, { input }: UpdateTokenInputInterface) => {
      const data = await TokenGraphQLValidations.UpdateTokenValidation({ input: input });
      return await prisma.token.update({ data: data, where: { id: Number(data.id) } });
    },
    DeleteTokenByID: async (_: undefined, { id }: DeleteTokenByIDInputInterface) => {
      const data = await TokenGraphQLValidations.DeleteTokenByIDValidation({ id: id });
      return await prisma.token.delete({ where: { id: Number(data) } });
    },
    DeleteTokenByUserID: async (_: undefined, { user_id }: DeleteTokenByUserIDInputInterface) => {
      const data = await TokenGraphQLValidations.DeleteTokenByUserIDValidation({ user_id: user_id });
      return await prisma.token.delete({ where: { user_id: String(data) } });
    },
  },
};

export { TokenGraphQLResolver };
