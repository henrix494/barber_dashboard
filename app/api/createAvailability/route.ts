import { db } from "@/db/connect";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest, context: any) => {
  const body = await req.json();
  let { start, end, days, id } = body;
  // Adjust the days array to match JavaScript's getDay() method
  days = days.map((day: number) => day - 1);

  let startTime = parseInt(start); // Start time from client
  let endTime = parseInt(end); // End time from client

  let today = new Date(
    Date.UTC(
      new Date().getUTCFullYear(),
      new Date().getUTCMonth(),
      new Date().getUTCDate()
    )
  );

  for (let i = 0; i < 7; i++) {
    let day = new Date(
      Date.UTC(
        today.getUTCFullYear(),
        today.getUTCMonth(),
        today.getUTCDate() + i
      )
    );

    // Get the day of the week
    let dayOfWeek = day.getUTCDay();

    // Check if the day of the week is in the days array from the client
    if (days.includes(dayOfWeek)) {
      for (let time = startTime; time < endTime; time += 0.3333) {
        // Create a new Date object
        let minutes = Math.round((time % 1) * 60);
        let timeSlot = new Date(
          Date.UTC(
            day.getUTCFullYear(),
            day.getUTCMonth(),
            day.getUTCDate(),
            Math.floor(time),
            minutes
          )
        );

        // Check if the time slot already exists
        const existingTimeSlot = await db.availability.findFirst({
          where: {
            timeSlot: timeSlot,
          },
        });

        // If the time slot does not exist, create a new one
        if (!existingTimeSlot) {
          await db.availability.create({
            data: {
              barberId: id, // Barber ID from client
              day: day.toISOString(), // Convert day to string
              timeSlot: timeSlot,
              duration: 20,
            },
          });
        }
      }
    }
  }

  return NextResponse.json({ message: "Availability created" });
};
