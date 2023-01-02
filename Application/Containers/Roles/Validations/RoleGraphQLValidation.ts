import { GraphQLError } from "graphql";

import { prisma } from "@/Application/Ship/Prisma/Client/index";

import {
  GetOneRoleByIDInputInterface,
  GetOneRoleByNameInputInterface,
  CreateRoleInputInterface,
  UpdateRoleInputInterface,
  DeleteRoleByIDInputInterface,
  DeleteRoleByNameInputInterface,
} from "@/Application/Containers/Roles/Types/RolesTypes";

class RoleGraphQLValidations extends null {
  static async GetOneRoleByIDValidation({ id }: GetOneRoleByIDInputInterface) {
    return id;
  }

  static async GetOneRoleByNameValidation({ name }: GetOneRoleByNameInputInterface) {
    return name;
  }

  static async CreateRoleValidation({ input }: CreateRoleInputInterface) {
    const role = await prisma.role.findUnique({ where: { name: String(input.name) } });

    if (typeof input.name !== "string") {
      throw new GraphQLError("Ошибка валидации.", { extensions: { code: "BAD_USER_INPUT", http: { status: 400 } } });
    }
    if (role) {
      throw new GraphQLError("Пользователь уже существует.", {
        extensions: { code: "BAD_USER_INPUT", http: { status: 400 } },
      });
    }
  }

  static async UpdateRoleValidation({ input }: UpdateRoleInputInterface) {
    return input;
  }

  static async DeleteRoleByIDValidation({ id }: DeleteRoleByIDInputInterface) {
    return id;
  }

  static async DeleteRoleByNameValidation({ name }: DeleteRoleByNameInputInterface) {
    return name;
  }
}

export { RoleGraphQLValidations };
