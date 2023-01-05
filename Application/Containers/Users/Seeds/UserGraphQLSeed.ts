import { prisma } from "@/Application/Ship/Prisma/Client/index";

class UserGraphQLSeeds extends null {
  static async Init() {
    const role = await prisma.role.findUnique({ where: { name: "USER" } });
    if (!role) throw new Error("");

    const user = await prisma.user.findUnique({ where: { email: "seeds@gmail.com" } });
    if (!user) {
      await prisma.user.create({
        data: { email: "seeds@gmail.com", username: "seeds", password: "seeds", role_id: role.id },
      });
    }
  }
}

export { UserGraphQLSeeds };
