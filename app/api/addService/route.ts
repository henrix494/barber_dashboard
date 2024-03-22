import { db } from "@/db/connect";
import { NextRequest, NextResponse } from "next/server";
interface Service {
  name: string;
  price: number;
}
export const POST = async (req: NextRequest) => {
  const { id, services, adminId } = await req.json();
  console.log(id, services, adminId);
  try {
    const addService = await db.service.createMany({
      data: services.map((service: Service) => {
        if (service.name !== "" || service.price !== 0)
          return {
            name: service.name,
            price: service.price,
            barber_workers_belongsServiceId: id,
            barber_services_belongsID: adminId,
          };
        {
        }
      }),
    });
  } catch (error) {
    console.log(error);
  }

  return NextResponse.json("add", { status: 201 });
};
