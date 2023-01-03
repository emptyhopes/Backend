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
} from "@/Application/Containers/Users/Types/UsersTypes";

class UserGraphQLValidations extends null {
  static async GetAllUsersPaginationValidation({ input }: GetAllUsersPaginationInputInterface) {
    return input;
  }

  static async GetOneUserByIDValidation({ id }: GetOneUserByIDInputInterface) {
    const user = await prisma.user.findUnique({ where: { id: String(id) } });
    if (!user) throw new GraphQLError("The user does not exist.", { extensions: { code: "BAD_USER_INPUT" } });

    return id;
  }

  static async GetOneUserByUsernameValidation({ username }: GetOneUserByUsernameInputInterface) {
    const user = await prisma.user.findUnique({ where: { username: String(username) } });
    if (!user) throw new GraphQLError("The user does not exist.", { extensions: { code: "BAD_USER_INPUT" } });

    return username;
  }

  static async GetOneUserByEmailValidation({ email }: GetOneUserByEmailInputInterface) {
    const user = await prisma.user.findUnique({ where: { email: String(email) } });
    if (!user) throw new GraphQLError("The user does not exist.", { extensions: { code: "BAD_USER_INPUT" } });

    return email;
  }

  static async CreateUserValidation({ input }: CreateUserInputInterface) {
    const email = await prisma.user.findUnique({ where: { email: input.email } });
    if (email) throw new GraphQLError("The email already exists.", { extensions: { code: "BAD_USER_INPUT" } });
    const username = await prisma.user.findUnique({ where: { username: input.username } });
    if (username) throw new GraphQLError("The username already exists.", { extensions: { code: "BAD_USER_INPUT" } });

    if (!input.role_id) {
      const role = await prisma.role.findUnique({ where: { name: "USER" } });
      if (role) input.role_id = role.id;
    }

    if (input.role_id) {
      const role = await prisma.role.findUnique({ where: { id: input.role_id } });
      if (!role) {
        throw new GraphQLError("The role you specified does not exist.", { extensions: { code: "BAD_USER_INPUT" } });
      }
    }

    return input;
  }

  static async UpdateUserValidation({ input }: UpdateUserInputInterface) {
    const email = await prisma.user.findUnique({ where: { email: input.email } });
    if (email) throw new GraphQLError("The email already exists.", { extensions: { code: "BAD_USER_INPUT" } });
    const username = await prisma.user.findUnique({ where: { username: input.username } });
    if (username) throw new GraphQLError("The username already exists.", { extensions: { code: "BAD_USER_INPUT" } });

    return input;
  }

  static async DeleteUserByIDValidation({ id }: DeleteUserByIDInputInterface) {
    const user = await prisma.user.findUnique({ where: { id: String(id) } });
    if (!user) throw new GraphQLError("The user does not exist.", { extensions: { code: "BAD_USER_INPUT" } });

    return id;
  }

  static async DeleteUserByUsernameValidation({ username }: DeleteUserByUsernameInputInterface) {
    const user = await prisma.user.findUnique({ where: { username: String(username) } });
    if (!user) throw new GraphQLError("The user does not exist.", { extensions: { code: "BAD_USER_INPUT" } });

    return username;
  }

  static async DeleteUserByEmailValidation({ email }: DeleteUserByEmailInputInterface) {
    const user = await prisma.user.findUnique({ where: { email: String(email) } });
    if (!user) throw new GraphQLError("The user does not exist.", { extensions: { code: "BAD_USER_INPUT" } });

    return email;
  }
}

export { UserGraphQLValidations };
