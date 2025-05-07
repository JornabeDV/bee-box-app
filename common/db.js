import dotenv from "dotenv";
import Prisma, * as PrismaScope from "@prisma/client";

dotenv.config();

const PrismaClient = Prisma?.PrismaClient || PrismaScope?.PrismaClient;

const prisma = new PrismaClient();

export default prisma;