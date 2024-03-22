import { db } from "@/db/connect";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { faker } from "@faker-js/faker";
export const GET = async (
  req: NextRequest,
  context: { params: { [key: string]: string } }
) => {
  const prisma = new PrismaClient();

  // Access route parameters
  const { params } = context;

  const barberUserData = await prisma.barber_users.findFirst({
    where: { id: parseInt(params.id) as any },
    include: {
      barber_customers: true,
      barber_appointments: true,
      barber_workers: true,
      barber_services: true,
    },
  });

  return NextResponse.json(barberUserData, { status: 201 });
};
