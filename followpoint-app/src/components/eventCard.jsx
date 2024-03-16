import Link from "next/link";

export default function EventCard() {
  return (
    <div className="m-1 border-sky-100 border">
      <div>Event title</div>
      <div>event excerpt</div>
      <div>event tags: music, food, etc</div>
      <div>event date</div>
      <Link href={"event/nama-event"}>
        <div className="hover:cursor-pointer hover:bg-slate-500">go to event details</div>
      </Link>
    </div>
  );
}
