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

  const getBarberAppointments = await prisma.barber_appointments.findMany({
    where: {
      appointment_belongs_to_barberID: parseInt(params.id),
    },
    include: {
      appointment_belongs_to_customer: true,
      appointment_belongs_to_barber: true,
      service: true,
    },
  });

  return NextResponse.json(getBarberAppointments, { status: 201 });
};
