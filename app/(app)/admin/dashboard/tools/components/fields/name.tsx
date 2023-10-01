"use client";

import { Input, Label } from "@medusajs/ui";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

export const Name = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <Controller
      render={({ field: { value, onChange } }) => (
        <div className="flex flex-col gap-y-2">
          <Label htmlFor="name" className="text-ui-fg-subtle">
            Name
          </Label>
          <Input
            id="name"
            placeholder="Name"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            aria-invalid={!!errors?.name?.message}
          />
          {errors?.name?.message && (
            <Label className="text-ui-fg-error">
              {errors?.name?.message as string}
            </Label>
          )}
        </div>
      )}
      name="name"
      control={control}
      defaultValue=""
    />
  );
};
