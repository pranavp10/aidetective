import { DatePicker, Label } from "@medusajs/ui";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

export const FeatureAt = () => {
  const { control } = useFormContext();
  return (
    <Controller
      render={({ field: { value, onChange } }) => (
        <div className="flex flex-col gap-y-2">
          <Label htmlFor="featuredAt" className="text-ui-fg-subtle">
            Featured At
          </Label>
          <DatePicker
            id="featuredAt"
            value={new Date(value)}
            onChange={(date) => onChange(date?.toString())}
            showTimePicker
          />
        </div>
      )}
      name="featuredAt"
      control={control}
      defaultValue={new Date().toString()}
    />
  );
};
