import React from "react";
import { auth } from "@/auth";
import { RegisteredUsers } from "@/components/registredUsers/RegisteredUsers";
import { PredictedIncome } from "@/components/predictedIncome/PredictedIncome";
import { GenderProbability } from "@/components/genderProbability/GenderProbability";
import { Ages } from "@/components/ages/Ages";
import { PopularServices } from "@/components/popularServices/PopularServices";
export default async function page() {
  const session = await auth();

  return (
    <div>
      <div className="lg:pr-[300px]  lg:h-[70px] flex items-center border-b-2 border-[#ffffff8e] ">
        {" "}
        <h3 className=" text-3xl text-[#ffffffbf]">
          שלום <span>{session?.user?.name}</span>
        </h3>
      </div>
      <div className=" lg:mr-80 flex lg:mt-10 lg:w-[33%] gap-20 max-lg:flex-col">
        <RegisteredUsers id={session?.user?.id} />{" "}
        <PredictedIncome id={session?.user?.id} />
      </div>
      <div className="lg:w-[20%] lg:mr-[20%] mt-10 flex  gap-20  max-lg:flex-col ">
        <GenderProbability id={session?.user?.id} />
        <Ages id={session?.user?.id} />
        <PopularServices id={session?.user?.id} />
      </div>
    </div>
  );
}
