import { InformationCircleSolid } from "@medusajs/icons";
import { Label, Textarea, Tooltip } from "@medusajs/ui";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

export const PossibleUseCase = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <Controller
      render={({ field: { value, onChange } }) => (
        <div className="flex flex-col gap-y-2">
          <Label
            htmlFor="possibleUseCase"
            className="text-ui-fg-subtle flex items-center gap-2 text-sm font-semibold leading-6 text-gray-900"
          >
            Possible use case{" "}
            <Tooltip content="Add the Possible use cases separated by `;` eg: Possible use case 1;possible use case 2;possible use case 3 ">
              <InformationCircleSolid />
            </Tooltip>
          </Label>
          <div className="relative">
            <Textarea
              id="possibleUseCase"
              placeholder="Possible use case 1;possible use case 2;possible use case 3"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              aria-invalid={!!errors?.possibleUseCase?.message}
              className="bg-white"
            />
          </div>
          {errors?.possibleUseCase?.message && (
            <Label className="text-ui-fg-error">
              {errors?.possibleUseCase?.message as string}
            </Label>
          )}
        </div>
      )}
      name="possibleUseCase"
      control={control}
      defaultValue={[]}
    />
  );
};
