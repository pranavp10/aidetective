/* eslint-disable @next/next/no-img-element */
import { getTagBySlug, getToolsDetails } from "@/fetch/getToolsTags";
import { ImageResponse } from "next/server";

// Route segment config
export const runtime = "edge";

// Image metadata
export const alt = "AI Detective";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function Image({
  params: { slug },
}: {
  params: { slug: string };
}) {
  try {
    const tag = await getTagBySlug({ slug });
    if (!tag)
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
              }}
            >
              <b>Page not found</b>
            </div>
          </div>
        )
      );
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
            <b>
              {tag.emoji} {tag.name}
            </b>
          </div>
        </div>
      ),
      {
        width: 1050,
        height: 549,
      }
    );
  } catch (e) {
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
            }}
          >
            <b>Page Not found</b>
          </div>
        </div>
      )
    );
  }
}
