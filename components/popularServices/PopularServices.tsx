"use client";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store";

ChartJS.register(ArcElement, Tooltip, Legend);

export function PopularServices({ id }: any) {
  const [serviceCount, setServiceCount] = useState<any>({});

  const count = useSelector((state: RootState) => state.counter.value);
  useEffect(() => {
    const serviceCount = count?.barber_appointments.reduce(
      (acc: any, app: any) => {
        console.log(app);
        acc[app.serviceId] = (acc[app.serviceId] || 0) + 1;
        return acc;
      },
      {}
    );

    setServiceCount(serviceCount);
  }, [count]);

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: " שירותים",
        color: "white",
      },
    },
  };

  const serviceIdToName = count?.barber_services.reduce(
    (acc: any, service: any) => {
      acc[service.id] = service.name;
      return acc;
    },
    {}
  );

  const labels = serviceCount
    ? Object.entries(serviceCount).map(([serviceId, count]) => {
        console.log(serviceCount);
        return `${serviceIdToName[serviceId]}:${count}`;
      })
    : [];
  const dataValues = serviceCount ? Object.values(serviceCount) : [];

  const data = {
    labels: labels,
    datasets: [
      {
        label: " כמות",
        data: dataValues,
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
