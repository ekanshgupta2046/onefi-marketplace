import { EmiPlan } from "@/lib/mockData";

type EmiPlanOptionProps = {
  plan: EmiPlan;
  selected: boolean;
  onSelect: (planId: string) => void;
};

export default function EmiPlanOption({
  plan,
  selected,
  onSelect,
}: EmiPlanOptionProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(plan.id)}
      aria-pressed={selected}
      className={`w-full flex items-center justify-between rounded-xl border p-3 text-left transition-colors ${
        selected
          ? "border-brand-primary bg-brand-primary-light"
          : "border-brand-border bg-white"
      }`}
    >
      <div>
        <p className="text-sm font-semibold">
          ₹{plan.monthlyAmount.toLocaleString("en-IN")} x {plan.tenureMonths}{" "}
          months
        </p>
        {plan.cashbackAmount ? (
          <p className="text-xs text-brand-success mt-0.5">
            Additional cashback of ₹{plan.cashbackAmount.toLocaleString("en-IN")}
          </p>
        ) : null}
      </div>
      <p className="text-xs text-gray-500 whitespace-nowrap ml-2">
        {plan.interestRate === 0 ? "0% interest" : `${plan.interestRate}% interest`}
      </p>
    </button>
  );
}
