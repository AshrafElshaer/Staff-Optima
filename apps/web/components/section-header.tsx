export function SectionHeader({ children }: { children: React.ReactNode }) {
	return (
		<div className="border-b bg-[image:repeating-linear-gradient(315deg,_var(--color-accent)_0,_var(--color-accent)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed">
			<h2 className=" py-6 border-x max-w-5xl mx-auto text-4xl sm:text-5xl md:text-6xl  text-center font-bold">
				{children}
			</h2>
		</div>
	);
}
