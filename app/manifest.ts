import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "AI Detective: Uncover Tomorrow's Solutions Today with our AI Tool Aggregator",
        short_name: "AI Detective",
        description: "Unleash the potential of AI tools with AI Detective – your ultimate destination for cutting-edge artificial intelligence solutions. Navigate a world of innovation effortlessly using our AI-powered search. Explore, discover, and find the perfect AI tools tailored to your needs. Dive into the future of technology with AI Detective – where intelligent search meets a spectrum of possibilities in artificial intelligence.",
        theme_color: "#ffffff",
        start_url: "/",
        background_color: "#ffffff",
        display: "standalone",
        icons: [
            {
                src: "/android-chrome-192x192.png",
                sizes: "192x192",
                type: "image/png",
            },
            {
                src: "/android-chrome-512x512.png",
                sizes: "512x512",
                type: "image/png",
            },
        ],
    };
}
