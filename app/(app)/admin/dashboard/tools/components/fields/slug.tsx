"use client";

import { Input, Label } from "@medusajs/ui";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

export const Slug = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <Controller
      render={({ field: { value, onChange } }) => (
        <div className="flex flex-col gap-y-2">
          <Label htmlFor="slug" className="text-ui-fg-subtle">
            Slug
          </Label>
          <Input
            id="slug"
            placeholder="slug-of-the-tool"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            aria-invalid={!!errors?.slug?.message}
          />
          {errors?.slug?.message && (
            <Label className="text-ui-fg-error">
              {errors?.slug?.message as string}
            </Label>
          )}
        </div>
      )}
      name="slug"
      control={control}
      defaultValue=""
    />
  );
};
