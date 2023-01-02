import { prisma } from "@/Application/Ship/Prisma/Client/index";

import {
  CreateRoleResponse,
  DeleteRoleResponse,
  GetAllRolesResponse,
} from "@/Application/Containers/Roles/Tests/RolesHelper";

describe("Roles", () => {
  test("Create role", async () => {
    const response = await CreateRoleResponse("ADMIN");

    expect(response.body.kind === "single");

    if (response.body.kind === "single") {
      expect(response.body.singleResult.errors).toBeUndefined();
      expect(response.body.singleResult.data?.CreateRole.name).toEqual("ADMIN");
    }
  });

  test("Delete role", async () => {
    await CreateRoleResponse("ADMIN");

    const response = await DeleteRoleResponse(1);

    expect(response.body.kind === "single");

    if (response.body.kind === "single") {
      expect(response.body.singleResult.errors).toBeUndefined();
      expect(response.body.singleResult.data?.DeleteRole.name).toEqual("ADMIN");
    }
  });

  test("Get all roles", async () => {
    await CreateRoleResponse("ADMIN");

    const response = await GetAllRolesResponse();

    expect(response.body.kind === "single");

    if (response.body.kind === "single") {
      expect(response.body.singleResult.errors).toBeUndefined();
      expect(response.body.singleResult.data?.GetAllRoles[0].name).toEqual("ADMIN");
    }
  });

  beforeEach(async () => await prisma.$executeRaw`TRUNCATE roles RESTART IDENTITY CASCADE;`);
});
