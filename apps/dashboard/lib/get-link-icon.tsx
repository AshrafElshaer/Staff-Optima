import { LinkIcon, UserIcon } from "lucide-react";
import {
	FaFacebook,
	FaGithub,
	FaInstagram,
	FaLinkedinIn,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const linkOptions = [
	{ label: "GitHub", value: "github" },
	{ label: "Portfolio", value: "portfolio" },
	{ label: "X (Twitter)", value: "x (twitter)" },
	{ label: "Instagram", value: "instagram" },
	{ label: "Facebook", value: "facebook" },
	{ label: "Other", value: "other" },
];

type Platforms = (typeof linkOptions)[number]["value"];

export function getLinkIcon(platform: Platforms) {
	if (platform.includes("linkedin")) {
		return <FaLinkedinIn />;
	}
	if (platform.includes("github")) {
		return <FaGithub />;
	}
	if (platform.includes("twitter")) {
		return <FaXTwitter />;
	}
	if (platform.includes("instagram")) {
		return <FaInstagram />;
	}
	if (platform.includes("facebook")) {
		return <FaFacebook />;
	}
	if (platform.includes("portfolio")) {
		return <UserIcon />;
	}
	return <LinkIcon />;
}
