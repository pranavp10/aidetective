import { Label, Textarea } from "@medusajs/ui";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

export const Summary = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <Controller
      render={({ field: { value, onChange } }) => (
        <div className="flex flex-col gap-y-2">
          <Label htmlFor="summary" className="text-ui-fg-subtle">
            Summary
          </Label>
          <Textarea
            aria-invalid={!!errors?.summary?.message}
            id="summary"
            placeholder="Summary"
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
          {errors?.summary?.message && (
            <Label className="text-ui-fg-error">
              {errors?.name?.message as string}
            </Label>
          )}
        </div>
      )}
      name="summary"
      control={control}
      defaultValue=""
    />
  );
};
