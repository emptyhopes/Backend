import { server } from "@/Application/Ship/Utils/Tests/Server";

describe("Users", () => {
  test("Get all users", async () => {
    const response = await server.executeOperation({
      query: `#graphql
            query {
                GetAllUsers {
                    id
                }
            }
        `,
    });

    expect(response.body.kind === "single");

    if (response.body.kind === "single") {
      expect(response.body.singleResult.errors).toBeUndefined();
      expect(response.body.singleResult.data?.GetAllUsers).toStrictEqual([]);
    }
  });
});
