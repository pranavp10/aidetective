import { Input, Label } from "@medusajs/ui";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

export const AppStoreURL = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <Controller
      name="appStoreURL"
      control={control}
      render={({ field: { value, onChange, ref, onBlur, disabled, name } }) => (
        <div className="flex flex-col gap-y-2">
          <Label htmlFor="appStoreURL" className="text-ui-fg-subtle">
            App Store URL
          </Label>
          <Input
            id="appStoreURL"
            ref={ref}
            disabled={disabled}
            name={name}
            onBlur={onBlur}
            placeholder="https://apps.apple.com/"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            aria-invalid={!!errors?.appStoreURL?.message}
          />
          {errors?.appStoreURL?.message && (
            <Label className="text-ui-fg-error">
              {errors?.appStoreURL?.message as string}
            </Label>
          )}
        </div>
      )}
      defaultValue=""
    />
  );
};
