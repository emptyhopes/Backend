import { GraphQLSeeds } from "@/Application/Ship/Seeds/index";

import { RolesResponse } from "@/Application/Containers/Roles/Tests/RolesResponse";

describe("Roles", () => {
  test("GetAllRoles", async () => {
    const response = await RolesResponse.GetAllRolesResponse();
    expect(response.body.kind === "single");
    if (response.body.kind !== "single") throw new Error();

    expect(response.body.singleResult.errors).toBeUndefined();
    expect(response.body.singleResult.data?.GetAllRoles).not.toEqual(null);
  });

  test("GetAllRolesPagination", async () => {
    const response = await RolesResponse.GetAllRolesPaginationResponse({ input: { take: 0, skip: 0 } });
    expect(response.body.kind === "single");
    if (response.body.kind !== "single") throw new Error();

    expect(response.body.singleResult.errors).toBeUndefined();
    expect(response.body.singleResult.data?.GetAllRolesPagination).not.toEqual(null);
  });

  test("GetOneRoleByID", async () => {
    const role = await RolesResponse.GetRoleIDByName("GetOneRoleByID");
    expect(role).not.toBeUndefined();
    if (!role) throw new Error();

    const response = await RolesResponse.GetOneRoleByIDResponse({ id: role.id });
    expect(response.body.kind === "single");
    if (response.body.kind !== "single") throw new Error();

    expect(response.body.singleResult.errors).toBeUndefined();
    expect(response.body.singleResult.data?.GetOneRoleByID).not.toEqual(null);
    expect(response.body.singleResult.data?.GetOneRoleByID.name).toEqual("GetOneRoleByID");
  });

  test("GetOneRoleByName", async () => {
    const response = await RolesResponse.GetOneRoleByNameResponse({ name: "GetOneRoleByName" });
    expect(response.body.kind === "single");
    if (response.body.kind !== "single") throw new Error();

    expect(response.body.singleResult.errors).toBeUndefined();
    expect(response.body.singleResult.data?.GetOneRoleByName).not.toEqual(null);
    expect(response.body.singleResult.data?.GetOneRoleByName.name).toEqual("GetOneRoleByName");
  });

  test("CreateRole", async () => {
    const response = await RolesResponse.CreateRoleResponse({ input: { name: "CreateRole" } });
    expect(response.body.kind === "single");
    if (response.body.kind !== "single") throw new Error();

    expect(response.body.singleResult.errors).toBeUndefined();
    expect(response.body.singleResult.data?.CreateRole).not.toEqual(null);
    expect(response.body.singleResult.data?.CreateRole.name).toEqual("CreateRole");
  });

  test("UpdateRole", async () => {
    const role = await RolesResponse.GetRoleIDByName("UpdateRole");
    expect(role).not.toBeUndefined();
    if (!role) throw new Error();

    const response = await RolesResponse.UpdateRoleResponse({ input: { id: role.id, name: "UpdatedRole" } });
    expect(response.body.kind === "single");
    if (response.body.kind !== "single") throw new Error();

    expect(response.body.singleResult.errors).toBeUndefined();
    expect(response.body.singleResult.data?.UpdateRole).not.toEqual(null);
    expect(response.body.singleResult.data?.UpdateRole.name).toEqual("UpdatedRole");
  });

  test("DeleteRoleByID", async () => {
    const role = await RolesResponse.GetRoleIDByName("DeleteRoleByID");
    expect(role).not.toBeUndefined();
    if (!role) throw new Error();

    const response = await RolesResponse.DeleteRoleByIDResponse({ id: role.id });
    expect(response.body.kind === "single");
    if (response.body.kind !== "single") throw new Error();

    expect(response.body.singleResult.errors).toBeUndefined();
    expect(response.body.singleResult.data?.DeleteRoleByID).not.toEqual(null);
    expect(response.body.singleResult.data?.DeleteRoleByID.name).toEqual("DeleteRoleByID");
  });

  test("DeleteRoleByName", async () => {
    const response = await RolesResponse.DeleteRoleByNameResponse({ name: "DeleteRoleByName" });
    expect(response.body.kind === "single");
    if (response.body.kind !== "single") throw new Error();

    expect(response.body.singleResult.errors).toBeUndefined();
    expect(response.body.singleResult.data?.DeleteRoleByName).not.toEqual(null);
    expect(response.body.singleResult.data?.DeleteRoleByName.name).toEqual("DeleteRoleByName");
  });

  beforeAll(async () => {
    await GraphQLSeeds.Init();

    await RolesResponse.CreateRoleResponse({ input: { name: "GetOneRoleByID" } });
    await RolesResponse.CreateRoleResponse({ input: { name: "GetOneRoleByName" } });
    await RolesResponse.CreateRoleResponse({ input: { name: "UpdateRole" } });
    await RolesResponse.CreateRoleResponse({ input: { name: "DeleteRoleByID" } });
    await RolesResponse.CreateRoleResponse({ input: { name: "DeleteRoleByName" } });
  });

  afterAll(async () => {
    await RolesResponse.DeleteRoleByNameResponse({ name: "GetOneRoleByID" });
    await RolesResponse.DeleteRoleByNameResponse({ name: "GetOneRoleByName" });
    await RolesResponse.DeleteRoleByNameResponse({ name: "CreateRole" });
    await RolesResponse.DeleteRoleByNameResponse({ name: "UpdatedRole" });
  });
});
