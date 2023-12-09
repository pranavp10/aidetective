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
          backgroundImage: `url(${image})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          fontWeight: 600,
          color: "white",
        }}
      >
        <h1
          style={{
            position: "absolute",
            bottom: 60,
            left: 80,
            margin: 0,
            fontSize: 50,
            fontFamily: "NYT Cheltenham",
            maxWidth: 900,
            whiteSpace: "pre-wrap",
            letterSpacing: -1,
          }}
        >
          {title}
        </h1>
      </div>
    ),
    {
      width: 1050,
      height: 549,
    }
  );
}
