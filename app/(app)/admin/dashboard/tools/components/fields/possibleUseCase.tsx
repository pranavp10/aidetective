import { Input, Kbd, Label, Text } from "@medusajs/ui";
import React, { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

export const PossibleUseCase = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const [input, setInput] = useState("");
  return (
    <Controller
      render={({ field: { value, onChange } }) => (
        <div className="flex flex-col gap-y-2">
          <Label htmlFor="possibleUseCase" className="text-ui-fg-subtle">
            Possible use case
          </Label>
          <div className="relative">
            <Input
              id="possibleUseCase"
              placeholder="It can be used for improving grammar"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              aria-invalid={!!errors?.possibleUseCase?.message}
            />
            <Kbd
              onClick={() => {
                if (input) {
                  onChange([...value, input]);
                  setInput("");
                }
              }}
              className="absolute right-4 top-0 translate-y-1/2 cursor-pointer"
            >
              Add Possible Use Case
            </Kbd>
          </div>
          {errors?.possibleUseCase?.message && (
            <Label className="text-ui-fg-error">
              {errors?.possibleUseCase?.message as string}
            </Label>
          )}
          {!!value?.length && (
            <div>
              {value.map((useCase: string, i: number) => (
                <div
                  key={`${useCase} ${i}`}
                  className="flex gap-2 text-ui-fg-subtle cursor-pointer"
                  onClick={() => {
                    const newList = [...value];
                    newList.splice(i, 1);
                    onChange(newList);
                  }}
                >
                  <Text>{i + 1}</Text>
                  <Text>{useCase}</Text>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      name="possibleUseCase"
      control={control}
      defaultValue={[]}
    />
  );
};
