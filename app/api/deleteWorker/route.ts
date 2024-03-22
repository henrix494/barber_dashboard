import { db } from "@/db/connect";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
export const DELETE = async (req: NextRequest) => {
  const body = await req.json();
  const { adminId, workerId } = body;
  try {
    const worker = await db.barber_workers.delete({
      where: {
        id: workerId,
        AND: {
          barber_workers_belongsID: adminId,
        },
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2003")
        return NextResponse.json("קיימים תורים לספר", { status: 403 });
    }
  }

  return NextResponse.json("asc", { status: 203 });
};
