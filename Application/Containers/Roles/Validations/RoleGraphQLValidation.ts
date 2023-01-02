import { GraphQLError } from "graphql";

import { prisma } from "@/Application/Ship/Prisma/Client/index";

import {
  GetAllRolesPaginationInputInterface,
  GetOneRoleByIDInputInterface,
  GetOneRoleByNameInputInterface,
  CreateRoleInputInterface,
  UpdateRoleInputInterface,
  DeleteRoleByIDInputInterface,
  DeleteRoleByNameInputInterface,
} from "@/Application/Containers/Roles/Types/RolesTypes";

class RoleGraphQLValidations extends null {
  static async GetAllRolesPaginationValidation({ input }: GetAllRolesPaginationInputInterface) {
    if (typeof Number(input.take) !== "number") {
      throw new GraphQLError("Ошибка валидации.", { extensions: { code: "BAD_USER_INPUT", http: { status: 400 } } });
    }

    if (typeof Number(input.skip) !== "number") {
      throw new GraphQLError("Ошибка валидации.", { extensions: { code: "BAD_USER_INPUT", http: { status: 400 } } });
    }
  }

  static async GetOneRoleByIDValidation({ id }: GetOneRoleByIDInputInterface) {
    const role = await prisma.role.findUnique({ where: { id: Number(id) } });

    if (!role) {
      throw new GraphQLError("Пользователя не существует.", {
        extensions: { code: "BAD_USER_INPUT", http: { status: 400 } },
      });
    }
  }

  static async GetOneRoleByNameValidation({ name }: GetOneRoleByNameInputInterface) {
    const role = await prisma.role.findUnique({ where: { name: String(name) } });

    if (!role) {
      throw new GraphQLError("Пользователя не существует.", {
        extensions: { code: "BAD_USER_INPUT", http: { status: 400 } },
      });
    }
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
    if (typeof input.name !== "string") {
      throw new GraphQLError("Ошибка валидации.", { extensions: { code: "BAD_USER_INPUT", http: { status: 400 } } });
    }

    const role = await prisma.role.findUnique({ where: { name: String(input.name) } });

    if (role) {
      throw new GraphQLError("Пользователь уже существует.", {
        extensions: { code: "BAD_USER_INPUT", http: { status: 400 } },
      });
    }
  }

  static async DeleteRoleByIDValidation({ id }: DeleteRoleByIDInputInterface) {
    const role = await prisma.role.findUnique({ where: { id: Number(id) } });

    if (!role) {
      throw new GraphQLError("Пользователя не существует.", {
        extensions: { code: "BAD_USER_INPUT", http: { status: 400 } },
      });
    }
  }

  static async DeleteRoleByNameValidation({ name }: DeleteRoleByNameInputInterface) {
    const role = await prisma.role.findUnique({ where: { name: String(name) } });

    if (!role) {
      throw new GraphQLError("Пользователя не существует.", {
        extensions: { code: "BAD_USER_INPUT", http: { status: 400 } },
      });
    }
  }
}

export { RoleGraphQLValidations };
