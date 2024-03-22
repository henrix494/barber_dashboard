import React, { useState } from "react";

interface AddAppointmentProps {
  appointmentAddHandler: any;
  AddAppointmentModel: boolean;
  users: [{ id: number; name: string; lastname: string; phone: string }];
  barberId: number;
  isoDate: string;
  adminId: number;
  setNewData: any;
  barberInfop: any;
}

export default function AddAppointment({
  appointmentAddHandler,
  AddAppointmentModel,
  users,
  barberId,
  isoDate,
  adminId,
  setNewData,
  barberInfop,
}: AddAppointmentProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [serviceId, setServiceId] = useState(1);

  const searchUser = (e: any) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users?.filter((user) =>
    user.phone.includes(searchTerm)
  );
  const AddAppointmentHandler = async (id: number) => {
    const sendData = await fetch(`/api/createAppointment`, {
      method: "PUT",
      body: JSON.stringify({ id, isoDate, barberId, adminId, serviceId }),
    });
    const fetchData = async () => {
      const data = await fetch(`/api/getAppointmentInfo/${barberId}`);
      const json = await data.json();
      setNewData(json);
    };
    fetchData();
    appointmentAddHandler();
  };
  return (
    <div
      className={`absolute top-1/2 left-1/2 w-[700px] h-[400px] bg-blue-200 translate-x-[-50%] rounded-xl z-[500] overflow-y-auto ${
        AddAppointmentModel ? "block" : "hidden"
      }`}
    >
      <div
        className="mt-5 text-black cursor-pointer absolute top-3 right-10 text-2xl"
        onClick={appointmentAddHandler}
      >
        X
      </div>
      <div>
        <h3 className="text-black">חפש לפי מספר</h3>
        <input type="text" className="text-black" onChange={searchUser} />
      </div>
      <div className=" ">
        {filteredUsers?.map((user) => {
          return (
            <div
              key={user.id}
              className="flex justify-center  items-center mt-10 gap-10 border-2"
            >
              <h3 className="text-xl font-bold text-black">
                {user.name} {user.lastname}
              </h3>
              <h2 className="text-xl font-bold text-black">{user.phone}</h2>
              <select
                className="text-black"
                onChange={(e) => {
                  setServiceId(parseInt(e.target.value));
                }}
              >
                {barberInfop?.services?.map((item: any) => {
                  return (
                    <option
                      className="text-black"
                      value={item.id}
                      key={item.id}
                    >
                      {item.name}
                    </option>
                  );
                })}
              </select>
              <button
                onClick={() => AddAppointmentHandler(user.id)}
                className=" bg-red-500 px-5 py-3 text-white rounded-lg text-xl"
              >
                הוסך תור
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
