import type { Organization } from "@optima/supabase/types";
import { create } from "zustand";

type OrganizationStore = {
	organization: Organization | null;
	setOrganization: (organization: Organization) => void;
};
export const useOrganizationStore = create<OrganizationStore>((set) => ({
	organization: null,
	setOrganization: (organization) => set({ organization }),
}));
