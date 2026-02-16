import "dotenv/config";
import { PrismaClient, CategoryType } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });


async function main() {
  // Roles
  await prisma.role.upsert({
    where: { name: 'ADMIN' },
    update: {},
    create: { name: 'ADMIN' },
  });

  await prisma.role.upsert({
    where: { name: 'MEMBER' },
    update: {},
    create: { name: 'MEMBER' },
  });

  // Create a default tenant (for development only)
  const tenant = await prisma.tenant.upsert({
    where: { id: 'dev-tenant' },
    update: {},
    create: {
      id: 'dev-tenant',
      name: 'Development Tenant',
    },
  });

  // System Transfer Category
  await prisma.category.upsert({
    where: {
      tenantId_name: {
        tenantId: tenant.id,
        name: 'Transfer',
      },
    },
    update: {},
    create: {
      tenantId: tenant.id,
      name: 'Transfer',
      type: CategoryType.TRANSFER,
      isSystem: true,
    },
  });

  console.log('Seed complete');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

