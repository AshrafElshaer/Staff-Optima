import {
	OpenPanelComponent,
	type PostEventPayload,
	useOpenPanel,
} from "@openpanel/nextjs";
import { logger } from "@optima/logger";
import * as React from "react";

const isProd = process.env.NODE_ENV === "production";

const Provider = () => (
	<OpenPanelComponent
		clientId={process.env.NEXT_PUBLIC_OPENPANEL_CLIENT_ID as string}
		trackAttributes={true}
		trackScreenViews={isProd}
		trackOutgoingLinks={isProd}
	/>
);

const track = (options: { event: string } & PostEventPayload["properties"]) => {
	const { track: openTrack } = useOpenPanel();

	if (!isProd) {
		logger.info("Track", options);

		return;
	}

	const { event, ...rest } = options;

	openTrack(event, rest);
};

export { Provider, track };
