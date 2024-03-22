import { db } from "@/db/connect";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { faker } from "@faker-js/faker";
export const DELETE = async (
  req: NextRequest,
  context: { params: { [key: string]: string } }
) => {
  const prisma = new PrismaClient();

  // Access route parameters
  const { params } = context;

  const updateAppointment = await prisma.barber_appointments.delete({
    where: {
      id: parseInt(params.id),
    },
    include: {
      appointment_belongs_to_barber: true,
      appointment_belongs_to_customer: true,
      appointment_belongs_to_user: true,
    },
  });
  return NextResponse.json({ msg: "התור נמחק" }, { status: 201 });
};
