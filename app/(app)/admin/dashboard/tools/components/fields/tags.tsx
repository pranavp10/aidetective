import { Badge, Label, Text } from "@medusajs/ui";
import { Controller, useFormContext } from "react-hook-form";
import useSWR from "swr";
import { DropdownMenu } from "@medusajs/ui";
import { useState } from "react";

export const Tags = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const { data, error, isLoading } = useSWR<Tag[]>("/api/tags");
  const [open, setOpen] = useState(false);

  const closeDropDown = () => setOpen(false);

  return (
    <Controller
      render={({ field: { value, onChange } }) => (
        <div className="flex flex-col gap-y-2">
          <Label
            htmlFor="pricing"
            className="text-ui-fg-subtle block text-sm font-semibold leading-6 text-gray-900"
          >
            Tags
          </Label>
          <DropdownMenu open={open}>
            <DropdownMenu.Trigger asChild onClick={() => setOpen(true)}>
              <div className="flex flex-wrap gap-2 caret-ui-fg-base bg-white hover:bg-ui-bg-field-hover border-ui-border-base shadow-buttons-neutral placeholder-ui-fg-muted text-ui-fg-base transition-fg relative appearance-none outline-none focus:border-ui-border-interactive focus:shadow-borders-active disabled:text-ui-fg-disabled disabled:!bg-ui-bg-disabled disabled:!border-ui-border-base disabled:placeholder-ui-fg-disabled disabled:cursor-not-allowed disabled:!shadow-none aria-[invalid=true]:!border-ui-border-error aria-[invalid=true]:focus:!shadow-borders-error invalid:!border-ui-border-error invalid:focus:!shadow-borders-error txt-medium w-full rounded-md border px-3 py-[7px]">
                {value?.length ? (
                  data?.map((tag: Tag) => {
                    const isSelected = value?.includes(tag.tagId);
                    if (isSelected) {
                      return (
                        <Badge
                          className="cursor-pointer"
                          key={tag.tagId}
                          onClick={(e) => {
                            e.stopPropagation();

                            onChange(
                              value.filter((id: string) => id !== tag.tagId)
                            );
                          }}
                        >
                          {tag.name}
                        </Badge>
                      );
                    } else {
                      return null;
                    }
                  })
                ) : (
                  <Text>Select tags</Text>
                )}
              </div>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content
              className="max-h-64 overflow-y-auto"
              onEscapeKeyDown={closeDropDown}
              onPointerDownOutside={closeDropDown}
            >
              {!isLoading && data ? (
                data
                  ?.sort((a, b) => a.name.localeCompare(b.name))
                  .map((tag) => {
                    const isSelected = value?.includes(tag.tagId);
                    if (!isSelected) {
                      return (
                        <DropdownMenu.Item
                          key={tag.tagId}
                          onClick={() => {
                            onChange([...value, tag.tagId]);
                            setOpen(false);
                          }}
                        >
                          {tag.name}
                        </DropdownMenu.Item>
                      );
                    } else {
                      return null;
                    }
                  })
              ) : (
                <DropdownMenu.Label>Loading...</DropdownMenu.Label>
              )}
            </DropdownMenu.Content>
          </DropdownMenu>
          {errors?.tags?.message && (
            <Label className="text-ui-fg-error">
              {errors?.tags?.message as string}
            </Label>
          )}
        </div>
      )}
      name="tags"
      control={control}
      defaultValue={[]}
    />
  );
};
