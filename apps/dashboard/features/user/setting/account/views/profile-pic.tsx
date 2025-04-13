"use client";

import { DropZone } from "@/components/drop-zone";
import { updateUserAction } from "@/features/user/user.actions";
import { useSupabase } from "@/hooks/use-supabase";
import { queryClient } from "@/lib/react-query";
import { uploadUserAvatar } from "@/lib/supabase/storage";
import type { User } from "@optima/supabase/types";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@optima/ui/components/avatar";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@optima/ui/components/card";
import { Separator } from "@optima/ui/components/separator";
import { Skeleton } from "@optima/ui/components/skeleton";
import { Plus } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function ProfilePic({ user }: { user: User }) {
	const supabase = useSupabase();
	const router = useRouter();
	const { executeAsync: updateUser } = useAction(updateUserAction, {
		onSuccess: () => {
			router.refresh();
			queryClient.invalidateQueries({
				queryKey: ["current-user"],
			});
		},
	});

	return (
		<Card>
			<CardHeader>
				<CardTitle className="font-semibold ">Profile Picture</CardTitle>
			</CardHeader>
			<Separator />
			<CardContent className="flex items-center justify-between gap-4">
				<p className="text-sm text-muted-foreground">
					Accepts : PNG, JPG, or SVG. <br />
					Max size : 1MB <br />
					Recommended dimensions: <br />
					200x200 pixels.
				</p>
				<DropZone
					options={{
						accept: {
							"image/png": [".png"],
							"image/jpeg": [".jpg", ".jpeg"],
							"image/svg+xml": [".svg"],
							"image/webp": [".webp"],
							"image/x-icon": [".ico"],
						},
						maxSize: 1000000,
						maxFiles: 1,
						multiple: false,
						onDrop: async (acceptedFiles) => {
							const file = acceptedFiles[0];
							if (file) {
								toast.promise(
									async () => {
										const url = await uploadUserAvatar({
											supabase,
											userId: user.id,
											file,
										});
										const result = await updateUser({
											id: user.id,
											image: url,
										});
										if (result?.serverError)
											throw new Error(result.serverError);
									},
									{
										loading: "Uploading profile picture...",
										success: "Profile picture uploaded successfully",
										error: (error) => error.message,
									},
								);
							}
						},
						onDropRejected: (rejectedFiles) => {
							for (const file of rejectedFiles) {
								toast.error(file.errors[0]?.message);
							}
						},
					}}
				>
					<Avatar className="size-20 rounded-sm">
						<AvatarImage
							src={user?.image ?? undefined}
							className="rounded-sm"
						/>
						<AvatarFallback className="border-0">
							{user?.first_name[0]}
							{user?.last_name[0]}
						</AvatarFallback>
					</Avatar>
					<div className="absolute inset-0 bg-background/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 grid place-items-center">
						<Plus className="size-10 text-secondary-foreground" />
					</div>
				</DropZone>
			</CardContent>
			<Separator />
			<CardFooter>
				<CardDescription>
					This is your avatar. Click on the avatar to upload a custom one from
					your files.
				</CardDescription>
			</CardFooter>
		</Card>
	);
}

export function ProfilePicLoading() {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="font-semibold ">Profile Picture</CardTitle>
			</CardHeader>
			<Separator />
			<CardContent className="flex items-center justify-between gap-4">
				<p className="text-sm text-muted-foreground">
					Accepts : PNG, JPG, or SVG. <br />
					Max size : 1MB <br />
					Recommended dimensions: <br />
					200x200 pixels.
				</p>
				<Skeleton className="size-20 rounded-sm" />
			</CardContent>
			<Separator />
			<CardFooter>
				<CardDescription>
					This is your avatar. Click on the avatar to upload a custom one from
					your files.
				</CardDescription>
			</CardFooter>
		</Card>
	);
}
