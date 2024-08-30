import Error from "next/error";
import { redirect } from "next/navigation";
import Collection from "./Components/Collection"

export default function Home() {
  
  // redirect("/");

  return (
    <div>
      <Collection />
    </div>
  );
}
