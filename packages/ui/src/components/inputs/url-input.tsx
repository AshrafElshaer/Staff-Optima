import { Input, type InputProps } from "./input";

export const UrlInput = ({ ...props }: InputProps) => {
	return (
		<div className="relative">
			<Input {...props} className="!pl-16" type="text" isUrl inputMode="url" />
			<span className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center pl-3 text-sm text-muted-foreground peer-disabled:opacity-50">
				https://
			</span>
		</div>
	);
};
