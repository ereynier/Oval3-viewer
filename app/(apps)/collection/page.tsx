import Error from "next/error";
import Landing from "./Components/Landing";
import { redirect } from "next/navigation";

export default function Home() {
  
  // redirect("/");

  return (
    <div>
      <Landing />
    </div>
  );
}
