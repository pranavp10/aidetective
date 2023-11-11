import { Label, Select } from "@medusajs/ui";
import { Pricing as PricingEnum } from "@prisma/client";
import { Controller, useFormContext } from "react-hook-form";

export const Pricing = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      render={({ field: { value, onChange } }) => (
        <div className="flex flex-col gap-y-2">
          <Label htmlFor="pricing" className="text-ui-fg-subtle">
            Pricing
          </Label>
          <Select value={value} onValueChange={(value) => onChange(value)}>
            <Select.Trigger>
              <Select.Value placeholder="Select Pricing" />
            </Select.Trigger>
            <Select.Content>
              {pricing.map((item) => (
                <Select.Item key={item.value} value={item.value}>
                  {item.label}
                </Select.Item>
              ))}
            </Select.Content>
          </Select>
          {errors?.pricing?.message && (
            <Label className="text-ui-fg-error">
              {errors?.pricing?.message as string}
            </Label>
          )}
        </div>
      )}
      name="pricing"
      control={control}
      defaultValue={PricingEnum.free_trail_no_card}
    />
  );
};

const pricing = [
  {
    label: "Free",
    value: PricingEnum.free,
  },
  {
    label: "Free Trial",
    value: PricingEnum.free_trail,
  },
  {
    label: "Free Trial No Credit Card",
    value: PricingEnum.free_trail_no_card,
  },
  {
    label: "Monthly Subscription",
    value: PricingEnum.paid,
  },
  {
    label: "Yearly Subscription",
    value: PricingEnum.yearly_subscription,
  },
  {
    label: "One Time Payment",
    value: PricingEnum.one_time_payment,
  },
  {
    label: "Waitlist",
    value: PricingEnum.waitlist,
  },
  {
    label: "Request Demo",
    value: PricingEnum.request_demo,
  },
];
