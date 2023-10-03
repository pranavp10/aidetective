/* eslint-disable @next/next/no-img-element */
import React, { useCallback } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { Text } from "@medusajs/ui";
import { XCircleSolid } from "@medusajs/icons";

export const ImageURL = () => {
  const { control, setValue, watch } = useFormContext();
  const url = watch("imageURL");

  const onChange = (data: File[]) => {
    setValue("imageURL", data[0]);
  };
  const onDrop = useCallback(onChange, []);
  const { getInputProps, open } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/webp": [],
    },
  });

  return (
    <Controller
      render={({ field: { value, onChange } }) => {
        const imageURL = getImageUrl(url);
        return (
          <div className="relative rounded-xl border-2  border-ui-border-base border-dashed">
            {!url ? (
              <>
                <div className="flex items-center justify-center h-40">
                  <Text className="text-ui-fg-muted">Select image</Text>
                </div>
                <input
                  onClick={open}
                  {...getInputProps}
                  type="file"
                  className="absolute inset-0 h-full w-full cursor-pointer rounded-md border-gray-300 opacity-0"
                  id="brand-photo"
                  name="brand-photo"
                />
              </>
            ) : (
              <>
                <img
                  src={imageURL}
                  className="w-full object-cover"
                  alt="preview image"
                />
                <div
                  className="absolute -top-2 -right-2 cursor-pointer"
                  onClick={() => onChange(undefined)}
                >
                  <XCircleSolid />
                </div>
              </>
            )}
          </div>
        );
      }}
      name="imageURL"
      control={control}
      defaultValue=""
    />
  );
};

const getImageUrl = (value: string | File) => {
  if (!value || value === "-") return undefined;
  if (typeof value === "string" && value.includes("superflex/tools")) {
    return value;
  }
  return URL.createObjectURL(value as File);
};
