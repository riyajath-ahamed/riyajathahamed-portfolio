import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { DATA } from "@/data/resume";

export const alt = `${DATA.name}, Product Engineer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Satori blends hard gradient stops, so the airmail border is drawn as an SVG pattern.
const AIRMAIL = `data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><defs><pattern id="s" width="96" height="96" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="96" height="96" fill="#fbf8f1"/><rect width="28" height="96" fill="#e8413c"/><rect x="48" width="28" height="96" fill="#2b4c7e"/></pattern></defs><rect width="1200" height="630" fill="url(#s)"/></svg>`,
)}`;

export default async function OpengraphImage() {
  const acorn = await readFile(join(process.cwd(), "src/app/font/Acorn-SemiBold.otf"));
  const host = new URL(DATA.url).host;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          padding: 16,
        }}
      >
        <img src={AIRMAIL} alt="" width={1200} height={630} style={{ position: "absolute", inset: 0 }} />
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "72px 80px",
            background: "#fbf8f1",
            color: "#211c18",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 26, color: "#5d554e" }}>
            <div style={{ width: 14, height: 14, borderRadius: 999, background: "#2f8f72" }} />
            Product Engineer, {DATA.location.split(",")[0]}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            <div style={{ fontFamily: "Acorn", fontSize: 108, lineHeight: 1, letterSpacing: -3 }}>
              {DATA.name}
            </div>
            <div style={{ fontSize: 34, lineHeight: 1.35, maxWidth: 860, color: "#4a433d" }}>
              {DATA.description}
            </div>
          </div>
          <div style={{ display: "flex", fontSize: 26, color: "#e8413c" }}>{host}</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Acorn", data: acorn, weight: 700, style: "normal" }],
    },
  );
}
