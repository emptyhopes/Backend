import { prisma } from "@/Application/Ship/Prisma/Client/index";

import {
  GetOneUserInterface,
  CreateUserInterface,
  UpdateUserInterface,
  DeleteUserInterface,
} from "@/Application/Containers/Users/GraphQL/Types/UsersTypes";

const UserGraphQLResolver = {
  Query: {
    GetAllUsers: async () => {
      return await prisma.user.findMany();
    },
    GetOneUser: async (_: undefined, { id }: GetOneUserInterface) => {
      return await prisma.user.findUnique({ where: { id: id } });
    },
  },

  Mutation: {
    CreateUser: async (_: undefined, { input }: CreateUserInterface) => {
      return await prisma.user.create({ data: input });
    },
    UpdateUser: async (_: undefined, { input }: UpdateUserInterface) => {
      return await prisma.user.update({ data: input, where: { id: input.id } });
    },
    DeleteUser: async (_: undefined, { id }: DeleteUserInterface) => {
      return await prisma.user.delete({ where: { id: id } });
    },
  },
};

export { UserGraphQLResolver };
