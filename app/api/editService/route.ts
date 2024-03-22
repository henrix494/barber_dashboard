import { db } from "@/db/connect";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (req: NextRequest) => {
  const data = await req.json();

  try {
    for (const item of data) {
      for (const id in item) {
        const recordToUpdate = item[id];
        await db.service.update({
          where: { id: parseInt(id) },
          data: {
            name: recordToUpdate.name,
            price: recordToUpdate.price,
          },
        });
      }
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error occurred" });
  }
  return NextResponse.json({ message: "Success" });
};
