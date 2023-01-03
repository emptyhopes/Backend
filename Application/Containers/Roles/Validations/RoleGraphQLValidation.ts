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
    return input;
  }

  static async GetOneRoleByIDValidation({ id }: GetOneRoleByIDInputInterface) {
    const role = await prisma.role.findUnique({ where: { id: Number(id) } });
    if (!role) throw new GraphQLError("The user does not exist.", { extensions: { code: "BAD_USER_INPUT" } });

    return id;
  }

  static async GetOneRoleByNameValidation({ name }: GetOneRoleByNameInputInterface) {
    const role = await prisma.role.findUnique({ where: { name: String(name) } });
    if (!role) throw new GraphQLError("The user does not exist.", { extensions: { code: "BAD_USER_INPUT" } });

    return name;
  }

  static async CreateRoleValidation({ input }: CreateRoleInputInterface) {
    const role = await prisma.role.findUnique({ where: { name: String(input.name) } });
    if (role) throw new GraphQLError("The user already exists.", { extensions: { code: "BAD_USER_INPUT" } });

    return input;
  }

  static async UpdateRoleValidation({ input }: UpdateRoleInputInterface) {
    const role = await prisma.role.findUnique({ where: { name: String(input.name) } });
    if (role) throw new GraphQLError("The user already exists.", { extensions: { code: "BAD_USER_INPUT" } });

    input.id = Number(input.id);

    return input;
  }

  static async DeleteRoleByIDValidation({ id }: DeleteRoleByIDInputInterface) {
    const role = await prisma.role.findUnique({ where: { id: Number(id) } });
    if (!role) throw new GraphQLError("The user does not exist.", { extensions: { code: "BAD_USER_INPUT" } });

    return id;
  }

  static async DeleteRoleByNameValidation({ name }: DeleteRoleByNameInputInterface) {
    const role = await prisma.role.findUnique({ where: { name: String(name) } });
    if (!role) throw new GraphQLError("The user does not exist.", { extensions: { code: "BAD_USER_INPUT" } });

    return name;
  }
}

export { RoleGraphQLValidations };
