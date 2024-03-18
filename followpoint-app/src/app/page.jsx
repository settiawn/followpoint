import EventCard from "@/components/eventCard";
import DropdownSidebar from "@/components/navbar";

export const getAllEventData = async () => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_BASE_URL + "/api/events",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Error!");
  }

  const { data } = await response.json();
  return data;
};

export default async function Home() {
  const data = await getAllEventData();

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
