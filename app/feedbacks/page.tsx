import Link from "next/link";
import FeedbacksTable from "./components/FeedbacksTable";
import { HomeIcon } from "lucide-react";
import { Metadata } from "next";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Feedbacks",
  description: "Feedbacks about the Oval3 Viewer",
  alternates: {
    canonical: `https://oval3viewer.estebanr.fr/feedbacks`
  }
};

export default function Feedbacks() {
  return (
    <div className="">
      <h1 className="text-3xl font-bold text-center pt-8">Feedbacks</h1>
      <FeedbacksTable />
    </div>
  );
}
