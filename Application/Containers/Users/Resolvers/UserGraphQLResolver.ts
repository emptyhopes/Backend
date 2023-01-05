import { GraphQLError } from "graphql";

import { prisma } from "@/Application/Ship/Prisma/Client/index";

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
// import { TokenOutputInterface } from "@/Application/Containers/Tokens/Types/TokensTypes";

import { UserGraphQLValidations } from "@/Application/Containers/Users/Validations/UserGraphQLValidation";

const UserGraphQLResolver = {
  Query: {
    GetAllUsers: async () => {
      return await prisma.user.findMany();
    },
    GetAllUsersPagination: async (_: undefined, { input }: GetAllUsersPaginationInputInterface) => {
      return await prisma.user.findMany({
        take: input.take,
        skip: input.skip,
        orderBy: { created_at: "asc" },
      });
    },
    GetOneUserByID: async (_: undefined, { id }: GetOneUserByIDInputInterface) => {
      const data = await UserGraphQLValidations.GetOneUserByIDValidation({ id: id });
      return await prisma.user.findUnique({ where: { id: String(data) } });
    },
    GetOneUserByUsername: async (_: undefined, { username }: GetOneUserByUsernameInputInterface) => {
      const data = await UserGraphQLValidations.GetOneUserByUsernameValidation({ username: username });
      return await prisma.user.findUnique({ where: { username: String(data) } });
    },
    GetOneUserByEmail: async (_: undefined, { email }: GetOneUserByEmailInputInterface) => {
      const data = await UserGraphQLValidations.GetOneUserByEmailValidation({ email: email });
      return await prisma.user.findUnique({ where: { email: String(data) } });
    },
  },

  Mutation: {
    CreateUser: async (_: undefined, { input }: CreateUserInputInterface) => {
      const data = await UserGraphQLValidations.CreateUserValidation({ input: input });

      if (data.role_id) {
        return await prisma.user.create({
          data: { email: data.email, username: data.username, password: data.password, role_id: data.role_id },
        });
      }

      if (!data.role_id) {
        throw new GraphQLError("Error creating user.", { extensions: { code: "INTERNAL_SERVER_ERROR" } });
      }
    },
    UpdateUser: async (_: undefined, { input }: UpdateUserInputInterface) => {
      const data = await UserGraphQLValidations.UpdateUserValidation({ input: input });
      return await prisma.user.update({ data: data, where: { id: String(data.id) } });
    },
    DeleteUserByID: async (_: undefined, { id }: DeleteUserByIDInputInterface) => {
      const data = await UserGraphQLValidations.DeleteUserByIDValidation({ id: id });
      return await prisma.user.delete({ where: { id: String(data) } });
    },
    DeleteUserByUsername: async (_: undefined, { username }: DeleteUserByUsernameInputInterface) => {
      const data = await UserGraphQLValidations.DeleteUserByUsernameValidation({ username: username });
      return await prisma.user.delete({ where: { username: String(data) } });
    },
    DeleteUserByEmail: async (_: undefined, { email }: DeleteUserByEmailInputInterface) => {
      const data = await UserGraphQLValidations.DeleteUserByEmailValidation({ email: email });
      return await prisma.user.delete({ where: { email: String(data) } });
    },
  },

  User: {
    role: async (parent: UserOutputInterface) => {
      return await prisma.role.findUnique({ where: { id: parent.role_id } });
    },
    token: async (parent: UserOutputInterface) => {
      return await prisma.token.findUnique({ where: { user_id: parent.id } });
    },
  },
};

export { UserGraphQLResolver };
