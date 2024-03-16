import EventCard from "@/components/eventCard";
import Image from "next/image";

export default function Home() {
  return (
    <main className="">
      <div>Hello World</div>
      <div>
        < EventCard />
        < EventCard />
        < EventCard />
        < EventCard />
        < EventCard />
      </div>
    </main>
  );
}
