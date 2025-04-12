export const Package = (props: React.SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={24}
		height={24}
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
		{...props}
	>
		<title>Package</title>
		<path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
		<path d="m3.3 7 8.7 5 8.7-5" />
		<path d="M12 22V12" />
	</svg>
);

export const PackageFill = (props: React.SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={24}
		height={24}
		viewBox="0 0 24 24"
		{...props}
	>
		<title>Package</title>
		<path
			fill="currentColor"
			d="m20.765 7.982l.022.19l.007.194v7.268a2.5 2.5 0 0 1-1.099 2.07l-.15.095l-6.295 3.634l-.124.067l-.126.06v-8.99z"
			opacity={1}
		/>
		<path
			fill="currentColor"
			d="m13.25 2.567l6.294 3.634q.076.044.148.092L12 10.838L4.308 6.293a3 3 0 0 1 .148-.092l6.294-3.634a2.5 2.5 0 0 1 2.5 0"
		/>
		<path
			fill="currentColor"
			d="M3.235 7.982L11 12.571v8.988a2 2 0 0 1-.25-.126l-6.294-3.634a2.5 2.5 0 0 1-1.25-2.165V8.366q0-.195.03-.384z"
			opacity={1}
		/>
	</svg>
);
