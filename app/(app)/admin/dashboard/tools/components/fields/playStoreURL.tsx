import { Input, Label } from "@medusajs/ui";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

export const PlayStoreURL = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <Controller
      render={({ field: { value, onChange } }) => (
        <div className="flex flex-col gap-y-2">
          <Label htmlFor="playStore" className="text-ui-fg-subtle">
            Play store URL
          </Label>
          <Input
            id="playStore"
            placeholder="https://play.google.com/"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            aria-invalid={!!errors?.playStoreURL?.message}
          />
          {errors?.playStoreURL?.message && (
            <Label className="text-ui-fg-error">
              {errors?.name?.message as string}
            </Label>
          )}
        </div>
      )}
      name="playStoreURL"
      control={control}
      defaultValue=""
    />
  );
};
