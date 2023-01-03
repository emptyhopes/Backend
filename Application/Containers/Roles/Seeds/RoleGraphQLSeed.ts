import { prisma } from "@/Application/Ship/Prisma/Client/index";

class RoleGraphQLSeeds extends null {
  static async Init() {
    const user = await prisma.role.findUnique({ where: { name: "USER" } });
    if (!user) await prisma.role.create({ data: { name: "USER" } });

    const manager = await prisma.role.findUnique({ where: { name: "MANAGER" } });
    if (!manager) await prisma.role.create({ data: { name: "MANAGER" } });

    const analytic = await prisma.role.findUnique({ where: { name: "ANALYTIC" } });
    if (!analytic) await prisma.role.create({ data: { name: "ANALYTIC" } });

    const admin = await prisma.role.findUnique({ where: { name: "ADMIN" } });
    if (!admin) await prisma.role.create({ data: { name: "ADMIN" } });
  }
}

export { RoleGraphQLSeeds };
