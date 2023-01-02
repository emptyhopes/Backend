import { prisma } from "@/Application/Ship/Prisma/Client/index";

import {
  GetOneUserInterfaceInput,
  CreateUserInterfaceInput,
  UpdateUserInterfaceInput,
  DeleteUserInterfaceInput,
} from "@/Application/Containers/Users/Types/UsersTypes";

const UserGraphQLResolver = {
  Query: {
    GetAllUsers: async () => {
      return await prisma.user.findMany();
    },
    GetOneUser: async (_: undefined, { id }: GetOneUserInterfaceInput) => {
      return await prisma.user.findUnique({ where: { id: id } });
    },
  },

  Mutation: {
    CreateUser: async (_: undefined, { input }: CreateUserInterfaceInput) => {
      return await prisma.user.create({ data: input });
    },
    UpdateUser: async (_: undefined, { input }: UpdateUserInterfaceInput) => {
      return await prisma.user.update({ data: input, where: { id: input.id } });
    },
    DeleteUser: async (_: undefined, { id }: DeleteUserInterfaceInput) => {
      return await prisma.user.delete({ where: { id: id } });
    },
  },
};

export { UserGraphQLResolver };
