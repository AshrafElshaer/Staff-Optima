export function parseDateFromString(dateString: string) {
	// Handle formats like "July 2017" or "07/2017"
	const [month, year] = dateString.includes("/")
		? dateString.split("/")
		: [dateString.split(" ")[0], dateString.split(" ")[1]];

	// Convert month name to number if needed
	const monthNumber = Number.isNaN(Number(month))
		? new Date(Date.parse(`${month} 1, 2000`)).getMonth() + 1
		: Number(month);

	const date = new Date(Number(year), monthNumber - 1, 1);
	if (Number.isNaN(date.getTime())) return null;
	return date;
}
