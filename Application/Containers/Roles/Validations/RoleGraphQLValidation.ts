import { prisma } from "@/Application/Ship/Prisma/Client/index";

import {
  CreateRoleInterfaceInput,
  UpdateRoleInterfaceInput,
  DeleteRoleInterfaceInput,
} from "@/Application/Containers/Roles/Types/RolesTypes";

const CreateRoleValidation = async ({ input }: CreateRoleInterfaceInput) => {
  const role = await prisma.role.findUnique({ where: { name: String(input.name) } });

  if (typeof input.name !== "string") throw new Error("Ошибка валидации.");

  if (role) throw new Error("Пользователь уже существует.");
};

const UpdateRoleValidation = async ({ input }: UpdateRoleInterfaceInput) => {
  return input;
};

const DeleteRoleValidation = async ({ id }: DeleteRoleInterfaceInput) => {
  return id;
};

export { CreateRoleValidation, UpdateRoleValidation, DeleteRoleValidation };
