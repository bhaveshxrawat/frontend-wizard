import type { days } from "@/app/consts";
import { fromFullNameToInitials, randomizeColor } from "@/app/utils";

type Props = React.ComponentProps<"div"> & {
  day: (typeof days)[number];
  data: {
    name: string;
    birthday: string;
  }[];
};

export default function Calendar({ day, data, ...props }: Props) {
  const sorted = data.sort(
    (a, b) => new Date(b.birthday).getTime() - new Date(a.birthday).getTime(),
  );
  const cn = sorted.length === 0 ? "day-empty" : "";
  return (
    <div className={`calendar-item ${cn}`.trim()} {...props}>
      <header>{day}</header>
      <ul className="name-grid">
        {sorted.map((item, idx) => (
          <li
            // biome-ignore lint/suspicious/noArrayIndexKey: <shushh>
            key={idx}
            title={item.name}
            style={{ backgroundColor: `var(--shade-${randomizeColor()})` }}
            suppressHydrationWarning
          >
            {fromFullNameToInitials(item.name)}
          </li>
        ))}
      </ul>
    </div>
  );
}
