import EventCard from "@/components/eventCard";
import DropdownSidebar from "@/components/navbar";

export default async function Home() {
  const getAllEventData = await fetch(
    process.env.NEXT_PUBLIC_BASE_URL + "/api/events",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const { data } = await getAllEventData.json();

  return (
    <main className="">
      <DropdownSidebar />
      <div>Hello World</div>
      <div>
        {data.map((x, i) => {
          return <EventCard data={x} key={i} />;
        })}
      </div>
    </main>
  );
}
