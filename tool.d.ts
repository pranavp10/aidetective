type Tool = {
    name: string;
    summary: string;
    description: string;
    websiteURL: string;
    featuredAt: string;
    pricing: "free" | "free_trail" | "free_trail_no_card" | "paid";
    possibleUseCase: string[];
    imageURLs: string[];
    tags: string[];
    isToolPublished: boolean;
    appStoreURL?: string | undefined;
    playStoreURL?: string | undefined;

}
