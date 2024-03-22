import React, { useEffect } from "react";
import { push } from "@/lib/features/counter";
import { useDispatch, useSelector } from "react-redux";

interface DeleteWokerProps {
  id: number;
  open: boolean;
  setOpen: any;
  adminId: number;
  workerDetails: {
    id: number;
    workerName: string;
  };
}

export default function DeleteWoker({
  id,
  open,
  setOpen,
  adminId,
  workerDetails,
}: DeleteWokerProps) {
  const dispatch = useDispatch();
  const deleteWorker = async () => {
    const res = await fetch("/api/deleteWorker", {
      method: "DELETE",
      body: JSON.stringify({ adminId, workerId: workerDetails.id }),
    });
    const resCode = await res.json();
    if (res.status === 203) {
      const newData = await fetch(`/api/getUserById/${adminId}`);
      const json = await newData.json();
      dispatch(push(json));
      alert("עובד נמחק בהצלחה");
      setOpen();
    } else if (res.status === 403) {
      alert(resCode);
    }
  };
  return (
    <div
      className={`absolute top-1/2 left-1/2 w-[500px] h-[300px] bg-blue-200 translate-x-[-50%] rounded-xl ${
        open ? "block" : "hidden"
      }`}
    >
      <button className=" absolute top-3 right-5 " onClick={() => setOpen()}>
        X
      </button>
      <div className="flex justify-center flex-col items-center mt-10 gap-10">
        <h3 className="text-xl font-bold">
          האם אתה בטוח שאתה רוצה לימחוק את עובד {workerDetails?.workerName}?
        </h3>
        <h2 className="text-xl font-bold">פעולה זאת ללא חזרה</h2>
        <button
          onClick={deleteWorker}
          className=" bg-red-500 px-7 py-5 text-white rounded-lg text-xl"
        >
          מחק
        </button>
      </div>
    </div>
  );
}
