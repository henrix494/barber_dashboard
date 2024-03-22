"use client";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store";

ChartJS.register(ArcElement, Tooltip, Legend);

export function Ages({ id }: any) {
  const [ageCount, setAgeCount] = useState<any>({
    veryYoung: 0,
    young: 0,
    youngAdult: 0,
    adult: 0,
    senior: 0,
    old: 0,
  });
  const count = useSelector((state: RootState) => state.counter.value);
  useEffect(() => {
    let newAgeCount = {
      veryYoung: 0,
      young: 0,
      youngAdult: 0,
      adult: 0,
      senior: 0,
      old: 0,
    };

    count?.barber_customers.forEach((item: any) => {
      let birthYear = new Date(item.birthdate).getFullYear();
      let age = new Date().getFullYear();
      let ageGroup = age - birthYear;

      if (ageGroup <= 12) {
        newAgeCount.veryYoung += 1;
      } else if (ageGroup >= 13 && ageGroup <= 18) {
        newAgeCount.young += 1;
      } else if (ageGroup >= 19 && ageGroup <= 30) {
        newAgeCount.youngAdult += 1;
      } else if (ageGroup >= 31 && ageGroup <= 50) {
        newAgeCount.adult += 1;
      } else if (ageGroup >= 51 && ageGroup <= 70) {
        newAgeCount.senior += 1;
      } else if (ageGroup >= 71) {
        newAgeCount.old += 1;
      }
    });

    setAgeCount(newAgeCount);
  }, [count]);

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: " גילאים",
        color: "white",
      },
    },
  };

  const data = {
    labels: ["0-12", "13-18", "19-30", "31-50", "51-70", "71-100"],
    datasets: [
      {
        label: " כמות",
        data: [
          ageCount.veryYoung,
          ageCount.young,
          ageCount.youngAdult,
          ageCount.adult,
          ageCount.senior,
          ageCount.old,
        ],
        backgroundColor: [
          "rgba(54, 162, 235, 0.2) ",
          "rgba(255, 150, 132, 0.2)",
          "rgba(150, 255, 132, 0.2)",
          "rgba(150, 255, 000, 0.2)",
          "rgba(150, 100, 000, 0.5)",
          "rgba(000, 100, 000, 0.5)",
          "rgba(150, 150, 150, 0.5)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return <Pie data={data} options={options} />;
}
