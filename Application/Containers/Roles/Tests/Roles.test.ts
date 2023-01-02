import { RolesResponse } from "@/Application/Containers/Roles/Tests/RolesResponse";

describe("Roles", () => {
  test("Get all roles", async () => {
    await RolesResponse.CreateRoleResponse({ input: { name: "TEST" } });

    const role = await RolesResponse.GetRoleID("TEST");
    expect(role?.name).toEqual("TEST");

    const response = await RolesResponse.GetAllRolesResponse();
    expect(response.body.kind === "single");

    if (response.body.kind === "single") {
      expect(response.body.singleResult.errors).toBeUndefined();
      expect(response.body.singleResult.data?.GetAllRoles).not.toEqual(null);
    }

    await RolesResponse.DeleteRoleByNameResponse({ name: "TEST" });
  });

  test("Get all roles pagination", async () => {
    const roles = await RolesResponse.GetAllRolesResponse();

    await RolesResponse.CreateRoleResponse({ input: { name: "TEST1" } });
    await RolesResponse.CreateRoleResponse({ input: { name: "TEST2" } });

    if (roles.body.kind === "single") {
      expect(roles.body.singleResult.errors).toBeUndefined();
      expect(roles.body.singleResult.data?.GetAllRoles).not.toEqual(null);

      const length = roles.body.singleResult.data?.GetAllRoles.length;

      const RoleFirst = await RolesResponse.GetRoleID("TEST1");
      expect(RoleFirst?.name).toEqual("TEST1");
      const RoleSecond = await RolesResponse.GetRoleID("TEST2");
      expect(RoleSecond?.name).toEqual("TEST2");

      const response = await RolesResponse.GetAllRolesPaginationResponse({ input: { take: 2, skip: Number(length) } });
      expect(response.body.kind === "single");

      if (response.body.kind === "single") {
        expect(response.body.singleResult.errors).toBeUndefined();
        expect(response.body.singleResult.data?.GetAllRolesPagination).not.toEqual(null);
        expect(response.body.singleResult.data?.GetAllRolesPagination[0].name).toEqual("TEST1");
        expect(response.body.singleResult.data?.GetAllRolesPagination[1].name).toEqual("TEST2");
      }
    }

    await RolesResponse.DeleteRoleByNameResponse({ name: "TEST1" });
    await RolesResponse.DeleteRoleByNameResponse({ name: "TEST2" });
  });

  test("Get one role by id", async () => {
    await RolesResponse.CreateRoleResponse({ input: { name: "TEST" } });

    const role = await RolesResponse.GetRoleID("TEST");
    expect(role?.name).toEqual("TEST");

    if (role) {
      const response = await RolesResponse.GetOneRoleByIDResponse({ id: role.id });
      expect(response.body.kind === "single");

      if (response.body.kind === "single") {
        expect(response.body.singleResult.errors).toBeUndefined();
        expect(response.body.singleResult.data?.GetOneRoleByID).not.toEqual(null);
        expect(response.body.singleResult.data?.GetOneRoleByID.name).toEqual("TEST");
      }
    }

    await RolesResponse.DeleteRoleByNameResponse({ name: "TEST" });
  });

  test("Get one role by name", async () => {
    await RolesResponse.CreateRoleResponse({ input: { name: "TEST" } });

    const response = await RolesResponse.GetOneRoleByNameResponse({ name: "TEST" });
    expect(response.body.kind === "single");

    if (response.body.kind === "single") {
      expect(response.body.singleResult.errors).toBeUndefined();
      expect(response.body.singleResult.data?.GetOneRoleByName).not.toEqual(null);
      expect(response.body.singleResult.data?.GetOneRoleByName.name).toEqual("TEST");
    }

    await RolesResponse.DeleteRoleByNameResponse({ name: "TEST" });
  });

  test("Create role", async () => {
    const response = await RolesResponse.CreateRoleResponse({ input: { name: "TEST" } });
    expect(response.body.kind === "single");

    if (response.body.kind === "single") {
      expect(response.body.singleResult.errors).toBeUndefined();
      expect(response.body.singleResult.data?.CreateRole).not.toEqual(null);
      expect(response.body.singleResult.data?.CreateRole.name).toEqual("TEST");
    }

    await RolesResponse.DeleteRoleByNameResponse({ name: "TEST" });
  });

  test("Update role", async () => {
    await RolesResponse.CreateRoleResponse({ input: { name: "TEST" } });

    const role = await RolesResponse.GetRoleID("TEST");
    expect(role?.name).toEqual("TEST");

    if (role) {
      const response = await RolesResponse.UpdateRoleResponse({
        input: { id: Number(role.id), name: "TESTTEST" },
      });
      expect(response.body.kind === "single");

      if (response.body.kind === "single") {
        expect(response.body.singleResult.errors).toBeUndefined();
        expect(response.body.singleResult.data?.UpdateRole).not.toEqual(null);
        expect(response.body.singleResult.data?.UpdateRole.name).toEqual("TESTTEST");
      }
    }

    await RolesResponse.DeleteRoleByNameResponse({ name: "TESTTEST" });
  });

  test("Delete role by id", async () => {
    await RolesResponse.CreateRoleResponse({ input: { name: "TEST" } });

    const role = await RolesResponse.GetRoleID("TEST");
    expect(role?.name).toEqual("TEST");

    if (role) {
      const response = await RolesResponse.DeleteRoleByIDResponse({ id: Number(role.id) });
      expect(response.body.kind === "single");

      if (response.body.kind === "single") {
        expect(response.body.singleResult.errors).toBeUndefined();
        expect(response.body.singleResult.data?.DeleteRoleByID).not.toEqual(null);
        expect(response.body.singleResult.data?.DeleteRoleByID.name).toEqual("TEST");
      }
    }

    await RolesResponse.DeleteRoleByNameResponse({ name: "TEST" });
  });

  test("Delete role by name", async () => {
    await RolesResponse.CreateRoleResponse({ input: { name: "TEST" } });

    const response = await RolesResponse.DeleteRoleByNameResponse({ name: "TEST" });
    expect(response.body.kind === "single");

    if (response.body.kind === "single") {
      expect(response.body.singleResult.errors).toBeUndefined();
      expect(response.body.singleResult.data?.DeleteRoleByName).not.toEqual(null);
      expect(response.body.singleResult.data?.DeleteRoleByName.name).toEqual("TEST");
    }

    const role = await RolesResponse.GetOneRoleByNameResponse({ name: "TEST" });

    if (role.body.kind === "single") {
      expect(role.body.singleResult.errors).not.toEqual(undefined);

      if (role.body.singleResult.errors) {
        expect(role.body.singleResult.errors[0].message).toEqual("Пользователя не существует.");
      }

      expect(role.body.singleResult.data?.GetOneRoleByName).toEqual(null);
    }

    await RolesResponse.DeleteRoleByNameResponse({ name: "TEST" });
  });

  afterEach(async () => {
    await RolesResponse.ClearRoleID();
  });
});
