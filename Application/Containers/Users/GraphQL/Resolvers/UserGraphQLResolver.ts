import { prisma } from "@/Application/Ship/Prisma/Client/index";

const UserGraphQLResolver = {
  Query: {
    GetAllUsers: async () => {
      return await prisma.user.findMany();
    },
    GetOneUser: async (_: undefined, { id }: { id: string }) => {
      return await prisma.user.findUnique({ where: { id: id } });
    },
  },

  Mutation: {
    CreateUser: async (_: undefined, { input }: { input: { id: number } }) => {
      return await prisma.user.create({ data: input });
    },
    UpdateUser: async (_: undefined, { input }: { input: { id: number } }) => {
      return await prisma.user.update({ data: input, where: { id: input.id } });
    },
    DeleteUser: async (_: undefined, { id }: { id: string }) => {
      return await prisma.user.delete({ where: { id: id } });
    },
  },
};

export { UserGraphQLResolver };
