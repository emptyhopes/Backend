// import { UsersResponse } from "@/Application/Containers/Users/Tests/UsersResponse";
// import { TokensResponse } from "@/Application/Containers/Tokens/Tests/TokensResponse";

// describe("Tokens", () => {
// test("Get all tokens", async () => {
//   await UsersResponse.CreateUserResponse({ input: { email: "test@gmail.com", username: "test", password: "test" } });
//   const user = await UsersResponse.GetUserIDByEmail("test@gmail.com");
//   expect(user?.email).toEqual("test@gmail.com");
//   if (user) {
//     await TokensResponse.CreateTokenResponse({ input: { refresh: "test", secret: "test", user_id: user.id } });
//     const token = await TokensResponse.GetTokenIDByUserID(user.id);
//     expect(token?.refresh).toEqual("test");
//     expect(token?.secret).toEqual("test");
//     const response = await TokensResponse.GetAllTokensResponse();
//     expect(response.body.kind === "single");
//     if (response.body.kind === "single") {
//       expect(response.body.singleResult.errors).toBeUndefined();
//       expect(response.body.singleResult.data?.GetAllTokens).not.toEqual(null);
//     }
//     await TokensResponse.DeleteTokenByUserIDResponse({ user_id: user.id });
//   }
//   await UsersResponse.DeleteUserByEmailResponse({ email: "test@gmail.com" });
// });
// test("Get all tokens pagination", async () => {
//   await UsersResponse.CreateUserResponse({
//     input: { email: "test1@gmail.com", username: "test1", password: "test1" },
//   });
//   await UsersResponse.CreateUserResponse({
//     input: { email: "test2@gmail.com", username: "test2", password: "test2" },
//   });
//   const FirstUser = await UsersResponse.GetUserIDByEmail("test1@gmail.com");
//   const SecondUser = await UsersResponse.GetUserIDByEmail("test2@gmail.com");
//   expect(FirstUser?.email).toEqual("test1@gmail.com");
//   expect(SecondUser?.email).toEqual("test2@gmail.com");
//   if (FirstUser && SecondUser) {
//     const tokens = await TokensResponse.GetAllTokensResponse();
//     if (tokens.body.kind === "single") {
//       const length = tokens.body.singleResult.data?.GetAllTokens.length;
//       await TokensResponse.CreateTokenResponse({
//         input: { refresh: "test1", secret: "test1", user_id: FirstUser.id },
//       });
//       await TokensResponse.CreateTokenResponse({
//         input: { refresh: "test2", secret: "test2", user_id: SecondUser.id },
//       });
//       const FirstToken = await TokensResponse.GetTokenIDByUserID(FirstUser.id);
//       const SecondToken = await TokensResponse.GetTokenIDByUserID(SecondUser.id);
//       expect(FirstToken?.refresh).toEqual("test1");
//       expect(FirstToken?.secret).toEqual("test1");
//       expect(SecondToken?.refresh).toEqual("test2");
//       expect(SecondToken?.secret).toEqual("test2");
//       const response = await TokensResponse.GetAllTokensPaginationResponse({
//         input: { take: 2, skip: Number(length) },
//       });
//       expect(response.body.kind === "single");
//       if (response.body.kind === "single") {
//         expect(response.body.singleResult.errors).toBeUndefined();
//         expect(response.body.singleResult.data?.GetAllTokensPagination).not.toEqual(null);
//         expect(response.body.singleResult.data?.GetAllTokensPagination[0]?.refresh).toEqual("test1");
//         expect(response.body.singleResult.data?.GetAllTokensPagination[0]?.secret).toEqual("test1");
//         expect(response.body.singleResult.data?.GetAllTokensPagination[1]?.refresh).toEqual("test2");
//         expect(response.body.singleResult.data?.GetAllTokensPagination[1]?.secret).toEqual("test2");
//       }
//       await TokensResponse.DeleteTokenByUserIDResponse({ user_id: FirstUser.id });
//       await TokensResponse.DeleteTokenByUserIDResponse({ user_id: SecondUser.id });
//     }
//   }
//   await UsersResponse.DeleteUserByEmailResponse({ email: "test1@gmail.com" });
//   await UsersResponse.DeleteUserByEmailResponse({ email: "test2@gmail.com" });
// });
// test("Get one token by id", async () => {
//   await UsersResponse.CreateUserResponse({ input: { email: "test@gmail.com", username: "test", password: "test" } });
//   const user = await UsersResponse.GetUserIDByEmail("test@gmail.com");
//   expect(user?.email).toEqual("test@gmail.com");
//   if (user) {
//     await TokensResponse.CreateTokenResponse({ input: { refresh: "test", secret: "test", user_id: user.id } });
//     const token = await TokensResponse.GetTokenIDByUserID(user.id);
//     expect(token?.refresh).toEqual("test");
//     expect(token?.secret).toEqual("test");
//     if (token) {
//       const response = await TokensResponse.GetOneTokenByIDResponse({ id: token.id });
//       expect(response.body.kind === "single");
//       if (response.body.kind === "single") {
//         expect(response.body.singleResult.errors).toBeUndefined();
//         expect(response.body.singleResult.data?.GetOneTokenByID).not.toEqual(null);
//         expect(response.body.singleResult.data?.GetOneTokenByID.refresh).toEqual("test");
//         expect(response.body.singleResult.data?.GetOneTokenByID.secret).toEqual("test");
//         expect(response.body.singleResult.data?.GetOneTokenByID.user_id).toEqual(user.id);
//       }
//     }
//     await TokensResponse.DeleteTokenByUserIDResponse({ user_id: user.id });
//   }
//   await UsersResponse.DeleteUserByEmailResponse({ email: "test@gmail.com" });
// });
// test("Get one token by user_id", async () => {
//   await UsersResponse.CreateUserResponse({ input: { email: "test@gmail.com", username: "test", password: "test" } });
//   const user = await UsersResponse.GetUserIDByEmail("test@gmail.com");
//   expect(user?.email).toEqual("test@gmail.com");
//   if (user) {
//     await TokensResponse.CreateTokenResponse({ input: { refresh: "test", secret: "test", user_id: user.id } });
//     const response = await TokensResponse.GetOneTokenByUserIDResponse({ user_id: user.id });
//     expect(response.body.kind === "single");
//     if (response.body.kind === "single") {
//       expect(response.body.singleResult.errors).toBeUndefined();
//       expect(response.body.singleResult.data?.GetOneTokenByUserID).not.toEqual(null);
//       expect(response.body.singleResult.data?.GetOneTokenByUserID.refresh).toEqual("test");
//       expect(response.body.singleResult.data?.GetOneTokenByUserID.secret).toEqual("test");
//       expect(response.body.singleResult.data?.GetOneTokenByUserID.user_id).toEqual(user.id);
//     }
//     await TokensResponse.DeleteTokenByUserIDResponse({ user_id: user.id });
//   }
//   await UsersResponse.DeleteUserByEmailResponse({ email: "test@gmail.com" });
// });
// test("Create token", async () => {
//   await UsersResponse.CreateUserResponse({ input: { email: "test@gmail.com", username: "test", password: "test" } });
//   const user = await UsersResponse.GetUserIDByEmail("test@gmail.com");
//   expect(user?.email).toEqual("test@gmail.com");
//   if (user) {
//     const response = await TokensResponse.CreateTokenResponse({
//       input: { refresh: "test", secret: "test", user_id: user.id },
//     });
//     expect(response.body.kind === "single");
//     if (response.body.kind === "single") {
//       expect(response.body.singleResult.errors).toBeUndefined();
//       expect(response.body.singleResult.data?.CreateToken).not.toEqual(null);
//       expect(response.body.singleResult.data?.CreateToken.refresh).toEqual("test");
//       expect(response.body.singleResult.data?.CreateToken.secret).toEqual("test");
//       expect(response.body.singleResult.data?.CreateToken.user_id).toEqual(user.id);
//     }
//     await TokensResponse.DeleteTokenByUserIDResponse({ user_id: user.id });
//   }
//   await UsersResponse.DeleteUserByEmailResponse({ email: "test@gmail.com" });
// });
// test("Update token", async () => {
//   await UsersResponse.CreateUserResponse({ input: { email: "test@gmail.com", username: "test", password: "test" } });
//   const user = await UsersResponse.GetUserIDByEmail("test@gmail.com");
//   expect(user?.email).toEqual("test@gmail.com");
//   if (user) {
//     await TokensResponse.CreateTokenResponse({ input: { refresh: "test", secret: "test", user_id: user.id } });
//     const token = await TokensResponse.GetTokenIDByUserID(user.id);
//     expect(token?.refresh).toEqual("test");
//     expect(token?.secret).toEqual("test");
//     if (token) {
//       const response = await TokensResponse.UpdateTokenResponse({
//         input: { id: token.id, refresh: "testtest", secret: "testtest", user_id: user.id },
//       });
//       expect(response.body.kind === "single");
//       if (response.body.kind === "single") {
//         expect(response.body.singleResult.errors).toBeUndefined();
//         expect(response.body.singleResult.data?.UpdateToken).not.toEqual(null);
//         expect(response.body.singleResult.data?.UpdateToken.refresh).toEqual("testtest");
//         expect(response.body.singleResult.data?.UpdateToken.secret).toEqual("testtest");
//         expect(response.body.singleResult.data?.UpdateToken.user_id).toEqual(user.id);
//       }
//     }
//     await TokensResponse.DeleteTokenByUserIDResponse({ user_id: user.id });
//   }
//   await UsersResponse.DeleteUserByEmailResponse({ email: "test@gmail.com" });
// });
// test("Delete token by id", async () => {
//   await UsersResponse.CreateUserResponse({ input: { email: "test@gmail.com", username: "test", password: "test" } });
//   const user = await UsersResponse.GetUserIDByEmail("test@gmail.com");
//   expect(user?.email).toEqual("test@gmail.com");
//   if (user) {
//     await TokensResponse.CreateTokenResponse({ input: { refresh: "test", secret: "test", user_id: user.id } });
//     const token = await TokensResponse.GetTokenIDByUserID(user.id);
//     expect(token?.refresh).toEqual("test");
//     expect(token?.secret).toEqual("test");
//     if (token) {
//       const response = await TokensResponse.DeleteTokenByIDResponse({ id: token.id });
//       expect(response.body.kind === "single");
//       if (response.body.kind === "single") {
//         expect(response.body.singleResult.errors).toBeUndefined();
//         expect(response.body.singleResult.data?.DeleteTokenByID).not.toEqual(null);
//         expect(response.body.singleResult.data?.DeleteTokenByID.refresh).toEqual("test");
//         expect(response.body.singleResult.data?.DeleteTokenByID.secret).toEqual("test");
//         expect(response.body.singleResult.data?.DeleteTokenByID.user_id).toEqual(user.id);
//       }
//     }
//     await TokensResponse.DeleteTokenByUserIDResponse({ user_id: user.id });
//   }
//   await UsersResponse.DeleteUserByEmailResponse({ email: "test@gmail.com" });
// });
// test("Delete token by user_id", async () => {
//   await UsersResponse.CreateUserResponse({ input: { email: "test@gmail.com", username: "test", password: "test" } });
//   const user = await UsersResponse.GetUserIDByEmail("test@gmail.com");
//   expect(user?.email).toEqual("test@gmail.com");
//   if (user) {
//     await TokensResponse.CreateTokenResponse({ input: { refresh: "test", secret: "test", user_id: user.id } });
//     const response = await TokensResponse.DeleteTokenByUserIDResponse({ user_id: user.id });
//     expect(response.body.kind === "single");
//     if (response.body.kind === "single") {
//       expect(response.body.singleResult.errors).toBeUndefined();
//       expect(response.body.singleResult.data?.DeleteTokenByUserID).not.toEqual(null);
//       expect(response.body.singleResult.data?.DeleteTokenByUserID.refresh).toEqual("test");
//       expect(response.body.singleResult.data?.DeleteTokenByUserID.secret).toEqual("test");
//       expect(response.body.singleResult.data?.DeleteTokenByUserID.user_id).toEqual(user.id);
//     }
//     await TokensResponse.DeleteTokenByUserIDResponse({ user_id: user.id });
//   }
//   await UsersResponse.DeleteUserByEmailResponse({ email: "test@gmail.com" });
// });
// afterEach(async () => {
//   await TokensResponse.ClearTokenID();
// });
// });
