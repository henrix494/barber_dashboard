"use client";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store";
import esLocale from "@fullcalendar/core/locales/he";
import interactionPlugin from "@fullcalendar/interaction"; // for selectable
import { useState, useEffect } from "react";
import AddAppointment from "./AddAppointment";
import { Modal } from "../model/Model";
import { set } from "react-hook-form";
export default function Calendar({ barberId, barberInfop }: any) {
  const count = useSelector((state: RootState) => state.counter.value);
  const [data, setData] = useState();
  const [isEventClicked, setIsEventClicked] = useState<boolean>(false);
  const [eventPosition, setEventPosition] = useState({ x: 0, y: 0 });
  const [appointmentId, setAppointmentId] = useState();
  const [eventDroped, setEventDroped] = useState(false);
  const [isDayClicked, setIsDayClicked] = useState(false);

  const events =
    (data as unknown as any[])?.map((item: any) => {
      const data = new Date(item.apoointment_date);
      const startDate = new Date(data);
      const endDate = new Date(startDate);
      endDate.setMinutes(startDate.getMinutes() + 20);
      console.log(item.apoointment_service);
      return {
        title: `${item.appointment_belongs_to_customer.name} ${item.service.name} ${item.service.price}`,
        start: startDate.toISOString(),
        end: endDate.toISOString(),
        allDay: false,
        id: item.id,
      };
    }) || [];
  console.log(data);
  const eventDropHandler = async (info: any) => {
    const id = info.event.id;
    const newDate = info.event.start.toISOString();

    const sendData = await fetch(
      `http://localhost:3000/api/updateAppointemt/${id}`,
      {
        method: "PUT",
        body: JSON.stringify({ newDate }),
      }
    );
    setEventDroped((prev) => !prev);
  };
  const eventDeleteHandler = async () => {
    const sendData = await fetch(
      `http://localhost:3000/api/deleteAppointment/${appointmentId}`,
      {
        method: "DELETE",
      }
    );
    const data = await fetch(`/api/getAppointmentInfo/${barberId}`);
    const json = await data.json();
    setData(json);
    setIsEventClicked(false);
  };
  const evenClickHandler = (info: any) => {
    setIsEventClicked((prev) => {
      return !prev;
    });
    setAppointmentId(info.event.id);

    setEventPosition({ x: info.jsEvent.clientX, y: info.jsEvent.clientY });
  };
  useEffect(() => {
    if (!barberId) return;
    else {
      const fetchData = async () => {
        const data = await fetch(`/api/getAppointmentInfo/${barberId}`);
        const json = await data.json();
        console.log(json);
        setData(json);
      };
      fetchData();
    }
  }, [barberId, eventDroped]);
  const [dateClicked, setDateClicked] = useState({
    year: 0,
    day: 0,
    month: 0,
    fullTime: "",
  });
  const [isoDate, setIsoDate] = useState("");
  const handleDateClick = (arg: any) => {
    setIsDayClicked((prev) => !prev);
    setEventPosition({ x: arg.jsEvent.clientX, y: arg.jsEvent.clientY });
    let date = new Date(arg.dateStr);
    let localISODate = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    ).toISOString();
    setIsoDate(localISODate);
    let time = date.toTimeString().split(" ")[0];
    let trimmedTime = time.substring(0, time.lastIndexOf(":"));
    setDateClicked({
      month: date.getMonth() + 1,
      day: date.getDate(),
      year: date.getFullYear(),
      fullTime: trimmedTime,
    });
  };
  const [AddAppointmentModel, setAddAppointmentModel] = useState(false);
  const appointmentAddHandler = () => {
    setAddAppointmentModel((prev) => !prev);
  };
  const setNewData = (data: any) => {
    setData(data);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModlel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <FullCalendar
        timeZone="Asia/Jerusalem"
        height={"95vh"}
        plugins={[interactionPlugin, timeGridPlugin, dayGridPlugin]}
        locale={esLocale}
        initialView="timeGridWeek"
        hiddenDays={[6]}
        selectable={true}
        slotDuration={"00:20:00"}
        slotMinTime={"08:00:00"}
        slotMaxTime={"20:00:00"}
        events={events}
        headerToolbar={{
          left: "prev,next,today",
          center: "title",
          right: "timeGridWeek timeGridDay dayGridMonth",
        }}
        dateClick={(info) => {
          let calendarApi = info.view.calendar;

          calendarApi.changeView("timeGridWeek", info.dateStr);
          setIsEventClicked(false);
          handleDateClick(info);
        }}
        eventDrop={(info) => {
          eventDropHandler(info);
        }}
        eventClick={(info) => {
          evenClickHandler(info);
        }}
        editable={true}
      />
      {isEventClicked && (
        <div
          style={{
            position: "absolute",
            top: eventPosition.y + 80,
            left: eventPosition.x,
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            backgroundColor: "black",
            zIndex: 150,
            width: "100px",
          }}
          className={`  w-[50px] h-[50px] bg-black`}
        >
          <button className=" bg-blue-500 w-full" onClick={eventDeleteHandler}>
            מחק
          </button>
          <button className=" bg-blue-500 w-full"> שלח התראה</button>
        </div>
      )}
      {isDayClicked && (
        <div
          style={{
            position: "absolute",
            top: eventPosition.y + 80,
            left: eventPosition.x,
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            backgroundColor: "black",
            zIndex: 150,
            width: "250px",
            height: "100px",
          }}
        >
          <div>
            {dateClicked.year} / {dateClicked.month} / {dateClicked.day}
          </div>
          <div> {dateClicked.fullTime}</div>
          <button
            onClick={appointmentAddHandler}
            className=" bg-blue-500 w-full"
          >
            {" "}
            הוסך תור
          </button>
        </div>
      )}
      <AddAppointment
        appointmentAddHandler={appointmentAddHandler}
        AddAppointmentModel={AddAppointmentModel}
        users={count?.barber_customers}
        barberId={barberId}
        isoDate={isoDate}
        adminId={count?.id}
        setNewData={setNewData}
        barberInfop={barberInfop}
      />
      <Modal shouldShow={isModalOpen} onRequestClose={closeModlel}>
        <div>ascasc</div>
      </Modal>
    </>
  );
}
