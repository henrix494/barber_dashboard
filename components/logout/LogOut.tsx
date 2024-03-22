"use client";
import React from "react";
import { signOut } from "@/auth";
export default function LogOut() {
  return (
    <button className=" absolute bottom-0" onClick={() => signOut}>
      Logout
    </button>
  );
}
