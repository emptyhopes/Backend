import { RoleGraphQLSeeds } from "@/Application/Containers/Roles/Seeds/RoleGraphQLSeed";

class GraphQLSeeds extends null {
  static async Init() {
    RoleGraphQLSeeds.Init();
  }
}

export { GraphQLSeeds };
