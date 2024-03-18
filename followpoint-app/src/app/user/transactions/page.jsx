import TicketCard from "@/components/ticketCard";
import { cookies } from "next/headers";

export const getUserTransactions = async () => {
  // console.log(cookies().toString(), "<<<<cookies");
  const response = await fetch(
    process.env.NEXT_PUBLIC_BASE_URL + "/api/user/transactions",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookies().toString(),
      },
    }
  );

  if (!response.ok) {
    throw new Error("Error!");
  }

  const { data } = await response.json();
  return data;
};

export default async function UserTicketsPage() {
  const data = await getUserTransactions();
  return (
    <main>
      <div>Ini user tickets page</div>
      <div>
        {data.map((x, i) => {
          return (
            <>
              <TicketCard key={i} data={x} />
            </>
          );
        })}
      </div>
    </main>
  );
}
