import { server } from "@/Application/Ship/Tests/Server";

import { UserInterfaceOutput } from "@/Application/Containers/Users/Types/UsersTypes";

const GetAllUsersResponse = async () => {
  const response = await server.executeOperation<{ GetAllUsers: UserInterfaceOutput }>({
    query: `#graphql
              query {
                  GetAllUsers {
                      id
                      email
                      username
                      password
                      role_id
                      is_activated
                      is_protected
                      updated_at
                      created_at
                  }
              }
          `,
  });

  return response;
};

export { GetAllUsersResponse };
