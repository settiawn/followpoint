import Link from "next/link";

export const getEventDetails = async (slug) => {
	const response = await fetch(
		process.env.NEXT_PUBLIC_BASE_URL + "/api/events/" + slug,
		{
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		},
	);

	if (!response.ok) {
		throw new Error("Error!");
	}

	const { data } = await response.json();
	return data;
};

export default async function EventDetailPage({ params }) {
	const data = await getEventDetails(params.slug);

	return (
		<>
			<main className="bg-[rgba(27,29,34,1)] min-h-screen flex flex-col justify-center items-center text-yellow-500 font-extrabold">
				<div className="text-2xl mb-8">Event Details</div>
				<div className="font-bold text-yellow-500 text-5xl">{data.title}</div>
				<div className="text-white mt-3 mb-5 w-4/6">{data.description}</div>
				<div className="text-yellow-500 text-lg">Date : </div>
				<p className="text-white mb-4">{data.date}</p>
				<div className="text-yellow-500 text-lg">Organizer : </div>
				<p className="text-white">{data.organizer}</p>
				<div className="mb-4 mt-4 w-4/6 mx-auto">
					<img
						src={data.image}
						alt={data.title}
						className="w-full h-auto rounded-lg"
					/>
				</div>
				<div>
					<Link href={`/event/${data.slug}/map`}>
						<button className="hover:text-yellow-500 text-white bg-yellow-600 hover:bg-gray-800 px-4 py-2 rounded-md mr-4 items-center">
							Show event map
						</button>
					</Link>
					<Link href={`/event/${data.slug}/buy`}>
						<button className="hover:text-yellow-500 text-white bg-yellow-600 hover:bg-gray-800 px-4 py-2 rounded-md items-center">
							Buy event ticket
						</button>
					</Link>
				</div>
			</main>
		</>
	);
}
