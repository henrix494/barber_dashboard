import React from "react";
import { auth } from "@/auth";
import ServiceManage from "@/components/serviceMange/ServiceManage";
export default async function page() {
  const seession = await auth();
  return (
    <div className="lg:pr-[280px]  text-white">
      <div className=" pr-5  h-[70px] flex items-center border-b-2 border-[#ffffff8e] ">
        <h3 className=" text-3xl text-[#ffffffbf]"> ניהול שירותים ומחירים</h3>
      </div>
      <ServiceManage
        adminId={seession?.user?.id ? Number(seession.user.id) : 0}
      />
    </div>
  );
}
