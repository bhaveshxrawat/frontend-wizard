import type { Metadata } from "next";
import "./battle.css";

export const metadata: Metadata = {
  title: "CSS Battle 1",
  description: "...",
};

export default function BattleOne() {
  return (
    <div className="spiral">
      <i id="inner-dot"></i>
      <div id="inner-first-curve"></div>
      <div id="inner-second-curve"></div>
      <div id="inner-third-curve"></div>
      <div id="inner-fourth-curve"></div>
      <i id="outer-dot"></i>
    </div>
  );
}
