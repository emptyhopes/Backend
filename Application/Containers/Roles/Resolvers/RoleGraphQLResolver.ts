import { prisma } from "@/Application/Ship/Prisma/Client/index";

import {
  GetOneRoleByIDInputInterface,
  GetOneRoleByNameInputInterface,
  CreateRoleInputInterface,
  UpdateRoleInputInterface,
  DeleteRoleByIDInputInterface,
  DeleteRoleByNameInputInterface,
} from "@/Application/Containers/Roles/Types/RolesTypes";

import { RoleGraphQLValidations } from "@/Application/Containers/Roles/Validations/RoleGraphQLValidation";

const RoleGraphQLResolver = {
  Query: {
    GetAllRoles: async () => {
      return await prisma.role.findMany();
    },
    GetOneRole: async (_: undefined, { id }: GetOneRoleByIDInputInterface) => {
      return await prisma.role.findUnique({ where: { id: Number(id) } });
    },
    GetOneRoleByName: async (_: undefined, { name }: GetOneRoleByNameInputInterface) => {
      return await prisma.role.findUnique({ where: { name: String(name) } });
    },
  },

  Mutation: {
    CreateRole: async (_: undefined, { input }: CreateRoleInputInterface) => {
      await RoleGraphQLValidations.CreateRoleValidation({ input: input });

      return await prisma.role.create({ data: input });
    },
    UpdateRole: async (_: undefined, { input }: UpdateRoleInputInterface) => {
      await RoleGraphQLValidations.UpdateRoleValidation({ input: input });

      return await prisma.role.update({ data: input, where: { id: input.id } });
    },
    DeleteRoleByID: async (_: undefined, { id }: DeleteRoleByIDInputInterface) => {
      await RoleGraphQLValidations.DeleteRoleByIDValidation({ id: id });

      return await prisma.role.delete({ where: { id: Number(id) } });
    },
    DeleteRoleByName: async (_: undefined, { name }: DeleteRoleByNameInputInterface) => {
      await RoleGraphQLValidations.DeleteRoleByNameValidation({ name: name });

      return await prisma.role.delete({ where: { name: String(name) } });
    },
  },
};

export { RoleGraphQLResolver };
