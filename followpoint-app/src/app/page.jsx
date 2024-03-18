import EventCard from "@/components/eventCard";
import Navbar from "@/components/navbar";
import DropdownSidebar from "@/components/sidebar";

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
    <main className="bg-[rgba(27,29,34,1)] min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap -m-1 gap-5">
          {data.map((event, index) => (
            <EventCard data={event} key={index} />
          ))}
        </div>
      </div>
    </main>
  );
}
