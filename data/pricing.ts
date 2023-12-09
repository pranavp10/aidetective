import { Pricing as PricingEnum } from "@prisma/client";

export const pricing = [
    {
        label: "Free",
        value: PricingEnum.free,
        classNames:
            "border border-ui-tag-green-border text-ui-tag-green-text bg-ui-tag-green-bg rounded-full",
    },
    {
        label: "Free Trial",
        value: PricingEnum.free_trail,
        classNames:
            "border border-ui-tag-blue-border text-ui-tag-blue-text bg-ui-tag-blue-bg rounded-full",
    },
    {
        label: "Free Trial No Credit Card",
        value: PricingEnum.free_trail_no_card,
        classNames:
            "border border-ui-tag-blue-border text-ui-tag-blue-text bg-ui-tag-blue-bg rounded-full",
    },
    {
        label: "Monthly Subscription",
        value: PricingEnum.paid,
        classNames:
            "border border-ui-tag-orange-border text-ui-tag-orange-text bg-ui-tag-orange-bg rounded-full",
    },
    {
        label: "Yearly Subscription",
        value: PricingEnum.yearly_subscription,
        classNames:
            "border border-ui-tag-orange-border text-ui-tag-orange-text bg-ui-tag-orange-bg rounded-full",
    },
    {
        label: "One Time Payment",
        value: PricingEnum.one_time_payment,
        classNames:
            "border border-ui-tag-green-border text-ui-tag-green-text bg-ui-tag-green-bg rounded-full",
    },
    {
        label: "Waitlist",
        value: PricingEnum.waitlist,
        classNames:
            "border border-ui-tag-purple-border text-ui-tag-purple-text bg-ui-tag-purple-bg rounded-full",
    },
    {
        label: "Request Demo",
        value: PricingEnum.request_demo,
        classNames:
            "border border-ui-tag-red-border text-ui-tag-red-text bg-ui-tag-red-bg rounded-full",
    },
];
