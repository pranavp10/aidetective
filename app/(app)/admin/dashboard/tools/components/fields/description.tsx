import { Label, Textarea } from "@medusajs/ui";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

export const Description = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <Controller
      render={({ field: { value, onChange } }) => (
        <div className="flex flex-col gap-y-2">
          <Label
            htmlFor="description"
            className="text-ui-fg-subtle block text-sm font-semibold leading-6 text-gray-900"
          >
            Description
          </Label>
          <Textarea
            id="description"
            placeholder="Description"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            aria-invalid={!!errors?.description?.message}
            className="bg-white"
          />
          {errors?.description?.message && (
            <Label className="text-ui-fg-error">
              {errors?.description?.message as string}
            </Label>
          )}
        </div>
      )}
      name="description"
      control={control}
      defaultValue=""
    />
  );
};
