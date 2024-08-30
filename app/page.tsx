import PopUp from "@/components/PopUp";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import Landing from "./(apps)/collection/Components/Landing";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      {/* <Landing /> */}
      <div className="flex flex-col items-center justify-center gap-4">
        <Link href="/collection">
          Collection
        </Link>
        <Link href="/player">
          Player
        </Link>
      </div>
    </div>
  );
}
