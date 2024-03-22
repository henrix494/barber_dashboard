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

export const options = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: "משתמשים רשומים לפי חודשים",
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
export function RegisteredUsers({ id }: any) {
  const count = useSelector((state: RootState) => state.counter.value);
  const [createdAt, setCreatedAt] = useState([]);
  useEffect(() => {
    const createdAtArray = count?.barber_customers.map((cus: any) => {
      return cus.createdAt;
    });

    setCreatedAt(createdAtArray);
  }, [count]);

  let datasData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  createdAt?.map((date) => {
    const data = new Date(date).getMonth();
    datasData[data]++;
  });

  const data = {
    labels,
    datasets: [
      {
        label: "משתמשים רשומים",
        data: datasData,
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  return <Bar options={options} data={data} />;
}
