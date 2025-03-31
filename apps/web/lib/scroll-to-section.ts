export async function scrollToSection(sectionId: string) {
	const section = document.getElementById(sectionId);
	if (section) {
		const navbarHeight = 48; // 12 * 4 = 48px (h-12 from navbar)
		const padding = 48; // Additional padding
		const offset = navbarHeight + padding;

		window.scrollTo({
			behavior: "smooth",
			top: section.offsetTop - offset,
		});
	}
}
