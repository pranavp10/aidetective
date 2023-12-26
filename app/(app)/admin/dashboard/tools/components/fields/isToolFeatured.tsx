import { Label, Switch } from "@medusajs/ui";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

export const IsToolFeatured = ({ hideContent }: { hideContent?: boolean }) => {
  const { control } = useFormContext();
  return (
    <Controller
      render={({ field: { value, onChange } }) =>
        !hideContent ? (
          <div className="flex flex-col gap-x-2 bg-red-500 text-white py-2 px-3 rounded-xl">
            <Label htmlFor="isFeatured" className="text-white mb-3">
              Do you want to feature this tool at the top without Payment?
            </Label>
            <Switch checked={value} onClick={() => onChange(!value)} />
          </div>
        ) : (
          <></>
        )
      }
      name="isFeatured"
      control={control}
      defaultValue={true}
    />
  );
};
