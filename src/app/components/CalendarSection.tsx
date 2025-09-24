"use client";

import { useSearchParams } from "next/navigation";
import { DAYS, DEFAULT_YEAR } from "../consts";
import type { Data } from "../types";
import Calendar from "./ui/Calendar";

type Props = React.ComponentProps<"div"> & { data: Data };

export default function CalendarSection({ data, ...props }: Props) {
  const searchParams = useSearchParams();
  const year = Number(searchParams.get("year")) || DEFAULT_YEAR;
  const calendarArr = DAYS.map((day, idx) => ({
    day,
    data: [
      ...data.reduce<{ name: string; birthday: string }[]>((acc, curr) => {
        const bday = new Date(curr.birthday);
        const customDay = `${year}-${(bday.getMonth() + 1).toString().padStart(2, "0")}-${bday.getDate().toString().padStart(2, "0")}`;
        if (new Date(customDay).getUTCDay() === idx) {
          acc.push(curr);
        }
        return acc;
      }, []),
    ],
  }));
  return (
    <div className="calendar" {...props}>
      <h1>Calendar</h1>
      <div className="calendar-list">
        {calendarArr.map((item) => (
          <Calendar key={item.day} day={item.day} data={item.data} />
        ))}
      </div>
    </div>
  );
}
