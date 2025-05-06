import { Features } from "@/components/sections/features";

import { Pricing } from "@/components/sections/pricing";
import HeroSection from "@/components/sections/hero-section";
export default function Page() {
	return (
		<div className="flex-1 w-full flex flex-col">
			<HeroSection />

			<Features />
			{/* <Pricing /> */}
		</div>
	);
}
