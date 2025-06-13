import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

const NODE_ENV = process.env.NODE_ENV || 'development';
const envFile = NODE_ENV === 'production' ? '.env.production' : '.env';

dotenv.config({ path: envFile });

let prisma;
if (NODE_ENV === 'development') {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
} else {
  prisma = new PrismaClient();
}

export default prisma;