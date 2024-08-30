import { redirect } from "next/navigation";
import Player from "./Components/Player";

export default function Home() {
  
//   redirect("/");

  return (
    <div>
      <Player  />
    </div>
  );
}
