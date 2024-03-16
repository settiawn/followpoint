import Link from "next/link";

export default function TicketCard() {
  return (
    <div className="m-1 border-sky-100 border">
      <div>ticket code</div>
      <div>ticket event title</div>
      <div>ticket status</div>
      <div>ticket date</div>
      <Link href={"/user/tickets/12345"}>
        <div className="hover:cursor-pointer hover:bg-slate-500">
          show ticket details
        </div>
      </Link>
    </div>
  );
}
