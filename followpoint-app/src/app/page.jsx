import EventCard from "@/components/eventCard";
import DropdownSidebar from "@/components/navbar";

export default function Home() {
  return (
    <main className="">
      <DropdownSidebar />
      <div>Hello World</div>
      <div>
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
      </div>
    </main>
  );
}
