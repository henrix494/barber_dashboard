import { db } from "@/db/connect";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
export const PUT = async (req: NextRequest) => {
  const { id, isoDate, barberId, adminId, serviceId } = await req.json();
  console.log(barberId);
  try {
    const createAppointment = await db.barber_appointments.create({
      data: {
        apoointment_date: isoDate,
        status: "pending",
        appointment_belongs_to_userID: adminId,

        appointment_belongs_to_barberID: barberId,
        appointment_belongs_to_customerID: id,
        serviceId: serviceId,
      },
    });
    const availabilityRecord = await db.availability.findFirst({
      where: {
        timeSlot: isoDate,
        barberId: barberId,
      },
    });
    if (!availabilityRecord) {
      throw new Error("No availability record found for the given time slot");
    }
    const deleteAvailableTime = await db.availability.delete({
      where: {
        id: availabilityRecord.id,
      },
    });
    return NextResponse.json({ msg: "התור נוצר" }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ msg: error }, { status: 400 });
  }
};
