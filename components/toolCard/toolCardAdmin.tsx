/* eslint-disable @next/next/no-img-element */
"use client";
import { Button, Heading, Text, useToast } from "@medusajs/ui";
import { ToolBookmark } from "./toolBookmark";
import { pricing } from "@/data/pricing";
import { useSession } from "next-auth/react";
import { CheckIcon } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import PaymentSuccessModal from "../modal/paymentSuccess";

export const ToolCardAdmin = ({ tool }: { tool: Tool }) => {
  const searchParams = useSearchParams();
  const success = Boolean(searchParams.get("success"));
  const paramsToolId = searchParams.get("toolId");

  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const pricingDetails = pricing.find((price) => price.value === tool.pricing);
  const { data } = useSession();
  const isToolOwner = data?.user.id === tool.userId;
  const isFeatured = tool.isFeatured;
  const isPublished = tool.isToolPublished;

  const featuredClass =
    "bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500";
  const ownedClass = "bg-green-500";
  const pending = "bg-red-500";

  const color = isPublished
    ? isToolOwner && isFeatured
      ? featuredClass
      : ownedClass
    : pending;

  return (
    <div className={`relative cursor-pointer rounded-2xl p-1 ${color}`}>
      {isPublished && (isToolOwner || isFeatured) && (
        <div
          className={`${color} text-xs px-2 py-0.5text-white rounded-full absolute top-0 right-2 z-10 -translate-y-1/3`}
        >
          {isFeatured && "Featured"} {isFeatured && isToolOwner && "/"}{" "}
          {isToolOwner && "Owner"} {!isPublished && "Review Pending"}
        </div>
      )}
      <div className="rounded-[13px] relative  bg-gray-100 px-3 py-2 group">
        <div className="gap-3 relative flex bg-gray-100 px-3 py-2 group">
          <img
            src={
              tool.imageURL !== "-"
                ? tool.imageURL
                    .replace(".jpg", ".webp")
                    .replace("http:", "https:")
                : "/noImg.png"
            }
            alt={`${tool.name} landing page`}
            className="rounded-lg h-40 w-30 object-cover"
          />
          <div>
            <div className="flex justify-between">
              <Heading className="line-clamp-1 font-semibold max-w-[192px] text-gray-900">
                {tool.name}
              </Heading>
              <ToolBookmark
                id={tool.toolId}
                size={23}
                className="group-hover:visible invisible"
              />
            </div>
            <Text
              size="small"
              className="line-clamp-2 text-gray-600 leading-4 font-medium"
            >
              {tool.description}
            </Text>
            <div className="flex mt-2 w-full justify-between items-center flex-wrap">
              <div className="flex items-center gap-2">
                {pricingDetails && (
                  <div
                    className={`text-[11px] ${pricingDetails.classNames} whitespace-nowrap px-2`}
                  >
                    {pricingDetails.label}
                  </div>
                )}
                {[...tool.tags].map((tag: Tag) => (
                  <div
                    key={tag.tagId}
                    className="flex w-full items-center rounded-full border border-ui-border-base hover:bg-ui-bg-base-hover gap-2 px-2 bg-white text-ui-fg-subtle"
                  >
                    <Text>{tag.emoji}</Text>
                    <Text className="text-gray-900 text-sm font-medium whitespace-nowrap">
                      {tag.name}
                    </Text>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {isPublished && !isFeatured && false && (
          <div className="mx-auto max-w-2xl rounded-3xl ring-1 ring-gray-200 mt-2 bg-white lg:mx-0 lg:flex lg:max-w-none">
            <div className="p-8 sm:p-10 lg:flex-auto">
              <h3 className="text-2xl font-bold tracking-tight text-gray-900">
                Feature {tool.name} monthly
              </h3>
              <p className="mt-6 text-base leading-7 text-gray-600">
                We will bee featuring your tool at the top so and on the landing
                page you will gain more attrition
              </p>
              <div className="mt-10 flex items-center gap-x-4">
                <h4 className="flex-none text-sm font-semibold leading-6 text-gray-600">
                  What’s included
                </h4>
                <div className="h-px flex-auto bg-gray-100" />
              </div>
              <ul
                role="list"
                className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6"
              >
                {includedFeatures.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <CheckIcon
                      className="h-6 w-5 flex-none text-gray-600"
                      aria-hidden="true"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
              <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
                <div className="mx-auto max-w-xs px-8">
                  <p className="text-base font-semibold text-gray-600">
                    Feature {tool.name} monthly
                  </p>
                  <p className="mt-6 flex items-baseline justify-center gap-x-2">
                    <span className="text-5xl font-bold tracking-tight text-gray-900">
                      $1
                    </span>
                    <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">
                      USD
                    </span>
                  </p>
                  <Button
                    isLoading={loading}
                    onClick={async () => {
                      setLoading(true);
                      try {
                        const { data } = await axios.post<{ redirect: string }>(
                          `/api/payment/checkout`,
                          {
                            toolId: tool.toolId,
                          }
                        );
                        window.location.replace(data.redirect);
                      } catch (e) {
                        toast({
                          title: "Something went wrong",
                          variant: "error",
                        });
                      } finally {
                        setLoading(false);
                      }
                    }}
                    className="mt-10 w-52"
                    size="large"
                  >
                    Get featured
                  </Button>
                  <p className="mt-6 text-xs leading-5 text-gray-600">
                    Invoices and receipts available for easy company
                    reimbursement
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {tool.toolId === paramsToolId && <PaymentSuccessModal tool={tool} />}
    </div>
  );
};

const includedFeatures = [
  "On home page for month",
  "Stay at the top of all",
  "Get detailed analytics",
  "Newsletter mention",
];
