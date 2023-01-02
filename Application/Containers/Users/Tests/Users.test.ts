import { GetAllUsersResponse } from "@/Application/Containers/Users/Tests/UsersHelper";

describe("Users", () => {
  test("Get all users", async () => {
    const response = await GetAllUsersResponse();

    expect(response.body.kind === "single");

    if (response.body.kind === "single") {
      expect(response.body.singleResult.errors).toBeUndefined();
    }
  });
});
