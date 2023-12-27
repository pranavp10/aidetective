import { pricing } from "@/data/pricing";
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
          <Label
            htmlFor="pricing"
            className="text-ui-fg-subtle block text-sm font-semibold leading-6 text-gray-900"
          >
            Pricing
          </Label>
          <Select value={value} onValueChange={(value) => onChange(value)}>
            <Select.Trigger className="bg-white">
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
