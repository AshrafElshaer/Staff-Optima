import type * as React from "react";

interface MailIconProps extends React.ComponentProps<"svg"> {}

export function Mail({ ...props }: MailIconProps) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={24}
			height={24}
			viewBox="0 0 24 24"
			{...props}
		>
			<title>Mail</title>

			<g
				fill="none"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={2}
			>
				<path d="m7 8.5l2.942 1.74c1.715 1.014 2.4 1.014 4.116 0L17 8.5" />
				<path d="M2.016 13.476c.065 3.065.098 4.598 1.229 5.733c1.131 1.136 2.705 1.175 5.854 1.254c1.94.05 3.862.05 5.802 0c3.149-.079 4.723-.118 5.854-1.254c1.131-1.135 1.164-2.668 1.23-5.733c.02-.986.02-1.966 0-2.952c-.066-3.065-.099-4.598-1.23-5.733c-1.131-1.136-2.705-1.175-5.854-1.254a115 115 0 0 0-5.802 0c-3.149.079-4.723.118-5.854 1.254c-1.131 1.135-1.164 2.668-1.23 5.733a69 69 0 0 0 0 2.952" />
			</g>
		</svg>
	);
}

export const MailFill = (props: React.SVGProps<SVGSVGElement>) => (
	<svg
		width={24}
		height={24}
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<title>Mail</title>
		<path
			fill-rule="evenodd"
			clip-rule="evenodd"
			d="M14.92 2.78677C12.967 2.7377 11.033 2.7377 9.07999 2.78677L9.02182 2.78823C7.497 2.82651 6.27002 2.85732 5.2867 3.02857C4.2572 3.20786 3.42048 3.55174 2.71362 4.26129C2.00971 4.96787 1.66764 5.79256 1.49176 6.80537C1.32429 7.76974 1.29878 8.96677 1.26719 10.4496L1.26593 10.5084C1.24469 11.5047 1.24469 12.4952 1.26594 13.4916L1.26719 13.5503C1.29879 15.0332 1.32429 16.2302 1.49176 17.1946C1.66764 18.2074 2.00972 19.0321 2.71362 19.7386C3.42048 20.4482 4.2572 20.7921 5.2867 20.9714C6.27001 21.1426 7.49697 21.1734 9.02177 21.2117L9.07999 21.2132C11.033 21.2622 12.967 21.2622 14.92 21.2132L14.9782 21.2117C16.503 21.1734 17.73 21.1426 18.7133 20.9714C19.7428 20.7921 20.5795 20.4482 21.2864 19.7386C21.9903 19.0321 22.3324 18.2074 22.5082 17.1946C22.6757 16.2302 22.7012 15.0332 22.7328 13.5503L22.7341 13.4916C22.7553 12.4952 22.7553 11.5047 22.7341 10.5084L22.7328 10.4496C22.7012 8.96679 22.6757 7.76976 22.5082 6.80539C22.3324 5.79258 21.9903 4.96789 21.2864 4.26131C20.5795 3.55176 19.7428 3.20788 18.7133 3.02859C17.73 2.85733 16.503 2.82652 14.9782 2.78824L14.92 2.78677ZM7.38182 7.85449C7.02527 7.64368 6.56533 7.76183 6.35452 8.11838C6.14371 8.47494 6.26186 8.93488 6.61841 9.14569L9.56043 10.8851C10.4313 11.4 11.1827 11.7501 12.0001 11.7501C12.8175 11.7501 13.569 11.4 14.4398 10.8851L17.3818 9.14569C17.7384 8.93488 17.8565 8.47494 17.6457 8.11838C17.4349 7.76183 16.975 7.64368 16.6184 7.85449L13.6764 9.59392C12.832 10.0931 12.3831 10.2501 12.0001 10.2501C11.6171 10.2501 11.1682 10.0931 10.3238 9.59392L7.38182 7.85449Z"
			fill="currentColor"
		/>
	</svg>
);
