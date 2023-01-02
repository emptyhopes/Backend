import { prisma } from "@/Application/Ship/Prisma/Client/index";

import {
  GetOneRoleInterfaceInput,
  CreateRoleInterfaceInput,
  UpdateRoleInterfaceInput,
  DeleteRoleInterfaceInput,
} from "@/Application/Containers/Roles/Types/RolesTypes";

import {
  CreateRoleValidation,
  UpdateRoleValidation,
  DeleteRoleValidation,
} from "@/Application/Containers/Roles/Validations/RoleGraphQLValidation";

const RoleGraphQLResolver = {
  Query: {
    GetAllRoles: async () => {
      return await prisma.role.findMany();
    },
    GetOneRole: async (_: undefined, { id }: GetOneRoleInterfaceInput) => {
      return await prisma.role.findUnique({ where: { id: Number(id) } });
    },
  },

  Mutation: {
    CreateRole: async (_: undefined, { input }: CreateRoleInterfaceInput) => {
      await CreateRoleValidation({ input: input });

      return await prisma.role.create({ data: input });
    },
    UpdateRole: async (_: undefined, { input }: UpdateRoleInterfaceInput) => {
      await UpdateRoleValidation({ input: input });

      return await prisma.role.update({ data: input, where: { id: input.id } });
    },
    DeleteRole: async (_: undefined, { id }: DeleteRoleInterfaceInput) => {
      await DeleteRoleValidation({ id: id });

      return await prisma.role.delete({ where: { id: Number(id) } });
    },
  },
};

export { RoleGraphQLResolver };
