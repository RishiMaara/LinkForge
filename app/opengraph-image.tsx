import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630
};

export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fafaf9",
          color: "#111827",
          fontFamily: "sans-serif"
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: "bold",
            letterSpacing: "-0.05em",
            marginBottom: 16
          }}
        >
          LinkForge
        </div>
        <div
          style={{
            fontSize: 24,
            color: "#6b7280"
          }}
        >
          Your links should do more than redirect.
        </div>
      </div>
    ),
    size
  );
}
