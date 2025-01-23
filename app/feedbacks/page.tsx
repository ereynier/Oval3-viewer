import Link from "next/link";
import FeedbacksTable from "./components/FeedbacksTable";
import { HomeIcon } from "lucide-react";

export const revalidate = 300;

export default function Feedbacks() {
  return (
    <div className="">
      <h1 className="text-3xl font-bold text-center pt-8">Feedbacks</h1>
      <FeedbacksTable />
    </div>
  );
}
