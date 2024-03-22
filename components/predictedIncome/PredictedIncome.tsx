"use client";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: "   צפי הכנסות לפי חודשים",
      color: "white",
    },
  },
  scales: {
    y: {
      ticks: {
        stepSize: 1,
        color: "white",
      },
    },
    x: {
      ticks: {
        color: "white",
      },
    },
  },
};

const labels = [
  "ינואר",
  "פברואר",
  "מרץ",
  "אפריל",
  "מאי",
  "יוני",
  "יולי",
  "אוגוסט",
  "ספטמבר",
  "אוקטובר",
  "נובמבר",
  "דצמבר",
];
export function PredictedIncome({ id }: any) {
  const count = useSelector((state: RootState) => state.counter.value);
  const [barberAppointments, setBarberAppointments] = useState([]);

  useEffect(() => {
    const createdAtArray = count?.barber_appointments.map((cus: any) => {
      return cus;
    });
    setBarberAppointments(createdAtArray);
  }, [count]);

  let datasData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  barberAppointments?.forEach((app: any) => {
    const data = new Date(app.apoointment_date).getMonth();
    const service = count?.barber_services.find(
      (service: any) => service.id === app.serviceId
    );
    if (service) {
      datasData[data] += service.price;
    }
  });

  const data = {
    labels,
    datasets: [
      {
        label: "צפי הכנסות לפי חודש",
        data: datasData,
        backgroundColor: "rgb(60, 179, 113)",
      },
    ],
  };
  return <Bar data={data} options={options} />;
}
