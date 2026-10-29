import { ImageResponse } from "next/og";
import { clinic } from "@/content/clinic";

export const alt = `${clinic.name}. Patient-centred healthcare.`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#174D43",
          color: "#FAFAF7",
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", fontSize: 22, letterSpacing: 4, textTransform: "uppercase" }}>
          {clinic.speciality}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 72, lineHeight: 1.05, letterSpacing: -1 }}>{clinic.name}</div>
          <div style={{ fontSize: 28, color: "#DDECE6", marginTop: 20 }}>{clinic.cityCountry}</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
