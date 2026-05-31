import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";
import {
  getTmpUploadDir,
  getUploadStore,
  uploadKeyFromFilename,
} from "@/lib/db/upload-storage";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ filename: string }> }
) {
  const { filename } = await params;
  if (!filename || filename.includes("..") || filename.includes("/")) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  try {
    const store = await getUploadStore();
    const blob = await store.getWithMetadata(uploadKeyFromFilename(filename));
    if (blob?.data) {
      const raw = blob.data as ArrayBuffer | Uint8Array | string;
      const body =
        typeof raw === "string"
          ? Buffer.from(raw)
          : raw instanceof Uint8Array
            ? Buffer.from(raw)
            : Buffer.from(new Uint8Array(raw));

      const contentType =
        (blob.metadata?.contentType as string | undefined) ?? "application/octet-stream";

      return new NextResponse(body, {
        headers: {
          "Content-Type": contentType,
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      });
    }
  } catch {
    // Fall through to /tmp disk fallback.
  }

  try {
    const diskPath = path.join(getTmpUploadDir(), filename);
    const body = await fs.readFile(diskPath);
    const ext = path.extname(filename).toLowerCase();
    const contentType =
      ext === ".pdf"
        ? "application/pdf"
        : ext === ".png"
          ? "image/png"
          : ext === ".webp"
            ? "image/webp"
            : ext === ".gif"
              ? "image/gif"
              : "image/jpeg";

    return new NextResponse(body, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}
