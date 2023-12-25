type Tool = {
    toolId: string
    createdAt: Date
    updatedAt: Date
    name: string;
    summary: string;
    description: string;
    websiteURL: string;
    featuredAt?: Date | null;
    pricing: "free" | "free_trail" | "free_trail_no_card" | "paid" | 'freemium' | 'waitlist' | 'request_demo' | 'yearly_subscription' | 'one_time_payment';
    possibleUseCase: string;
    imageURL: string;
    isToolPublished: boolean;
    appStoreURL?: string | null;
    slug: string
    playStoreURL?: string | null;
    tags: Tags[]
    userId: string
    isFeatured: boolean
}
