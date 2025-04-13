import type { Permission } from "@optima/constants";

export function hasPermission(
	permissions: string[],
	requiredPermission: Permission | Permission[],
) {
	if (Array.isArray(requiredPermission)) {
		return requiredPermission.some((permission) =>
			permissions.includes(permission),
		);
	}
	return permissions.includes(requiredPermission);
}
