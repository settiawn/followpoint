import Link from "next/link";

export default function EventDetailPage() {
  return (
    <main>
      <div>Ini event detail page</div>
      <div>
        <div>event title</div>
        <div>event description</div>
      </div>
      <Link href={"/event/event-name/map"}>
        <div className="hover:bg-slate-400">Show event map</div>
      </Link>
      <Link href={"/event/event-name/buy"}>
        <div className="hover:bg-slate-400">Buy event ticket</div>
      </Link>
    </main>
  );
}
