import { RolesResponse } from "@/Application/Containers/Roles/Tests/RolesResponse";

describe("Roles", () => {
  test("Create role", async () => {
    const response = await RolesResponse.CreateRoleResponse("TEST");

    expect(response.body.kind === "single");

    if (response.body.kind === "single") {
      expect(response.body.singleResult.errors).toBeUndefined();
      expect(response.body.singleResult.data?.CreateRole.name).toEqual("TEST");
    }
  });

  test("Delete role", async () => {
    await RolesResponse.CreateRoleResponse("TEST");

    const response = await RolesResponse.DeleteRoleResponse(1);

    expect(response.body.kind === "single");

    if (response.body.kind === "single") {
      expect(response.body.singleResult.errors).toBeUndefined();
      expect(response.body.singleResult.data?.DeleteRole.name).toEqual("TEST");
    }
  });

  test("Get all roles", async () => {
    await RolesResponse.CreateRoleResponse("TEST");

    const response = await RolesResponse.GetAllRolesResponse();

    expect(response.body.kind === "single");

    if (response.body.kind === "single") {
      expect(response.body.singleResult.errors).toBeUndefined();

      const roles = response.body.singleResult.data?.GetAllRoles;

      let find = false;

      if (roles) {
        for (let index = 0; index < roles.length; index++) {
          if (roles[index].name === "TEST") find = true;
        }
      }

      expect(find).toEqual(true);
    }
  });
});
