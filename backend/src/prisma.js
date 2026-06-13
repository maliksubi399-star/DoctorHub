const { PrismaClient } = require('@prisma/client');

// Prisma v7 reads the datasource URL from prisma.config.ts automatically
const prisma = new PrismaClient();

module.exports = prisma;
