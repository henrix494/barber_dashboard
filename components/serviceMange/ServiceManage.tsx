"use client";
import { push } from "@/lib/features/counter";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store";
import { useEffect, useState } from "react";
import AddService from "./AddService";
import EditService from "./EditService";
interface ServiceManageProps {
  adminId: number;
}
export default function ServiceManage({ adminId }: ServiceManageProps) {
  const user = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();
  useEffect(() => {
    const getData = async () => {
      const data = await fetch(`/api/getUserById/${adminId}`);
      const json = await data.json();
      dispatch(push(json));
    };
    getData();
  }, []);

  interface Worker {
    id: number;
    name: string;
    lastname: string;
  }
  interface OpenState {
    id: number;
    isOpen: boolean;
  }
  const [open, setOpen] = useState<OpenState | null>(null);
  const openHandler = (id: number) => {
    setOpen({
      id: id,
      isOpen: open ? !open.isOpen : true,
    });
    if (editOpen?.isOpen) {
      setEditOpen({
        id: id,
        isOpen: false,
      });
    }
  };
  const [editOpen, setEditOpen] = useState<OpenState | null>(null);
  const [barber_services, setBarber_services] = useState<any>(null);
  const editOpenHandler = async (id: number) => {
    setEditOpen({
      id: id,
      isOpen: editOpen ? !editOpen.isOpen : true,
    });
    if (open?.isOpen) {
      setOpen({
        id: id,
        isOpen: false,
      });
    }
    const data = await fetch(`/api/GetBarberService/${id}`);
    const json = await data.json();
    setBarber_services(json.services);
  };

  return (
    <div className="flex flex-col items-center gap-20">
      <h2 className="text-4xl mt-10">בחר עובד</h2>
      <div className="flex gap-10 flex-col ">
        {user?.barber_workers.map((worker: Worker) => {
          return (
            <div
              key={worker.id}
              className=" bg-blue-600 text-white px-4 py-1 rounded-lg lg:text-2xl overflow-hidden "
            >
              <div className=" flex justify-around w-full">
                <h4>{worker.name}</h4>
                <button onClick={() => openHandler(worker.id)}>
                  הוסף שירותים
                </button>
                <button onClick={() => editOpenHandler(worker.id)}>
                  ערוך שירותים
                </button>
              </div>

              <div
                className={`w-[80vw] bg-white transition-all z-50 overflow-y-auto relative ${
                  open?.id === worker.id && open?.isOpen && !editOpen?.isOpen
                    ? "h-[300px]"
                    : "h-0"
                }`}
              >
                <AddService workerId={worker.id} adminId={user?.id} />
              </div>
              <div
                className={`w-[80vw] bg-white transition-all z-50 overflow-y-auto relative ${
                  editOpen?.id === worker.id &&
                  editOpen?.isOpen &&
                  !open?.isOpen
                    ? "h-[300px]"
                    : "h-0"
                }`}
              >
                <EditService
                  workerId={worker.id}
                  adminId={user?.id}
                  barber_services={barber_services}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
