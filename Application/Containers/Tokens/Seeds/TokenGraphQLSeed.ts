import { prisma } from "@/Application/Ship/Prisma/Client/index";

class TokenGraphQLSeeds extends null {
  static async Init() {
    const user = await prisma.user.findUnique({ where: { email: "seeds@gmail.com" } });
    if (!user) throw new Error("");

    const token = await prisma.token.findUnique({ where: { user_id: user.id } });
    if (!token) await prisma.token.create({ data: { refresh: "seeds", user_id: user.id } });
  }
}

export { TokenGraphQLSeeds };
