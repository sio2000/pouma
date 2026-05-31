import { useNetlifyBlobs } from "@/lib/db/json-storage";
import path from "path";

export function getTmpUploadDir() {
  return path.join("/tmp", "pouma-uploads");
}

const UPLOAD_API_PREFIX = "/api/uploads/resources/";

export function uploadKeyFromFilename(filename: string) {
  return `resources/${filename}`;
}

export function filenameFromUploadUrl(url?: string) {
  if (!url) return null;
  if (url.startsWith(UPLOAD_API_PREFIX)) {
    return url.slice(UPLOAD_API_PREFIX.length);
  }
  if (url.startsWith("/uploads/resources/")) {
    return url.slice("/uploads/resources/".length);
  }
  return null;
}

export async function getUploadStore() {
  const { getStore } = await import("@netlify/blobs");
  return getStore({ name: "pouma-uploads", consistency: "strong" });
}

export function isBlobUploadUrl(url?: string) {
  return Boolean(url?.startsWith(UPLOAD_API_PREFIX));
}

export { useNetlifyBlobs, UPLOAD_API_PREFIX };
