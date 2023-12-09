import { ImageResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");
  const name = searchParams.get("name");

  const { title, image } = {
    title: name,
    image: url,
  };

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          backgroundImage: `url(${
            image === "-"
              ? "https://www.aidetective.xyz/noImg.png"
              : image?.replace(".webp", ".png")
          })`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          fontWeight: 600,
          color: "white",
        }}
      >
        (
        <div
          style={{
            position: "absolute",
            bottom: 60,
            left: 80,
            margin: 0,
            fontSize: 50,
            maxWidth: 900,
            whiteSpace: "pre-wrap",
            letterSpacing: -1,
            display: "flex",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <img
              src="http://localhost:3000/android-chrome-512x512.png"
              width={80}
              height={80}
              alt="company logo"
              style={{ borderRadius: "100%" }}
            />
            <h1>
              {image === "-" ? `${title} | 'AI Detective'` : "AI Detective"}
            </h1>
          </div>
        </div>
        )
      </div>
    ),
    {
      width: 800,
      height: 400,
    }
  );
}
