import { useRouter, useSearchParams } from "next/navigation";
import { DEFAULT_YEAR } from "../consts";

export default function YearSection() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const year = Number(searchParams.get("year")) || DEFAULT_YEAR;

  const range = { FROM: 2000, TO: new Date(Date.now()).getUTCFullYear() };
  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    router.replace(`?year=${e.target.value}`);
  }
  return (
    <div className="year">
      <select name="year" id="year" onChange={handleChange} value={year}>
        <option value={2000}>2000</option>
        {Array.from<number>({ length: range.TO - range.FROM }).map((_, idx) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: <shushh>
          <option key={idx} value={2000 + idx + 1}>
            {2000 + idx + 1}
          </option>
        ))}
      </select>
    </div>
  );
}
