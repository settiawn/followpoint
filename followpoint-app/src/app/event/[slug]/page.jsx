import Link from "next/link";

export const getEventDetails = async (slug) => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_BASE_URL + "/api/events/" + slug,
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
} 

export default async function EventDetailPage({params}) {
  const data = await getEventDetails(params.slug);

  return (
    <main>
      <div>Ini event detail page</div>
      <div>{data.title}</div>
      <div>{data.description}</div>
      <div>Date : {data.date}</div>
      <div>Organizer : {data.organizer}</div>
      <div><img src={data.thumbnail} alt="" className="w-96 h-96" /></div>
      <Link href={`/event/${data.slug}/map`}>
        <div className="hover:bg-slate-400">Show event map</div>
      </Link>
      <Link href={`/event/${data.slug}/buy`}>
        <div className="hover:bg-slate-400">Buy event ticket</div>
      </Link>
    </main>
  );
}
