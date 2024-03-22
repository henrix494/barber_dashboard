"use client";
import React, {
  ChangeEvent,
  FormEvent,
  HtmlHTMLAttributes,
  useEffect,
  useState,
} from "react";
import { useSelector, useDispatch } from "react-redux";
import { push } from "@/lib/features/counter";
import { RootState } from "@/lib/store";
import Image from "next/image";
import DeleteWoker from "./DeleteWoker";

export default function WorkerMange({ id }: any) {
  const user = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();
  const [allDays, setAllDays] = useState(false);
  const [deleteUser, setDeleteUser] = useState(false);
  const [checkedStates, setCheckedStates] = useState<any>({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
  });

  useEffect(() => {
    const getData = async () => {
      const data = await fetch(`/api/getUserById/${id}`);
      const json = await data.json();
      dispatch(push(json));
    };
    getData();
  }, []);

  const [open, setOpen] = useState<string | null>(null);

  const times = [
    6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
  ];
  const workingDays = [1, 2, 3, 4, 5, 6];
  const timesSelect = times.map((item, index) => {
    return (
      <option value={item.toString()} id={index.toString()}>
        {item}
      </option>
    );
  });
  const workDays = workingDays.map((item, index) => {
    return (
      <div id={index.toString()} className="">
        <h3>{item}</h3>
        <input
          checked={checkedStates[item]}
          onChange={() => {
            setCheckedStates({
              ...checkedStates,
              [item]: !checkedStates[item],
            });
            if (checkedStates[item]) {
              setBarberSchedule({
                ...barberSchedule,
                days: barberSchedule.days
                  ? barberSchedule.days.filter((day: any) => day !== item)
                  : [],
              });
            } else {
              setBarberSchedule({
                ...barberSchedule,
                days: [...(barberSchedule.days || []), item],
              });
            }
          }}
          value={item}
          type="checkbox"
        />
      </div>
    );
  });

  const [barberSchedule, setBarberSchedule] = useState<any>({
    start: null,
    end: null,
    days: [],
  });

  const allDaysHandler = () => {
    setAllDays((prev) => !prev);
    if (allDays) {
      setBarberSchedule({
        ...barberSchedule,
        days: null,
      });
      setCheckedStates({
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
      });
    } else {
      setBarberSchedule({
        ...barberSchedule,
        days: [1, 2, 3, 4, 5, 6],
      });
      setCheckedStates({
        1: true,
        2: true,
        3: true,
        4: true,
        5: true,
        6: true,
      });
    }
  };
  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>, id: number) => {
    e.preventDefault();

    fetch("/api/createAvailability", {
      method: "POST",
      body: JSON.stringify({ ...barberSchedule, id: id }),
    });
  };
  const [workerDetails, setWorkerDetails] = useState<any>(null);
  const setDeleteUserHandler = (id: number, workerName: string) => {
    setDeleteUser((prev) => !prev);
    setWorkerDetails({ id, workerName });
  };

  const names = user?.barber_workers.map((item: any) => {
    return (
      <div
        id={item.toString()}
        className=" bg-white text-black flex justify-around flex-col overflow-hidden "
      >
        <div className="flex justify-around ">
          <h3 className={` cursor-pointer " border-b-2"}`}>{item.name}</h3>

          <div
            className=" cursor-pointer "
            onClick={() => {
              setOpen(open === item.name ? null : item.name);
              setCheckedStates({
                1: false,
                2: false,
                3: false,
                4: false,
                5: false,
                6: false,
              });
              setAllDays(false);
              setBarberSchedule({
                start: null,
                end: null,
                days: [],
              });
            }}
          >
            <Image src={"/down.svg"} width={30} height={30} alt="down" />
          </div>
          <button
            onClick={() => setDeleteUserHandler(item.id, item.name)}
            className=" bg-red-600 px-5 text-white"
          >
            הסר עובד
          </button>
        </div>
        <form
          onSubmit={(e) => onSubmitHandler(e, item.id)}
          className={`w-full bg-blue-700 transition-all text-white relative   ${
            open === item.name ? "lg:h-[200px]  h-[400px]" : "h-[0px] "
          }`}
        >
          <div>
            <div className="flex gap-6 mt-6">
              <h3>בחר שעת התחלה:</h3>
              <select
                className="text-black w-[50px]"
                onChange={(e) => {
                  setBarberSchedule({
                    ...barberSchedule,
                    start: e.target.value,
                  });
                }}
              >
                {timesSelect}
              </select>
            </div>
            <div className="flex gap-6 mt-10 ">
              <h3>בחר שעת סיום:</h3>
              <select
                onChange={(e) => {
                  setBarberSchedule({
                    ...barberSchedule,
                    end: e.target.value,
                  });
                }}
                className="text-black w-[50px]"
              >
                {timesSelect}
              </select>
            </div>
            <div className="flex gap-6 mt-6 items-center flex-wrap ">
              <h3>בחר ימי עבודה:</h3>

              <div
                className=" flex gap-10 "
                onClick={() => {
                  setAllDays(false);
                }}
              >
                {workDays}
              </div>
              <div>
                <h3 className="">כל הימים</h3>
                <input
                  onChange={allDaysHandler}
                  value={"all"}
                  type="checkbox"
                  checked={allDays}
                />
              </div>
            </div>
          </div>
          <button className="bg-blue-700 border-2 p-5 text-white self-end absolute left-40 bottom-10">
            שמור
          </button>
        </form>
        <DeleteWoker
          id={item.id}
          open={deleteUser}
          setOpen={setDeleteUserHandler}
          workerDetails={workerDetails}
          adminId={user.id}
        />
      </div>
    );
  });
  interface nameL {
    name: string;
    lastName: string;
  }
  const [barberWorker, setBarberWorker] = useState<nameL>({
    name: "",
    lastName: "",
  });
  const addWorkerHandler = (e: FormEvent, id: number) => {
    e.preventDefault();
    fetch("/api/addWorker", {
      method: "POST",
      body: JSON.stringify({ ...barberWorker, adminId: id }),
    }).then((res) => {
      if (res.status === 201) {
        window.location.reload();
      }
    });
  };
  const addWorker = () => {
    return (
      <div className="">
        <h3 className=" text-center mt-10 text-4xl font-bold ">
          לא קיימים עובדים במערכת
        </h3>

        <div className=" absolute w-[400px] h-[400px] left-1/2 translate-x-[-50%] mt-20">
          <h3 className="text-center">הוסף עובד</h3>

          <form
            onSubmit={(e) => addWorkerHandler(e, user.id)}
            className="flex flex-col gap-6 items-center"
          >
            <input
              className="w-[200px] h-[40px] text-black rounded-xl"
              placeholder="שם העובד"
              type="text"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setBarberWorker({ ...barberWorker, name: e.target.value });
              }}
            />
            <input
              className="w-[200px] h-[40px] text-black rounded-xl"
              placeholder="שם משפחה"
              type="text"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setBarberWorker({ ...barberWorker, lastName: e.target.value });
              }}
            />
            <button className="bg-blue-700 text-white p-3 w-[150px] rounded-xl">
              הוסף
            </button>
          </form>
        </div>
      </div>
    );
  };
  const [addWorkerModel, setAddWorkerModel] = useState(false);
  const [newWorker, setNewWorker] = useState<any>();
  const addWorkerHandlerPOST = async (e: FormEvent) => {
    e.preventDefault();
    console.log(newWorker);
    const send = await fetch("/api/addWorker", {
      method: "POST",
      body: JSON.stringify({ newWorker, adminId: user.id }),
    });
    if (send.status === 201) {
      window.location.reload();
    }
  };
  return (
    <div className="flex flex-col gap-10 relative ">
      {user?.barber_workers.length > 0 ? names : addWorker()}
      <button
        onClick={() => {
          setAddWorkerModel((prev) => !prev);
        }}
      >
        הוסף עובד
      </button>
      <div
        onClick={() => {
          setAddWorkerModel(false);
        }}
        className={`${
          addWorkerModel ? "" : "hidden"
        }w-screen h-screen fixed  top-0 bg-[#0000009f] z-50 `}
      ></div>
      <div
        className={` z-[70]
        w-[400px] h-[400px] bg-white absolute left-1/2 translate-x-[-50%] top-[-60%] lg:top-1/2 lg:translate-y-[80%]  flex flex-col gap-6 items-center justify-center
        ${!addWorkerModel && "hidden"}`}
      >
        <form
          className="text-black flex flex-col gap-4"
          onSubmit={(e: FormEvent) => {
            addWorkerHandlerPOST(e);
          }}
        >
          <h1>הוסף ספר</h1>
          <div className="bg-[#f3f3f3]  flex p-4 gap-2 flex-col rounded-lg">
            <label htmlFor="name">שם:</label>
            <input
              onChange={(e) => {
                setNewWorker({ ...newWorker, name: e.target.value });
              }}
              className="bg-[#f3f3f3] border-b-2 border-black px-2 outline-none"
              type="text"
            />
          </div>
          <div className="bg-[#f3f3f3]  flex p-4 gap-2 flex-col rounded-lg">
            <label htmlFor="name">שם משפחה:</label>
            <input
              onChange={(e) => {
                setNewWorker({ ...newWorker, lastName: e.target.value });
              }}
              className="bg-[#f3f3f3] border-b-2 border-black px-2 outline-none"
              type="text"
            />
          </div>
          <button className=" bg-blue-500 text-white rounded-lg">הוסף</button>
        </form>
      </div>
    </div>
  );
}
