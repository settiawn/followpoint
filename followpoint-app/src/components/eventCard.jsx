import Link from "next/link";

export default function EventCard({data}) {
  return (
    <div className="m-1 border-sky-100 border">
      <div>{data.title}</div>
      <div>{data.description}</div>
      <div>Date : {data.date}</div>
      <div>Organizer : {data.organizer}</div>
      <div><img src={data.thumbnail} alt="" className="w-96 h-96" /></div>
      <Link href={`/event/${data.slug}`}>
        <div className="hover:cursor-pointer hover:bg-slate-500">go to event details</div>
      </Link>
    </div>
  );
}
