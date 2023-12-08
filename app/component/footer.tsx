"use client";
import { SubscribeSchema, subscribeSchema } from "@/schema/subscribe.schema.";
import { zodResolver } from "@hookform/resolvers/zod";
import { Linkedin, Twitter } from "@medusajs/icons";
import { Button, Input, Label, Text } from "@medusajs/ui";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";

const navigation = {
  legal: [
    { name: "Privacy", href: "/privacy" },
    { name: "Terms", href: "/terms" },
  ],
  social: [
    {
      name: "Twitter",
      href: "https://twitter.com/AiDetective_xyz",
      icon: () => <Twitter />,
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/company/aidetective/",
      icon: () => <Linkedin />,
    },
  ],
};

export function Footer() {
  const [loading, setLoading] = useState(false);
  const [isEmailSubmitted, setEmailSubmitter] = useState(false);
  const form = useForm<SubscribeSchema>({
    resolver: zodResolver(subscribeSchema),
  });
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = form;

  const saveEmail = async (value: SubscribeSchema) => {
    try {
      setLoading(true);
      await axios.post("/api/subscribe/", {
        email: value.email,
      });
      reset({ email: "" });
      setLoading(false);
      setEmailSubmitter(true);
    } catch (e: any) {
      setEmailSubmitter(true);
      setLoading(false);
    }
  };

  return (
    <div className="pointer-events-none sticky inset-x-0 bottom-0 pt-10 sm:pb-5">
      <div className="pointer-events-auto flex items-center justify-between gap-x-6 bg-white  sm:rounded-xl py-3 pl-4 pr-3.5 sm:border border-ui-tag-neutral-border sm:flex-row flex-col">
        <div>
          <Text className="leading-5 text-sm text-gray-800 hover:text-gray-900">
            Feature/Edits -{" "}
            <span className="font-medium">hello@AiDetective.xyz</span>
          </Text>
        </div>
        {!isEmailSubmitted && (
          <FormProvider {...form}>
            <form onSubmit={handleSubmit(saveEmail)}>
              <div className="flex items-center gap-4 sm:flex-row flex-col">
                <Text className="font-medium">Get new tools at your Inbox</Text>
                <Controller
                  render={({ field: { value, onChange } }) => (
                    <div className="flex flex-col gap-y-2">
                      <Input
                        id="email"
                        placeholder="Type your email..."
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        aria-invalid={!!errors?.email?.message}
                      />
                      {errors?.email?.message && (
                        <Label className="text-ui-fg-error">
                          {errors?.email?.message as string}
                        </Label>
                      )}
                    </div>
                  )}
                  name="email"
                  control={control}
                  defaultValue=""
                />

                <Button
                  isLoading={loading}
                  type="submit"
                  className="rounded-full"
                >
                  Subscribe
                </Button>
              </div>
            </form>
          </FormProvider>
        )}
        <div className="flex space-x-6 md:order-2 items-center">
          {navigation.legal.map((item) => (
            <Link key={item.name} href={item.href}>
              <Text className="text-xs text-gray-700 hover:text-gray-800">
                {item.name}
              </Text>
            </Link>
          ))}
          {navigation.social.map((item) => (
            <Link key={item.name} href={item.href}>
              <span className="sr-only">{item.name}</span>
              <item.icon aria-hidden="true" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
