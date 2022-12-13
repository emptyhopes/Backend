import { prisma } from "@Application/Ship/Prisma/Client/index";

interface UserResponse {}

const UserGraphQLResolver = {
  Query: {
    GetAllUsers: async () => {
      // Return
      // Types
      // Validation
      return await prisma.user.findMany();
    },
    GetOneUser: async (_: undefined, { id }: any) => {
      // Return
      // Types
      // Validation
      return await prisma.user.findUnique({ where: { id: id } });
    }
  },

  Mutation: {
    CreateUser: async (_: undefined, { input }: any) => {
      // Return
      // Types
      // Validation
      return await prisma.user.create({ data: input });
    },
    UpdateUser: async (_: undefined, { input }: any) => {
      // Return
      // Types
      // Validation
      return await prisma.user.update({ data: input, where: { id: input.id } });
    },
    DeleteUser: async (_: undefined, { id }: any) => {
      // Return
      // Types
      // Validation
      return await prisma.user.delete({ where: { id: id } });
    }
  }
};

export { UserGraphQLResolver };
