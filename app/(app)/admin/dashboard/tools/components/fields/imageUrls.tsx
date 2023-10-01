/* eslint-disable @next/next/no-img-element */
import { Input, Kbd, Label } from "@medusajs/ui";
import React, { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

export const ImageURL = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const [input, setInput] = useState("");
  return (
    <Controller
      render={({ field: { value, onChange } }) => (
        <div className="flex flex-col gap-y-2">
          <Label htmlFor="ImageURL" className="text-ui-fg-subtle">
            Image URL
          </Label>
          <div className="relative">
            <Input
              id="ImageURL"
              placeholder="image url"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              aria-invalid={!!errors?.imageURLs?.message}
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
              Add Image URL
            </Kbd>
          </div>
          {errors?.imageURLs?.message && (
            <Label className="text-ui-fg-error">
              {errors?.imageURLs?.message as string}
            </Label>
          )}
          {!!value?.length && (
            <div className="flex flex-wrap gap-4">
              {value.map((src: string) => (
                <img
                  src={src}
                  key={src}
                  alt="image"
                  width={135}
                  height={85}
                  className="w-[135px] h-[85px] rounded-xl"
                />
              ))}
            </div>
          )}
        </div>
      )}
      name="imageURLs"
      control={control}
      defaultValue={[]}
    />
  );
};
