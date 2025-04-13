import { Img } from "@react-email/components";
import React from "react";

const baseUrl = "https://app.staffoptima.co";

export default function Logo() {
	return (
		<>
			<Img
				src={`${baseUrl}/logo-light.png`}
				alt="Staff Optima"
				className="dark:hidden mx-auto h-14 w-14 mb-8"
			/>
			<Img
				src={`${baseUrl}/logo-dark.png`}
				alt="Staff Optima"
				className="hidden dark:block mx-auto h-14 w-14 mb-8"
			/>
		</>
	);
}
