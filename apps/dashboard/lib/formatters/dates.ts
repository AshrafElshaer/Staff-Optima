import moment from "moment";
export function getLocalTimeFromUtc(utcTime: string) {
	const localTime = moment.utc(utcTime, "HH:mm").local();
	return localTime.format("HH:mm");
}

export function getUtcTimeFromLocal(localTime: string) {
	return moment(localTime, "HH:mm").utc().format("HH:mm");
}
