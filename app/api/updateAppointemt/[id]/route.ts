import { db } from "@/db/connect";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { faker } from "@faker-js/faker";
export const PUT = async (
  req: NextRequest,
  context: { params: { [key: string]: string } }
) => {
  const prisma = new PrismaClient();

  // Access route parameters
  const { params } = context;
  const { newDate } = await req.json();

  const updateAppointment = await prisma.barber_appointments.update({
    where: {
      id: parseInt(params.id),
    },
    data: {
      apoointment_date: newDate,
    },
  });
  return NextResponse.json({ msg: "התור הוזז" }, { status: 201 });
};
