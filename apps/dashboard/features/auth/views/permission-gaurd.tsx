"use client";
import { useUserRole } from "@/hooks/use-user-role";
import { hasPermission } from "@/lib/auth/has-permission";
import type { Permission } from "@optima/constants";

type Props = {
	children: React.ReactNode;
	requiredPermissions: Permission[];
};
export function PermissionGuard({ children, requiredPermissions }: Props) {
	const { data: userRole } = useUserRole();
	if (!userRole) return null;
	const canAccess = hasPermission(userRole?.permissions, requiredPermissions);

	if (!canAccess) return null;
	return <>{children}</>;
}
