import React from "react";
import type { SVGProps } from "react";

export function Zoom(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={24}
			height={24}
			viewBox="0 0 24 24"
			{...props}
		>
			<title>Zoom</title>
			<path
				fill="none"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={1.5}
				d="M2 10V8c0-.943 0-1.414.293-1.707S3.057 6 4 6h3c3.771 0 5.657 0 6.828 1.172S15 10.229 15 14v2c0 .943 0 1.414-.293 1.707S13.943 18 13 18h-3c-3.771 0-5.657 0-6.828-1.172S2 13.771 2 10m15.9-.93l.7-.675c1.45-1.398 2.174-2.097 2.787-1.844S22 7.803 22 9.8v4.4c0 1.997 0 2.996-.613 3.249s-1.338-.446-2.787-1.844l-.7-.675c-.888-.856-.9-.885-.9-2.107v-1.646c0-1.222.012-1.25.9-2.107"
				color="hsla(var(--blue))"
			/>
		</svg>
	);
}
