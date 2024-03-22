import React, { useState } from "react";
interface AddServiceProps {
  workerId: number;
  adminId: number;
}
interface Service {
  name?: string;
  price?: number;
  workerId?: number;
}
export default function AddService({ workerId, adminId }: AddServiceProps) {
  const [fields, setFields] = useState<Service[]>([{ name: "", price: 0 }]);
  const addMoreFields = () => {
    setFields((prev) => [...prev, { name: "", price: 0 }]);
  };
  const handleInputChange = (
    index: number,
    key: keyof Service,
    value: string | number
  ) => {
    setFields((prev) =>
      prev.map((field, i) => (i === index ? { ...field, [key]: value } : field))
    );
  };
  const sendData = async () => {
    const data = await fetch("/api/addService", {
      method: "POST",
      body: JSON.stringify({
        id: workerId,
        services: fields,
        adminId: adminId,
      }),
    });
  };
  const renderFields = () => {
    return fields.map((field, index) => (
      <div key={index} className="flex gap-2 items-center overflow-y-auto">
        <label htmlFor={`nameOfService${index}`}>שם השירות</label>
        <input
          className=" border-2 rounded-lg w-[200px] h-10"
          type="text"
          name={`nameOfService${index}`}
          id={`nameOfService${index}`}
          value={field.name}
          onChange={(e) => handleInputChange(index, "name", e.target.value)}
        />
        <label htmlFor={`price${index}`}> מחיר</label>
        <input
          className=" border-2 rounded-lg w-[200px] h-10"
          type="text"
          name={`price${index}`}
          id={`price${index}`}
          value={field.price}
          onChange={(e) =>
            handleInputChange(index, "price", Number(e.target.value))
          }
        />
      </div>
    ));
  };

  return (
    <div className="text-black flex      ">
      <div className=" mt-10 flex items-center gap-10 ">
        <div className="flex gap-2 items-center flex-wrap overflow-y-auto">
          {renderFields()}
        </div>
        <button
          onClick={addMoreFields}
          className=" bg-blue-300 p-2 rounded-xl absolute left-2 top-5"
        >
          לחץ להוספת שירותים נוספים
        </button>
        <button
          onClick={sendData}
          className=" bg-blue-300 p-2 rounded-xl absolute left-2 bottom-0"
        >
          שמור
        </button>
      </div>
    </div>
  );
}
