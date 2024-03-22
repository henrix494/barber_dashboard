"use client";
import React from "react";
import { logout } from "@/actions/logout";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function NavBar() {
  const pathname = usePathname();

  return (
    <nav className="bg-[#1d1e2c]  lg:h-screen lg:w-[280px] rounded-l-lg lg:fixed">
      <div className="pr-[40px] text-white mt-10">
        <div className="mb-10 pr-[6px]">
          <h1 className="text-4xl">לוגו</h1>
        </div>
        <div className="flex lg:flex-col gap-8 text-[#DBDFEA] text-xl max-lg:flex-col  ">
          <Link href={"/home"}>
            <div
              className={`flex gap-2  rounded-r-full pr-[6px] ${
                pathname === "/home" && "bg-[#393e83] py-2"
              } `}
            >
              <h2>מידע כללי</h2>

              <Image
                src={"/pie-chart.svg"}
                width={20}
                height={20}
                alt="py_chart"
              />
            </div>
          </Link>
          <Link href={"/home/users"}>
            <div
              className={`flex gap-2  rounded-r-full pr-[6px] ${
                pathname === "/home/users" && "bg-[#393e83] py-2"
              } `}
            >
              <h2> ניהול תורים</h2>

              <Image src={"/book.svg"} width={20} height={20} alt="py_chart" />
            </div>
          </Link>
          <Link href={"/home/barbers"}>
            <div
              className={`flex gap-2  rounded-r-full pr-[6px] ${
                pathname === "/home/barbers" && "bg-[#393e83] py-2"
              } `}
            >
              <h2> ניהול עובדים</h2>

              <Image
                src={"/scissors.svg"}
                width={20}
                height={20}
                alt="py_chart"
              />
            </div>
          </Link>
          <Link href={"/home/service"}>
            <div
              className={`flex gap-2  rounded-r-full pr-[6px] ${
                pathname === "/home/service" && "bg-[#393e83] py-2"
              } `}
            >
              <h2> ניהול שירותים ומחירים</h2>

              <Image src={"/price.svg"} width={20} height={20} alt="py_chart" />
            </div>
          </Link>
        </div>
        <button
          className="absolute lg:bottom-0 mb-10"
          onClick={() => {
            logout();
          }}
        >
          יציאה
        </button>
      </div>
    </nav>
  );
}
