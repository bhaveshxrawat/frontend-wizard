import "./home.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className="home">
      <h1>Tasks</h1>
      <div className="task _1">
        <h2>
          Task 1 - Design & UI {"("}CSS Battles{")"}
        </h2>
        <ul>
          <li>
            <Link href="/css_battle_1">#133 - Battle 1 ↗</Link>
          </li>
          <li>
            <Link href="/css_battle_2">#239 - Battle 2 ↗</Link>
          </li>
        </ul>
      </div>
      <div className="task _2">
        <h2>Task 2: Logic & Code Quality — Birthday Calendar</h2>
        <ul>
          <li>
            <Link href="/birthday-calendar">Birthday Calendar ↗</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
