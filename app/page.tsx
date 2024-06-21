import PopUp from "@/components/PopUp";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Button asChild>
        <Link href="collection">Collection</Link>
      </Button>
      <Button asChild>
        <Link href="players">Players</Link>
      </Button>
      <PopUp />
    </div>
  );
}
