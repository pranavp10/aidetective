import { Label, Switch } from "@medusajs/ui";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

export const IsToolPublished = ({ hideContent }: { hideContent?: boolean }) => {
  const { control } = useFormContext();
  return (
    <Controller
      render={({ field: { value, onChange } }) =>
        !hideContent ? (
          <div className="flex items-center gap-x-2">
            <Switch checked={value} onClick={() => onChange(!value)} />
            <Label htmlFor="isPublished" className="text-ui-fg-subtle">
              Do you want to publish tool?
            </Label>
          </div>
        ) : (
          <></>
        )
      }
      name="isToolPublished"
      control={control}
      defaultValue={true}
    />
  );
};
