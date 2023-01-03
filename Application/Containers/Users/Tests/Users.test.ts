import { GraphQLSeeds } from "@/Application/Ship/Seeds/index";

import { UsersResponse } from "@/Application/Containers/Users/Tests/UsersResponse";
import { RolesResponse } from "@/Application/Containers/Roles/Tests/RolesResponse";

describe("Users", () => {
  test("GetAllUsers", async () => {
    const response = await UsersResponse.GetAllUsersResponse();
    expect(response.body.kind === "single");
    if (response.body.kind !== "single") return;

    expect(response.body.singleResult.errors).toBeUndefined();
    expect(response.body.singleResult.data?.GetAllUsers).not.toEqual(null);
  });

  // test("GetAllUsersPagination", async () => {
  //   const length = (await UsersResponse.GetCountUsers()) - 9;
  //   const response = await UsersResponse.GetAllUsersPaginationResponse({ input: { take: 2, skip: length } });
  //   expect(response.body.kind === "single");
  //   if (response.body.kind !== "single") return;

  //   expect(response.body.singleResult.errors).toBeUndefined();
  //   expect(response.body.singleResult.data?.GetAllUsersPagination).not.toEqual(null);
  //   expect(response.body.singleResult.data?.GetAllUsersPagination[0]?.email).toEqual(
  //     "FirstGetAllUsersPagination@gmail.com",
  //   );
  //   expect(response.body.singleResult.data?.GetAllUsersPagination[1]?.email).toEqual(
  //     "SecondGetAllUsersPagination@gmail.com",
  //   );
  // });

  test("GetOneUserByID", async () => {
    const user = await UsersResponse.GetUserIDByEmail("GetOneUserByID@gmail.com");
    if (!user) return;

    const response = await UsersResponse.GetOneUserByIDResponse({ id: user.id });
    expect(response.body.kind === "single");
    if (response.body.kind !== "single") return;

    expect(response.body.singleResult.errors).toBeUndefined();
    expect(response.body.singleResult.data?.GetOneUserByID).not.toEqual(null);
    expect(response.body.singleResult.data?.GetOneUserByID.email).toEqual("GetOneUserByID@gmail.com");
  });

  test("GetOneUserByUsername", async () => {
    const response = await UsersResponse.GetOneUserByUsernameResponse({ username: "GetOneUserByUsername" });
    expect(response.body.kind === "single");
    if (response.body.kind !== "single") return;

    expect(response.body.singleResult.errors).toBeUndefined();
    expect(response.body.singleResult.data?.GetOneUserByUsername).not.toEqual(null);
    expect(response.body.singleResult.data?.GetOneUserByUsername.email).toEqual("GetOneUserByUsername@gmail.com");
  });

  test("GetOneUserByEmail", async () => {
    const response = await UsersResponse.GetOneUserByEmailResponse({ email: "GetOneUserByEmail@gmail.com" });
    expect(response.body.kind === "single");
    if (response.body.kind !== "single") return;

    expect(response.body.singleResult.errors).toBeUndefined();
    expect(response.body.singleResult.data?.GetOneUserByEmail).not.toEqual(null);
    expect(response.body.singleResult.data?.GetOneUserByEmail.email).toEqual("GetOneUserByEmail@gmail.com");
  });

  test("CreateUser", async () => {
    const response = await UsersResponse.CreateUserResponse({
      input: { email: "CreateUser@gmail.com", username: "CreateUser", password: "CreateUser" },
    });
    expect(response.body.kind === "single");
    if (response.body.kind !== "single") return;

    expect(response.body.singleResult.errors).toBeUndefined();
    expect(response.body.singleResult.data?.CreateUser).not.toEqual(null);
    expect(response.body.singleResult.data?.CreateUser.email).toEqual("CreateUser@gmail.com");
  });

  test("UpdateUser", async () => {
    const user = await UsersResponse.GetUserIDByEmail("UpdateUser@gmail.com");
    const role = await RolesResponse.GetRoleIDByName("UpdateUser");

    if (!user) return;
    if (!role) return;

    const response = await UsersResponse.UpdateUserResponse({
      input: {
        id: user.id,
        email: "UpdatedUser@gmail.com",
        username: "UpdatedUser",
        password: "UpdatedUser",
        is_activated: true,
        role_id: Number(role.id),
      },
    });
    expect(response.body.kind === "single");
    if (response.body.kind !== "single") return;

    expect(response.body.singleResult.errors).toBeUndefined();
    expect(response.body.singleResult.data?.UpdateUser).not.toEqual(null);
    expect(response.body.singleResult.data?.UpdateUser.email).toEqual("UpdatedUser@gmail.com");
    expect(response.body.singleResult.data?.UpdateUser.username).toEqual("UpdatedUser");
    expect(response.body.singleResult.data?.UpdateUser.password).toEqual("UpdatedUser");
    expect(response.body.singleResult.data?.UpdateUser.is_activated).toEqual(true);
  });

  test("DeleteUserByID", async () => {
    const user = await UsersResponse.GetUserIDByEmail("DeleteUserByID@gmail.com");
    if (!user) return;

    const response = await UsersResponse.DeleteUserByIDResponse({ id: String(user.id) });
    expect(response.body.kind === "single");
    if (response.body.kind !== "single") return;

    expect(response.body.singleResult.errors).toBeUndefined();
    expect(response.body.singleResult.data?.DeleteUserByID).not.toEqual(null);
    expect(response.body.singleResult.data?.DeleteUserByID.email).toEqual("DeleteUserByID@gmail.com");
  });

  test("DeleteUserByUsername", async () => {
    const response = await UsersResponse.DeleteUserByUsernameResponse({ username: "DeleteUserByUsername" });
    expect(response.body.kind === "single");
    if (response.body.kind !== "single") return;

    expect(response.body.singleResult.errors).toBeUndefined();
    expect(response.body.singleResult.data?.DeleteUserByUsername).not.toEqual(null);
    expect(response.body.singleResult.data?.DeleteUserByUsername.email).toEqual("DeleteUserByUsername@gmail.com");
  });

  test("DeleteUserByEmail", async () => {
    const response = await UsersResponse.DeleteUserByEmailResponse({ email: "DeleteUserByEmail@gmail.com" });
    expect(response.body.kind === "single");
    if (response.body.kind !== "single") return;

    expect(response.body.singleResult.errors).toBeUndefined();
    expect(response.body.singleResult.data?.DeleteUserByEmail).not.toEqual(null);
    expect(response.body.singleResult.data?.DeleteUserByEmail.email).toEqual("DeleteUserByEmail@gmail.com");
  });

  beforeAll(async () => {
    await GraphQLSeeds.Init();
    // await UsersResponse.CreateUserResponse({
    //   input: {
    //     email: "FirstGetAllUsersPagination@gmail.com",
    //     username: "FirstGetAllUsersPagination",
    //     password: "FirstGetAllUsersPagination",
    //   },
    // });
    // await UsersResponse.CreateUserResponse({
    //   input: {
    //     email: "SecondGetAllUsersPagination@gmail.com",
    //     username: "SecondGetAllUsersPagination",
    //     password: "SecondGetAllUsersPagination",
    //   },
    // });
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
    // await UsersResponse.DeleteUserByEmailResponse({ email: "FirstGetAllUsersPagination@gmail.com" });
    // await UsersResponse.DeleteUserByEmailResponse({ email: "SecondGetAllUsersPagination@gmail.com" });
    await UsersResponse.DeleteUserByEmailResponse({ email: "GetOneUserByID@gmail.com" });
    await UsersResponse.DeleteUserByEmailResponse({ email: "GetOneUserByUsername@gmail.com" });
    await UsersResponse.DeleteUserByEmailResponse({ email: "GetOneUserByEmail@gmail.com" });
    await UsersResponse.DeleteUserByEmailResponse({ email: "CreateUser@gmail.com" });
    await UsersResponse.DeleteUserByEmailResponse({ email: "UpdatedUser@gmail.com" });
    await RolesResponse.DeleteRoleByNameResponse({ name: "UpdateUser" });
  });
});
