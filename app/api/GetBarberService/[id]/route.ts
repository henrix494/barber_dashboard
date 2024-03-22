import { db } from "@/db/connect";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  context: { params: { [key: string]: string } }
) => {
  const { params } = context;
  try {
    const barberServiceData = await db.barber_workers.findFirst({
      where: { id: parseInt(params.id) as any },
      include: {
        services: true,
      },
    });
    return NextResponse.json(barberServiceData, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
};
