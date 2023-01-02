import { prisma } from "@/Application/Ship/Prisma/Client/index";

class RoleGraphQLSeeds extends null {
  static async Init() {
    const user = await prisma.role.findUnique({ where: { name: "USER" } });
    const manager = await prisma.role.findUnique({ where: { name: "MANAGER" } });
    const analytic = await prisma.role.findUnique({ where: { name: "ANALYTIC" } });
    const admin = await prisma.role.findUnique({ where: { name: "ADMIN" } });

    if (!user) await prisma.role.create({ data: { name: "USER" } });
    if (!manager) await prisma.role.create({ data: { name: "MANAGER" } });
    if (!analytic) await prisma.role.create({ data: { name: "ANALYTIC" } });
    if (!admin) await prisma.role.create({ data: { name: "ADMIN" } });
  }
}

export { RoleGraphQLSeeds };
