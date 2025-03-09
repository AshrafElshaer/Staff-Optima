"use client";
import { cn } from "@optima/ui/lib/utils";
import { motion, stagger, useAnimate } from "motion/react";
import { useEffect } from "react";

export const TextGenerateEffect = ({
	words,
	className,
}: {
	words: string;
	className?: string;
}) => {
	const [scope, animate] = useAnimate();
	const wordsArray = words.split(" ");

	useEffect(() => {
		animate(
			"span",
			{
				opacity: 1,
			},
			{
				duration: 2,
				delay: stagger(0.2),
			},
		);
	}, [animate]);

	const renderWords = () => {
		return (
			<motion.div ref={scope}>
				{wordsArray.map((word, idx) => {
					return (
						<motion.span
							key={word + idx.toString()}
							style={{
								opacity: 0,
								color: "currentColor",
							}}
							custom={{ className: "text-foreground opacity-0" }}
						>
							{word}{" "}
						</motion.span>
					);
				})}
			</motion.div>
		);
	};

	return (
		<div className={cn("font-bold", className)}>
			<div className="mt-4">
				<div className=" dark:text-white text-black text-2xl leading-snug tracking-wide">
					{renderWords()}
				</div>
			</div>
		</div>
	);
};
