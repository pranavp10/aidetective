import { Input, Label } from "@medusajs/ui";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

export const WebsiteURl = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <Controller
      render={({ field: { value, onChange } }) => (
        <div className="flex flex-col gap-y-2">
          <Label
            htmlFor="websiteURL"
            className="text-ui-fg-subtle block text-sm font-semibold leading-6 text-gray-900"
          >
            Website URL
          </Label>
          <Input
            aria-invalid={!!errors?.websiteURL?.message}
            id="websiteURL"
            placeholder="https://aidetective.xyz"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="bg-white"
          />
          {errors?.websiteURL?.message && (
            <Label className="text-ui-fg-error">
              {errors?.websiteURL?.message as string}
            </Label>
          )}
        </div>
      )}
      name="websiteURL"
      control={control}
      defaultValue=""
    />
  );
};
