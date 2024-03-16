import Link from "next/link";

export default function Navbar() {
  return (
    <div className="bg-blue-500 flex flex-row justify-center gap-2">
      <Link href={"/"}>
        <div>Events</div>
      </Link>
      <Link href={"/login"}>
        <div>Login</div>
      </Link>
      <Link href={"/user/tickets"}>
        <div>Tickets</div>
      </Link>
    </div>
  );
}
