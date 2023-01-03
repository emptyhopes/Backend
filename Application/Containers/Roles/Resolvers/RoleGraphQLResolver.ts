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

import { RoleGraphQLValidations } from "@/Application/Containers/Roles/Validations/RoleGraphQLValidation";

const RoleGraphQLResolver = {
  Query: {
    GetAllRoles: async () => {
      return await prisma.role.findMany();
    },
    GetAllRolesPagination: async (_: undefined, { input }: GetAllRolesPaginationInputInterface) => {
      return await prisma.role.findMany({ take: input.take, skip: input.skip, orderBy: { id: "asc" } });
    },
    GetOneRoleByID: async (_: undefined, { id }: GetOneRoleByIDInputInterface) => {
      const data = await RoleGraphQLValidations.GetOneRoleByIDValidation({ id: id });
      return await prisma.role.findUnique({ where: { id: Number(data) } });
    },
    GetOneRoleByName: async (_: undefined, { name }: GetOneRoleByNameInputInterface) => {
      const data = await RoleGraphQLValidations.GetOneRoleByNameValidation({ name: name });
      return await prisma.role.findUnique({ where: { name: String(data) } });
    },
  },

  Mutation: {
    CreateRole: async (_: undefined, { input }: CreateRoleInputInterface) => {
      const data = await RoleGraphQLValidations.CreateRoleValidation({ input: input });
      return await prisma.role.create({ data: data });
    },
    UpdateRole: async (_: undefined, { input }: UpdateRoleInputInterface) => {
      const data = await RoleGraphQLValidations.UpdateRoleValidation({ input: input });
      return await prisma.role.update({ data: data, where: { id: Number(data.id) } });
    },
    DeleteRoleByID: async (_: undefined, { id }: DeleteRoleByIDInputInterface) => {
      const data = await RoleGraphQLValidations.DeleteRoleByIDValidation({ id: id });
      return await prisma.role.delete({ where: { id: Number(data) } });
    },
    DeleteRoleByName: async (_: undefined, { name }: DeleteRoleByNameInputInterface) => {
      const data = await RoleGraphQLValidations.DeleteRoleByNameValidation({ name: name });
      return await prisma.role.delete({ where: { name: String(data) } });
    },
  },
};

export { RoleGraphQLResolver };
