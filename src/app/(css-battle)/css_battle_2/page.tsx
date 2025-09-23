import type { Metadata } from "next";
import "./battle.css";

export const metadata: Metadata = {
  title: "CSS Battle 2",
  description: "...",
};

export default function BattleOne() {
  return (
    <div className="flower">
      <i id="tl-long"></i>
      <i id="tr-long"></i>
      <i id="square"></i>
      <i id="bl-long"></i>
      <i id="br-long"></i>
    </div>
  );
}
