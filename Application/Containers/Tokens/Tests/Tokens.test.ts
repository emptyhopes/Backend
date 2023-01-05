import { GraphQLSeeds } from "@/Application/Ship/Seeds";

import { UsersResponse } from "@/Application/Containers/Users/Tests/UsersResponse";
import { TokensResponse } from "@/Application/Containers/Tokens/Tests/TokensResponse";

describe("Tokens", () => {
  test("GetAllTokens", async () => {
    const response = await TokensResponse.GetAllTokensResponse();
    expect(response.body.kind === "single");
    if (response.body.kind !== "single") throw new Error();

    expect(response.body.singleResult.errors).toBeUndefined();
    expect(response.body.singleResult.data?.GetAllTokens).not.toEqual(null);
  });

  test("GetAllTokensPagination", async () => {
    const response = await TokensResponse.GetAllTokensPaginationResponse({
      input: { take: 0, skip: 0 },
    });
    expect(response.body.kind === "single");
    if (response.body.kind !== "single") throw new Error();

    expect(response.body.singleResult.errors).toBeUndefined();
    expect(response.body.singleResult.data?.GetAllTokensPagination).not.toEqual(null);
  });

  test("GetOneTokenByID", async () => {
    const user = await UsersResponse.GetUserIDByEmail("GetOneTokenByID@gmail.com");
    expect(user).not.toBeUndefined();
    if (!user) throw new Error();

    const token = await TokensResponse.GetTokenIDByUserID(user?.id);
    expect(token).not.toBeUndefined();
    if (!token) throw new Error();

    const response = await TokensResponse.GetOneTokenByIDResponse({ id: token.id });
    expect(response.body.kind === "single");
    if (response.body.kind !== "single") throw new Error();

    expect(response.body.singleResult.errors).toBeUndefined();
    expect(response.body.singleResult.data?.GetOneTokenByID).not.toEqual(null);
    expect(response.body.singleResult.data?.GetOneTokenByID.refresh).toEqual("GetOneTokenByID");
    expect(response.body.singleResult.data?.GetOneTokenByID.user_id).toEqual(user.id);
  });

  test("GetOneTokenByUserID", async () => {
    const user = await UsersResponse.GetUserIDByEmail("GetOneTokenByUserID@gmail.com");
    expect(user).not.toBeUndefined();
    if (!user) throw new Error();

    const response = await TokensResponse.GetOneTokenByUserIDResponse({ user_id: user.id });
    expect(response.body.kind === "single");
    if (response.body.kind !== "single") throw new Error();

    expect(response.body.singleResult.errors).toBeUndefined();
    expect(response.body.singleResult.data?.GetOneTokenByUserID).not.toEqual(null);
    expect(response.body.singleResult.data?.GetOneTokenByUserID.refresh).toEqual("GetOneTokenByUserID");
    expect(response.body.singleResult.data?.GetOneTokenByUserID.user_id).toEqual(user.id);
  });

  test("CreateToken", async () => {
    const user = await UsersResponse.GetUserIDByEmail("CreateToken@gmail.com");
    expect(user).not.toBeUndefined();
    if (!user) throw new Error();

    const response = await TokensResponse.CreateTokenResponse({
      input: { refresh: "CreateToken", user_id: user.id },
    });
    expect(response.body.kind === "single");
    if (response.body.kind !== "single") throw new Error();

    expect(response.body.singleResult.errors).toBeUndefined();
    expect(response.body.singleResult.data?.CreateToken).not.toEqual(null);
    expect(response.body.singleResult.data?.CreateToken.refresh).toEqual("CreateToken");
    expect(response.body.singleResult.data?.CreateToken.user_id).toEqual(user.id);
  });

  test("UpdateToken", async () => {
    const user = await UsersResponse.GetUserIDByEmail("UpdateToken@gmail.com");
    expect(user).not.toBeUndefined();
    if (!user) throw new Error();

    const token = await TokensResponse.GetTokenIDByUserID(user?.id);
    expect(token).not.toBeUndefined();
    if (!token) throw new Error();

    const response = await TokensResponse.UpdateTokenResponse({
      input: { id: token.id, refresh: "UpdatedToken", user_id: user.id },
    });
    expect(response.body.kind === "single");
    if (response.body.kind !== "single") throw new Error();

    expect(response.body.singleResult.errors).toBeUndefined();
    expect(response.body.singleResult.data?.UpdateToken).not.toEqual(null);
    expect(response.body.singleResult.data?.UpdateToken.refresh).toEqual("UpdatedToken");
    expect(response.body.singleResult.data?.UpdateToken.user_id).toEqual(user.id);
  });

  test("DeleteTokenByID", async () => {
    const user = await UsersResponse.GetUserIDByEmail("DeleteTokenByID@gmail.com");
    expect(user).not.toBeUndefined();
    if (!user) throw new Error();

    const token = await TokensResponse.GetTokenIDByUserID(user?.id);
    expect(token).not.toBeUndefined();
    if (!token) throw new Error();

    const response = await TokensResponse.DeleteTokenByIDResponse({ id: token.id });
    expect(response.body.kind === "single");
    if (response.body.kind !== "single") throw new Error();

    expect(response.body.singleResult.errors).toBeUndefined();
    expect(response.body.singleResult.data?.DeleteTokenByID).not.toEqual(null);
    expect(response.body.singleResult.data?.DeleteTokenByID.refresh).toEqual("DeleteTokenByID");
    expect(response.body.singleResult.data?.DeleteTokenByID.user_id).toEqual(user.id);
  });

  test("DeleteTokenByUserID", async () => {
    const user = await UsersResponse.GetUserIDByEmail("DeleteTokenByUserID@gmail.com");
    expect(user).not.toBeUndefined();
    if (!user) throw new Error();

    const token = await TokensResponse.GetTokenIDByUserID(user?.id);
    expect(token).not.toBeUndefined();
    if (!token) throw new Error();

    const response = await TokensResponse.DeleteTokenByUserIDResponse({ user_id: user.id });
    expect(response.body.kind === "single");
    if (response.body.kind !== "single") throw new Error();

    expect(response.body.singleResult.errors).toBeUndefined();
    expect(response.body.singleResult.data?.DeleteTokenByUserID).not.toEqual(null);
    expect(response.body.singleResult.data?.DeleteTokenByUserID.refresh).toEqual("DeleteTokenByUserID");
    expect(response.body.singleResult.data?.DeleteTokenByUserID.user_id).toEqual(user.id);
  });

  beforeAll(async () => {
    await GraphQLSeeds.Init();

    // GetOneTokenByID
    await UsersResponse.CreateUserResponse({
      input: { email: "GetOneTokenByID@gmail.com", username: "GetOneTokenByID", password: "GetOneTokenByID" },
    });
    const GetOneTokenByID = await UsersResponse.GetUserIDByEmail("GetOneTokenByID@gmail.com");
    if (!GetOneTokenByID) throw new Error();
    await TokensResponse.CreateTokenResponse({
      input: { refresh: "GetOneTokenByID", user_id: GetOneTokenByID?.id },
    });

    // GetOneTokenByUserID
    await UsersResponse.CreateUserResponse({
      input: {
        email: "GetOneTokenByUserID@gmail.com",
        username: "GetOneTokenByUserID",
        password: "GetOneTokenByUserID",
      },
    });
    const GetOneTokenByUserID = await UsersResponse.GetUserIDByEmail("GetOneTokenByUserID@gmail.com");
    if (!GetOneTokenByUserID) throw new Error();
    await TokensResponse.CreateTokenResponse({
      input: { refresh: "GetOneTokenByUserID", user_id: GetOneTokenByUserID?.id },
    });

    // CreateToken
    await UsersResponse.CreateUserResponse({
      input: {
        email: "CreateToken@gmail.com",
        username: "CreateToken",
        password: "CreateToken",
      },
    });

    // UpdateToken
    await UsersResponse.CreateUserResponse({
      input: {
        email: "UpdateToken@gmail.com",
        username: "UpdateToken",
        password: "UpdateToken",
      },
    });
    const UpdateToken = await UsersResponse.GetUserIDByEmail("UpdateToken@gmail.com");
    if (!UpdateToken) throw new Error();
    await TokensResponse.CreateTokenResponse({
      input: { refresh: "UpdateToken", user_id: UpdateToken?.id },
    });

    // DeleteTokenByID
    await UsersResponse.CreateUserResponse({
      input: {
        email: "DeleteTokenByID@gmail.com",
        username: "DeleteTokenByID",
        password: "DeleteTokenByID",
      },
    });
    const DeleteTokenByID = await UsersResponse.GetUserIDByEmail("DeleteTokenByID@gmail.com");
    if (!DeleteTokenByID) throw new Error();
    await TokensResponse.CreateTokenResponse({
      input: { refresh: "DeleteTokenByID", user_id: DeleteTokenByID?.id },
    });

    // DeleteTokenByUserID
    await UsersResponse.CreateUserResponse({
      input: {
        email: "DeleteTokenByUserID@gmail.com",
        username: "DeleteTokenByUserID",
        password: "DeleteTokenByUserID",
      },
    });
    const DeleteTokenByUserID = await UsersResponse.GetUserIDByEmail("DeleteTokenByUserID@gmail.com");
    if (!DeleteTokenByUserID) throw new Error();
    await TokensResponse.CreateTokenResponse({
      input: { refresh: "DeleteTokenByUserID", user_id: DeleteTokenByUserID?.id },
    });
  });

  afterAll(async () => {
    // GetOneTokenByID
    const GetOneTokenByID = await UsersResponse.GetUserIDByEmail("GetOneTokenByID@gmail.com");
    if (!GetOneTokenByID) throw new Error();
    await TokensResponse.DeleteTokenByUserIDResponse({ user_id: GetOneTokenByID.id });
    await UsersResponse.DeleteUserByEmailResponse({ email: "GetOneTokenByID@gmail.com" });

    // GetOneTokenByUserID
    const GetOneTokenByUserID = await UsersResponse.GetUserIDByEmail("GetOneTokenByUserID@gmail.com");
    if (!GetOneTokenByUserID) throw new Error();
    await TokensResponse.DeleteTokenByUserIDResponse({ user_id: GetOneTokenByUserID.id });
    await UsersResponse.DeleteUserByEmailResponse({ email: "GetOneTokenByUserID@gmail.com" });

    // CreateToken
    const CreateToken = await UsersResponse.GetUserIDByEmail("CreateToken@gmail.com");
    if (!CreateToken) throw new Error();
    await TokensResponse.DeleteTokenByUserIDResponse({ user_id: CreateToken.id });
    await UsersResponse.DeleteUserByEmailResponse({ email: "CreateToken@gmail.com" });

    // UpdateToken
    const UpdateToken = await UsersResponse.GetUserIDByEmail("UpdateToken@gmail.com");
    if (!UpdateToken) throw new Error();
    await TokensResponse.DeleteTokenByUserIDResponse({ user_id: UpdateToken.id });
    await UsersResponse.DeleteUserByEmailResponse({ email: "UpdateToken@gmail.com" });

    // DeleteTokenByID
    await UsersResponse.DeleteUserByEmailResponse({ email: "DeleteTokenByID@gmail.com" });

    // DeleteTokenByUserID
    await UsersResponse.DeleteUserByEmailResponse({ email: "DeleteTokenByUserID@gmail.com" });
  });
});
