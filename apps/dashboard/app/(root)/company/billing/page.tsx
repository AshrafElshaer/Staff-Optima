"use client";

import { PaymentInUse } from "@/features/company/billing/payment-in-use";
import { PlanCard } from "@/features/company/billing/plan-card";
import { BillingTable } from "@/features/company/billing/table";
import { columns } from "@/features/company/billing/table/columns";
import { Button } from "@optima/ui/components/button";
import { DatePickerWithRange } from "@optima/ui/components/date-picker-range";
import { Calendar01Icon } from "hugeicons-react";
// import type { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "Billing",
//   description: "Manage your organization's billing and usage details.",
// };

const invoices = [
	{
		id: 1,
		date: new Date(),
		amount: 100,
		status: "paid",
	},
	{
		id: 2,
		date: new Date(),
		amount: 100,
		status: "pending",
	},
	{
		id: 3,
		date: new Date(),
		amount: 100,
		status: "failed",
	},
	{
		id: 4,
		date: new Date(2024, 0, 15),
		amount: 299.99,
		status: "paid",
	},
	{
		id: 5,
		date: new Date(2024, 0, 10),
		amount: 149.5,
		status: "pending",
	},
	{
		id: 6,
		date: new Date(2024, 0, 5),
		amount: 499.99,
		status: "failed",
	},
	{
		id: 7,
		date: new Date(2023, 11, 28),
		amount: 75.25,
		status: "paid",
	},
	{
		id: 8,
		date: new Date(2023, 11, 20),
		amount: 199.99,
		status: "pending",
	},
];

export default function OrganizationBillingPage() {
	return (
		<div className="flex flex-col gap-6 flex-1 ">
			<section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
				<PlanCard />
				<PaymentInUse />
			</section>

			<section className="space-y-4">
				<div className="flex items-center justify-between">
					<h4 className="font-bold text-lg">Invoices</h4>
					{/* <Button variant="secondary">
            <Calendar01Icon strokeWidth={2} size={16} />
            12/23/2024 - 01/01/2025
          </Button> */}
					<DatePickerWithRange
						className="w-fit"
						date={undefined}
						setDate={() => {}}
					/>
				</div>
			</section>
			<BillingTable data={invoices} columns={columns} />
		</div>
	);
}
