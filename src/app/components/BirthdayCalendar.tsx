"use client";

import { memo, Suspense, useState } from "react";
import sampleData from "@/app/data/sampleData.json";
import type { Data } from "../types";
import CalendarSection from "./CalendarSection";
import Textarea from "./Textarea";
import YearSection from "./YearSection";

export default function BirthdayCalendar() {
  const [data, setData] = useState<Data>(sampleData);
  function handleDataChange(data: Data) {
    setData(data);
  }
  const MemoedYearSection = memo(YearSection);
  return (
    <div className="page">
      <Suspense>
        <CalendarSection data={data} />
        <MemoedYearSection />
      </Suspense>
      <Textarea data={data} changeHandler={handleDataChange} />
    </div>
  );
}
