"use client";

import { useRef, useState } from "react";
import "./style.css";
import { useRouter, useSearchParams } from "next/navigation";
import * as z from "zod";
import sampleData from "@/app/data/sampleData.json";
import Calendar from "../components/ui/Calendar";
import { days } from "../consts";

const Data = z.array(
  z.object({
    name: z.string(),
    birthday: z.string(),
  }),
);
type Data = z.infer<typeof Data>;

export default function Page() {
  const [data, setData] = useState<Data>(sampleData);
  const searchParams = useSearchParams();
  const router = useRouter();
  const year = Number(searchParams.get("year")) || 2015;

  const range = { FROM: 2000, TO: new Date(Date.now()).getUTCFullYear() };
  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    router.replace(`?year=${e.target.value}`);
  }
  const btnRef = useRef<HTMLButtonElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  function handleFormChange() {
    if (!btnRef?.current) return;
    btnRef.current.disabled = false;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!textareaRef?.current) return;
    const { value } = textareaRef.current;
    let parsedJson: Data;
    try {
      parsedJson = JSON.parse(value);
    } catch (err) {
      alert(`Invalid JSON: ${err instanceof Error && err.message}`);
      return;
    }
    const parseVal = Data.safeParse(parsedJson);
    if (parseVal.error) alert(`${parseVal.error.issues[0].message}`);
    if (!parseVal.success) return;
    setData(parseVal.data);
  }

  const calendarArr = days.map((day, idx) => ({
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
    <main>
      <div className="page">
        <div className="calendar">
          <h1>Calendar</h1>
          <div className="calendar-list">
            {calendarArr.map((item) => (
              <Calendar key={item.day} day={item.day} data={item.data} />
            ))}
          </div>
        </div>
        <div className="year">
          <select name="year" id="year" onChange={handleChange} value={year}>
            <option value={2000}>2000</option>
            {Array.from<number>({ length: range.TO - range.FROM }).map(
              (_, idx) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: <shushh>
                <option key={idx} value={2000 + idx + 1}>
                  {2000 + idx + 1}
                </option>
              ),
            )}
          </select>
        </div>
        <div className="jsonData">
          <form onChange={handleFormChange} onSubmit={handleSubmit}>
            <textarea
              ref={textareaRef}
              suppressHydrationWarning
              name=""
              id=""
              defaultValue={JSON.stringify(data)}
              autoCorrect="off"
              autoComplete="off"
              autoCapitalize="off"
              rows={25}
            ></textarea>
            <button ref={btnRef} type="submit" disabled>
              Save
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
