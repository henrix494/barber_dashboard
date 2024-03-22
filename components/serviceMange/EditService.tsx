import React, { useState, useEffect } from "react";
interface EditServiceProps {
  workerId: number;
  adminId: number;
  barber_services: [
    {
      id: number;
      name: string;
      price: number;
    }
  ];
}
interface Service {
  id: number;
  name: string;
  price: number;
}

export default function EditService({
  workerId,
  adminId,
  barber_services,
}: EditServiceProps) {
  const [isEdit, setIsEdit] = useState<{ [key: number]: boolean }>({});
  const [services, setServices] = useState<Service[]>([]);
  const editBtnhandler = (id: number) => {
    setIsEdit({ ...isEdit, [id]: true });
  };
  const saveBtnhandler = async () => {
    const res = await fetch("/api/editService", {
      method: "PATCH",
      body: JSON.stringify([services]),
    });
  };
  const closeBtnhandler = (id: number) => {
    setIsEdit({ ...isEdit, [id]: false });
  };
  const handleInputChange = (
    id: number,
    field: keyof Service,
    value: string | number
  ) => {
    setServices({
      ...services,
      [id]: { ...services[id], [field]: value, id: id },
    });
  };

  return (
    <div className="text-black">
      <div>
        {barber_services?.map((item) => {
          return (
            <div key={item.id} className="flex gap-10 border-2 py-2">
              {isEdit[item.id] ? (
                <input
                  className=" outline-none border-b-2 border-b-black"
                  placeholder={item.name}
                  onChange={(e) =>
                    handleInputChange(item.id, "name", e.target.value)
                  }
                />
              ) : (
                <p>{item.name}</p>
              )}

              {isEdit[item.id] ? (
                <input
                  className=" outline-none border-b-2 border-b-black"
                  placeholder={item.price.toString()}
                  onChange={(e) =>
                    handleInputChange(item.id, "price", Number(e.target.value))
                  }
                />
              ) : (
                <p> {item.price} שח</p>
              )}
              {isEdit[item.id] ? (
                <button
                  onClick={() => closeBtnhandler(item.id)}
                  className=" bg-blue-500 text-white px-2  rounded-lg  "
                >
                  X
                </button>
              ) : (
                <button
                  onClick={() => editBtnhandler(item.id)}
                  className=" bg-blue-500 text-white px-2  rounded-lg  "
                >
                  ערוך
                </button>
              )}
            </div>
          );
        })}
      </div>
      <button onClick={saveBtnhandler}>שמור</button>
    </div>
  );
}
