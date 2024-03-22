import WorkerMange from "@/components/workerMange/WorkerMange";
import { auth } from "@/auth";
export default async function page() {
  const sesstion = await auth();

  return (
    <div className="lg:pr-[280px]  text-white">
      {" "}
      <div className=" pr-5  h-[70px] flex items-center border-b-2 border-[#ffffff8e] ">
        {" "}
        <h3 className=" text-3xl text-[#ffffffbf]">ניהול עובדים</h3>
      </div>
      <WorkerMange id={sesstion?.user?.id} />
    </div>
  );
}
