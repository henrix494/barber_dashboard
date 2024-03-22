import { db } from "@/db/connect";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { faker } from "@faker-js/faker/locale/he";
export const GET = async () => {
  const prisma = new PrismaClient();

  await prisma.barber_users.create({
    data: {
      username: "test",
      name: "בוקובזה",
      password: "test",
      email: "ascasc@gmail.com",
    },
  });
  // for (let i = 0; i < 5; i++) {
  //   await prisma.barber_workers.create({
  //     data: {
  //       name: faker.person.firstName(),
  //       lastname: faker.person.lastName(),
  //       barber_workers_belongsID: 1,
  //       role: "barber",
  //     },
  //   });
  // }
  // for (let i = 0; i < 15; i++) {
  //   await prisma.barber_customers.create({
  //     data: {
  //       barber_users_belongsID: 1,
  //       lastname: faker.person.lastName(),
  //       name: faker.person.firstName(),
  //       sex: faker.person.sex(),
  //       phone: faker.phone.number(),
  //       role: "customer",
  //     },
  //   });
  // }

  // const customers = await prisma.barber_customers.findMany({
  //   select: {
  //     id: true,
  //   },
  // });
  // const customerIds = customers.map((customer) => customer.id);
  // for (let i = 0; i < 600; i++) {
  //   const randomCustomerId =
  //     customerIds[Math.floor(Math.random() * customerIds.length)];

  //   // Generate a random date
  //   let appointmentDate = faker.date.between({
  //     from: "2024-03-03",
  //     to: "2024-06-31",
  //   });

  //   // Adjust the minutes to the nearest quarter hour
  //   let minutes = appointmentDate.getMinutes();
  //   let remainder = minutes % 15;
  //   if (remainder >= 7.5) {
  //     minutes += 15 - remainder;
  //   } else {
  //     minutes -= remainder;
  //   }

  //   // Set the minutes and seconds of the date
  //   appointmentDate.setMinutes(minutes, 0);

  //   await prisma.barber_appointments.create({
  //     data: {
  //       appointment_belongs_to_customerID: randomCustomerId,
  //       appointment_belongs_to_barberID: faker.number.int({ min: 1, max: 5 }),
  //       appointment_belongs_to_userID: 1,
  //       status: "pending",
  //       service: "haircut",
  //       price: faker.number.int({ min: 50, max: 80 }),
  //       apoointment_date: appointmentDate,
  //     },
  //   });
  // }
  // const days = ["Monday", "Tuesday", "Thursday", "Friday"];

  // // Create an Availability record for each 20-minute interval from 8:00 to 17:00 for each day
  // let startTime = 12; // 5 AM UTC is 8 AM Israel Daylight Time
  // let endTime = 18; // 14 PM UTC is 17 PM Israel Daylight Time

  // let today = new Date();
  // today.setHours(0, 0, 0, 0); // Reset the time part to start at the beginning of the day

  // for (let i = 0; i < 7; i++) {
  //   let day = new Date(today.getTime() + i * 24 * 60 * 60 * 1000); // Add i days to today's date

  //   for (let time = startTime; time < endTime; time += 0.3333) {
  //     // Create a new Date object
  //     let minutes = Math.round((time % 1) * 60);
  //     let timeSlot = new Date(
  //       Date.UTC(
  //         day.getFullYear(),
  //         day.getMonth(),
  //         day.getDate(),
  //         Math.floor(time),
  //         minutes
  //       )
  //     );

  //     await prisma.availability.create({
  //       data: {
  //         barberId: 4,
  //         day: day.toISOString(), // Convert day to string
  //         timeSlot: timeSlot,
  //         duration: 20,
  //       },
  //     });
  //   }

  return NextResponse.json({ messge: "sess" }, { status: 201 });
};
