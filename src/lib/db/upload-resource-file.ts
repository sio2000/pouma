import { promises as fs } from "fs";
import path from "path";
import {
  filenameFromUploadUrl,
  getUploadStore,
  uploadKeyFromFilename,
  UPLOAD_API_PREFIX,
  useNetlifyBlobs,
} from "@/lib/db/upload-storage";

function getUploadDir() {
  if (useNetlifyBlobs()) {
    return path.join("/tmp", "pouma-uploads");
  }
  return path.join(process.cwd(), "public", "uploads", "resources");
}

const ALLOWED_MIME = new Set([
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

const MAX_BYTES = 15 * 1024 * 1024;

const EXT_BY_MIME: Record<string, string> = {
  "application/pdf": ".pdf",
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif",
};

export async function saveResourceFile(
  file: File,
  resourceId: string
): Promise<{ fileUrl: string; thumbnailUrl?: string }> {
  if (file.size > MAX_BYTES) {
    throw new Error("Το αρχείο υπερβαίνει το όριο 15MB.");
  }

  const mime = file.type || "application/octet-stream";
  if (!ALLOWED_MIME.has(mime)) {
    throw new Error("Μη υποστηριζόμενος τύπος αρχείου. Επιτρέπονται PDF και εικόνες.");
  }

  const extFromMime = EXT_BY_MIME[mime];
  const extFromName = path.extname(file.name);
  const ext = extFromMime ? extFromMime : extFromName ? extFromName : ".bin";
  const filename = `${resourceId}${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  if (useNetlifyBlobs()) {
    try {
      const store = await getUploadStore();
      const arrayBuffer = buffer.buffer.slice(
        buffer.byteOffset,
        buffer.byteOffset + buffer.byteLength
      );
      await store.set(uploadKeyFromFilename(filename), arrayBuffer, {
        metadata: { contentType: mime },
      });
      const fileUrl = `${UPLOAD_API_PREFIX}${filename}`;
      const thumbnailUrl = mime.startsWith("image/") ? fileUrl : undefined;
      return { fileUrl, thumbnailUrl };
    } catch {
      // Blobs unavailable — save under /tmp and serve via API route.
    }
  }

  const uploadDir = getUploadDir();
  await fs.mkdir(uploadDir, { recursive: true });
  const diskPath = path.join(uploadDir, filename);
  await fs.writeFile(diskPath, buffer);

  const fileUrl = useNetlifyBlobs()
    ? `${UPLOAD_API_PREFIX}${filename}`
    : `/uploads/resources/${filename}`;
  const thumbnailUrl = mime.startsWith("image/") ? fileUrl : undefined;

  return { fileUrl, thumbnailUrl };
}

export async function deleteResourceFile(fileUrl?: string, thumbnailUrl?: string): Promise<void> {
  const urls = new Set([fileUrl, thumbnailUrl].filter(Boolean) as string[]);

  const paths = new Set<string>();
  for (const url of urls) {
    const name = filenameFromUploadUrl(url);
    if (!name) continue;
    if (url.startsWith(UPLOAD_API_PREFIX)) {
      paths.add(path.join(getUploadDir(), name));
      if (useNetlifyBlobs()) {
        try {
          const store = await getUploadStore();
          await store.delete(uploadKeyFromFilename(name)).catch(() => undefined);
        } catch {
          // ignore blob delete errors
        }
      }
      continue;
    }
    if (url.startsWith("/uploads/resources/")) {
      paths.add(path.join(process.cwd(), "public", url));
    }
  }
  await Promise.all([...paths].map((p) => fs.unlink(p).catch(() => undefined)));
}
