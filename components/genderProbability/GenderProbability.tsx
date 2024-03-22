"use client";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store";
import { push } from "@/lib/features/counter";
ChartJS.register(ArcElement, Tooltip, Legend);

export function GenderProbability({ id }: any) {
  const [maleCount, setMaleCount] = useState(0);
  const [femaleCount, setFemaleCount] = useState(0);
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
  useEffect(() => {
    let male = 0;
    let female = 0;

    count?.barber_customers.forEach((item: any) => {
      if (item.sex === "male") {
        male++;
      } else if (item.sex === "female") {
        female++;
      }
    });

    setMaleCount(male);
    setFemaleCount(female);
  }, [count]);
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: " גברים / נשים ",
        color: "white",
      },
    },
  };

  const data = {
    labels: ["גברים", "נשים"],
    datasets: [
      {
        label: "גברים נשים",
        data: [maleCount, femaleCount],
        backgroundColor: [
          "rgba(54, 162, 235, 0.2) ",
          "rgba(255, 99, 132, 0.2)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return <Pie data={data} options={options} />;
}
