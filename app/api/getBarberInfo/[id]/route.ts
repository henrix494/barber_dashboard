import { db } from "@/db/connect";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  context: { id: { [id: number]: number } }
) => {
  const { id } = context;
  console.log(typeof id);
  const barber = await db.barber_workers.findFirst({
    where: {
      id: id,
    },
    include: {
      services: true,
    },
  });
  return NextResponse.json(barber, { status: 201 });
};
