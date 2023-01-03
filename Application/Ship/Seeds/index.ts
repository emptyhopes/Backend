import { RoleGraphQLSeeds } from "@/Application/Containers/Roles/Seeds/RoleGraphQLSeed";
import { UserGraphQLSeeds } from "@/Application/Containers/Users/Seeds/UserGraphQLSeed";
import { TokenGraphQLSeeds } from "@/Application/Containers/Tokens/Seeds/TokenGraphQLSeed";

class GraphQLSeeds extends null {
  static async Init() {
    await RoleGraphQLSeeds.Init();
    await UserGraphQLSeeds.Init();
    await TokenGraphQLSeeds.Init();
  }
}

export { GraphQLSeeds };
