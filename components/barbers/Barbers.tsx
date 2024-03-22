"use client";
import React, { useEffect, useState } from "react";
import Calendar from "../calendar/Calendar";
import { useSelector, useDispatch } from "react-redux";
import { push } from "@/lib/features/counter";
import { RootState } from "@/lib/store";
export default function Barbers({ id }: any) {
  const [calendar, setCalendar] = useState(false);
  const [barberId, setBarBerId] = useState(null);
  const [barberInfop, setBarberInfo] = useState(null);
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();
  useEffect(() => {
    const getData = async () => {
      const data = await fetch(`/api/getUserById/${id}`);
      const json = await data.json();
      dispatch(push(json));
    };
    getData();
  }, []);
  const handleCalendar = async (id: any) => {
    setBarBerId(id);
    setCalendar(true);

    const data = await fetch(`/api/getBarberInfo/${id}`);
    const json = await data.json();
    setBarberInfo(json);
  };

  const names = count?.barber_workers.map((item: any) => {
    return (
      <h3
        className={` cursor-pointer ${item.id == barberId && " border-b-2"}`}
        onClick={() => handleCalendar(item.id)}
      >
        {item.name}
      </h3>
    );
  });
  return (
    <>
      <div className=" lg:w-[80vw] ">
        <div className="flex gap-10 justify-center">{names}</div>
        <div className={`${!calendar && `hidden`} mt-10`}>
          <Calendar barberId={barberId} barberInfop={barberInfop} />
        </div>
      </div>
    </>
  );
}
