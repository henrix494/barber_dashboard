import { db } from "@/db/connect";
import { NextResponse, NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  const { adminId, newWorker } = await req.json();

  const numberId = parseInt(adminId);

  try {
    const addWorker = await db.barber_workers.create({
      data: {
        name: newWorker.name,
        lastname: newWorker.lastName,
        barber_workers_belongsID: numberId,
        role: "barber",
      },
    });
    return NextResponse.json("העובד נוסף בהצלחה", { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("העובד לא נוסף", { status: 400 });
  }
};
