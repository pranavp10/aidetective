type Tool = {
    toolId: string
    createdAt: Date
    updatedAt: Date
    name: string;
    summary: string;
    description: string;
    websiteURL: string;
    featuredAt?: Date | null;
    pricing: "free" | "free_trail" | "free_trail_no_card" | "paid";
    possibleUseCase: string;
    imageURL: string;
    isToolPublished: boolean;
    appStoreURL?: string | null;
    slug: string
    playStoreURL?: string | null;
    tags: Tags[]
}


