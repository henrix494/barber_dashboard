import React, { useEffect } from "react";
import { auth } from "@/auth";
import Calendar from "@/components/calendar/Calendar";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store";
import Barbers from "@/components/barbers/Barbers";
export default async function Users(id: any) {
  const sesstion = await auth();

  return (
    <div className="lg:pr-[280px]  text-white">
      {" "}
      <div className=" pr-5  h-[70px] flex items-center border-b-2 border-[#ffffff8e] ">
        {" "}
        <h3 className=" text-3xl text-[#ffffffbf]">ניהול תורים</h3>
      </div>
      <h2 className=" text-center text-4xl mt-10">בחר יומן</h2>
      <div className="flex gap-6 text-center justify-center mt-10 flex-col items-center">
        <Barbers id={sesstion?.user?.id} />
      </div>
      <div></div>
    </div>
  );
}
