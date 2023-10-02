type ImageURL = {
    imageURL: string
    imageURLId: string
    toolId: string
}

type PossibleUseCase = {
    possibleUseCaseId: string;
    description: string;
    toolId: string;
}
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
    possibleUseCase: PossibleUseCase[];
    imageURLs: ImageURL[];
    isToolPublished: boolean;
    appStoreURL?: string | null;
    playStoreURL?: string | null;
    tags: Tags[]
}


