/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name");

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          textAlign: "center",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          flexWrap: "nowrap",
          backgroundColor: "white",
          backgroundImage:
            "radial-gradient(circle at 25px 25px, lightgray 2%, transparent 0%), radial-gradient(circle at 75px 75px, lightgray 2%, transparent 0%)",
          backgroundSize: "100px 100px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src="http://localhost:3000/android-chrome-512x512.png"
            width={80}
            height={80}
            alt="company logo"
            style={{ borderRadius: "100%" }}
          />
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 40,
            fontStyle: "normal",
            color: "black",
            marginTop: 30,
            lineHeight: 1.8,
            whiteSpace: "pre-wrap",
            borderRadius: "100%",
            border: "1px solid #069668",
          }}
        >
          <b>{name}</b>
        </div>
      </div>
    ),
    {
      width: 800,
      height: 400,
    }
  );
}
