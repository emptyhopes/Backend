import { GraphQLSeeds } from "@/Application/Ship/Seeds/index";

import { UsersResponse } from "@/Application/Containers/Users/Tests/UsersResponse";
import { RolesResponse } from "@/Application/Containers/Roles/Tests/RolesResponse";

describe("Users", () => {
  test("GetAllUsers", async () => {
    const response = await UsersResponse.GetAllUsersResponse();
    expect(response.body.kind === "single");
    if (response.body.kind !== "single") throw new Error();

    expect(response.body.singleResult.errors).toBeUndefined();
    expect(response.body.singleResult.data?.GetAllUsers).not.toEqual(null);
  });

  test("GetAllUsersPagination", async () => {
    const response = await UsersResponse.GetAllUsersPaginationResponse({ input: { take: 0, skip: 0 } });
    expect(response.body.kind === "single");
    if (response.body.kind !== "single") throw new Error();

    expect(response.body.singleResult.errors).toBeUndefined();
    expect(response.body.singleResult.data?.GetAllUsersPagination).not.toEqual(null);
  });

  test("GetOneUserByID", async () => {
    const user = await UsersResponse.GetUserIDByEmail("GetOneUserByID@gmail.com");
    expect(user).not.toBeUndefined();
    if (!user) throw new Error();

    const response = await UsersResponse.GetOneUserByIDResponse({ id: user.id });
    expect(response.body.kind === "single");
    if (response.body.kind !== "single") throw new Error();

    expect(response.body.singleResult.errors).toBeUndefined();
    expect(response.body.singleResult.data?.GetOneUserByID).not.toEqual(null);
    expect(response.body.singleResult.data?.GetOneUserByID.email).toEqual("GetOneUserByID@gmail.com");
  });

  test("GetOneUserByUsername", async () => {
    const response = await UsersResponse.GetOneUserByUsernameResponse({ username: "GetOneUserByUsername" });
    expect(response.body.kind === "single");
    if (response.body.kind !== "single") throw new Error();

    expect(response.body.singleResult.errors).toBeUndefined();
    expect(response.body.singleResult.data?.GetOneUserByUsername).not.toEqual(null);
    expect(response.body.singleResult.data?.GetOneUserByUsername.email).toEqual("GetOneUserByUsername@gmail.com");
  });

  test("GetOneUserByEmail", async () => {
    const response = await UsersResponse.GetOneUserByEmailResponse({ email: "GetOneUserByEmail@gmail.com" });
    expect(response.body.kind === "single");
    if (response.body.kind !== "single") throw new Error();

    expect(response.body.singleResult.errors).toBeUndefined();
    expect(response.body.singleResult.data?.GetOneUserByEmail).not.toEqual(null);
    expect(response.body.singleResult.data?.GetOneUserByEmail.email).toEqual("GetOneUserByEmail@gmail.com");
  });

  test("CreateUser", async () => {
    const response = await UsersResponse.CreateUserResponse({
      input: { email: "CreateUser@gmail.com", username: "CreateUser", password: "CreateUser" },
    });
    expect(response.body.kind === "single");
    if (response.body.kind !== "single") throw new Error();

    expect(response.body.singleResult.errors).toBeUndefined();
    expect(response.body.singleResult.data?.CreateUser).not.toEqual(null);
    expect(response.body.singleResult.data?.CreateUser.email).toEqual("CreateUser@gmail.com");
  });

  test("UpdateUser", async () => {
    const user = await UsersResponse.GetUserIDByEmail("UpdateUser@gmail.com");
    expect(user).not.toBeUndefined();
    if (!user) throw new Error();

    const role = await RolesResponse.GetRoleIDByName("UpdateUser");
    expect(role).not.toBeUndefined();
    if (!role) throw new Error();

    const response = await UsersResponse.UpdateUserResponse({
      input: {
        id: user.id,
        email: "UpdatedUser@gmail.com",
        username: "UpdatedUser",
        password: "UpdatedUser",
        role_id: Number(role.id),
      },
    });
    expect(response.body.kind === "single");
    if (response.body.kind !== "single") throw new Error();

    expect(response.body.singleResult.errors).toBeUndefined();
    expect(response.body.singleResult.data?.UpdateUser).not.toEqual(null);
    expect(response.body.singleResult.data?.UpdateUser.email).toEqual("UpdatedUser@gmail.com");
    expect(response.body.singleResult.data?.UpdateUser.username).toEqual("UpdatedUser");
    expect(response.body.singleResult.data?.UpdateUser.password).toEqual("UpdatedUser");
  });

  test("DeleteUserByID", async () => {
    const user = await UsersResponse.GetUserIDByEmail("DeleteUserByID@gmail.com");
    expect(user).not.toBeUndefined();
    if (!user) throw new Error();

    const response = await UsersResponse.DeleteUserByIDResponse({ id: String(user.id) });
    expect(response.body.kind === "single");
    if (response.body.kind !== "single") throw new Error();

    expect(response.body.singleResult.errors).toBeUndefined();
    expect(response.body.singleResult.data?.DeleteUserByID).not.toEqual(null);
    expect(response.body.singleResult.data?.DeleteUserByID.email).toEqual("DeleteUserByID@gmail.com");
  });

  test("DeleteUserByUsername", async () => {
    const response = await UsersResponse.DeleteUserByUsernameResponse({ username: "DeleteUserByUsername" });
    expect(response.body.kind === "single");
    if (response.body.kind !== "single") throw new Error();

    expect(response.body.singleResult.errors).toBeUndefined();
    expect(response.body.singleResult.data?.DeleteUserByUsername).not.toEqual(null);
    expect(response.body.singleResult.data?.DeleteUserByUsername.email).toEqual("DeleteUserByUsername@gmail.com");
  });

  test("DeleteUserByEmail", async () => {
    const response = await UsersResponse.DeleteUserByEmailResponse({ email: "DeleteUserByEmail@gmail.com" });
    expect(response.body.kind === "single");
    if (response.body.kind !== "single") throw new Error();

    expect(response.body.singleResult.errors).toBeUndefined();
    expect(response.body.singleResult.data?.DeleteUserByEmail).not.toEqual(null);
    expect(response.body.singleResult.data?.DeleteUserByEmail.email).toEqual("DeleteUserByEmail@gmail.com");
  });

  beforeAll(async () => {
    await GraphQLSeeds.Init();

    await UsersResponse.CreateUserResponse({
      input: {
        email: "GetOneUserByID@gmail.com",
        username: "GetOneUserByID",
        password: "GetOneUserByID",
      },
    });
    await UsersResponse.CreateUserResponse({
      input: {
        email: "GetOneUserByUsername@gmail.com",
        username: "GetOneUserByUsername",
        password: "GetOneUserByUsername",
      },
    });
    await UsersResponse.CreateUserResponse({
      input: {
        email: "GetOneUserByEmail@gmail.com",
        username: "GetOneUserByEmail",
        password: "GetOneUserByEmail",
      },
    });
    await UsersResponse.CreateUserResponse({
      input: {
        email: "UpdateUser@gmail.com",
        username: "UpdateUser",
        password: "UpdateUser",
      },
    });
    await RolesResponse.CreateRoleResponse({ input: { name: "UpdateUser" } });
    await UsersResponse.CreateUserResponse({
      input: {
        email: "DeleteUserByID@gmail.com",
        username: "DeleteUserByID",
        password: "DeleteUserByID",
      },
    });
    await UsersResponse.CreateUserResponse({
      input: {
        email: "DeleteUserByUsername@gmail.com",
        username: "DeleteUserByUsername",
        password: "DeleteUserByUsername",
      },
    });
    await UsersResponse.CreateUserResponse({
      input: {
        email: "DeleteUserByEmail@gmail.com",
        username: "DeleteUserByEmail",
        password: "DeleteUserByEmail",
      },
    });
  });

  afterAll(async () => {
    await UsersResponse.DeleteUserByEmailResponse({ email: "GetOneUserByID@gmail.com" });
    await UsersResponse.DeleteUserByEmailResponse({ email: "GetOneUserByUsername@gmail.com" });
    await UsersResponse.DeleteUserByEmailResponse({ email: "GetOneUserByEmail@gmail.com" });
    await UsersResponse.DeleteUserByEmailResponse({ email: "CreateUser@gmail.com" });
    await UsersResponse.DeleteUserByEmailResponse({ email: "UpdatedUser@gmail.com" });
    await RolesResponse.DeleteRoleByNameResponse({ name: "UpdateUser" });
  });
});
