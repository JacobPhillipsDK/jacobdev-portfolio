// lib/projects.ts
import "server-only";
import { fetchList } from "@/lib/payload"; // <-- from the refactor we made

export type ProjectSummary = {
  id: number | string;
  title?: string;
  slug?: string;
  description?: string;
  date?: string;
  tags?: Array<{ label?: string } | string>;
  thumbnail?: any;
  thumbnailURL?: string;
  __thumbPath?: string | null;
  __thumbSize?: { w: number; h: number } | null;
};

function getPayloadOrigin(): string {
  const raw = process.env.PAYLOAD_URL ?? "";
  if (!raw) return "";
  try {
    const u = new URL(raw);
    return u.origin; // protocol + host + optional port
  } catch {
    // fallback: strip trailing /api if present
    return raw.replace(/\/api\/?$/, "");
  }
}

function selectThumbnailCandidate(p: any): string | null {
  const t = p?.thumbnail ?? {};
  const sizes = t?.sizes ?? {};
  const candidates = [
    sizes?.thumbnail?.url,
    sizes?.small?.url,
    sizes?.medium?.url,
    sizes?.square?.url,
    t?.thumbnailURL,
    t?.url,
    p?.thumbnailURL,
  ].filter(Boolean);
  return candidates.length > 0 ? String(candidates[0]) : null;
}

function pickThumbnailSize(p: any) {
  const t = p?.thumbnail ?? {};
  const sizes = t?.sizes ?? {};
  const pick = (s: any) => (s && s.width && s.height ? { w: s.width, h: s.height } : null);
  return (
    pick(sizes?.thumbnail) ??
    pick(sizes?.small) ??
    pick(sizes?.medium) ??
    (t?.width && t?.height ? { w: t.width, h: t.height } : null)
  );
}

/**
 * Fetch all projects (paged up to 1000) and normalize thumbnails.
 * Relies on lib/payload.ts for auth, caching, and errors.
 */
export async function getProjectsFromPayload(): Promise<ProjectSummary[]> {
  // You can tweak these knobs as needed:
  const depth = 2;               // include related media, etc.
  const limit = 1000;            // pull “all” within reason
  const sort = "-date";          // newest first (change to "date" for oldest first)

  // If you need only published documents, add: whereEquals: { published: true }
  const { docs } = await fetchList("Projects", {
    depth,
    limit,
    sort,
    // whereEquals: { published: true },
  });

  const payloadOrigin = getPayloadOrigin();

  const normalized: ProjectSummary[] = docs.map((p: any) => {
    const proj: ProjectSummary = {
      id: p.id,
      title: p.title,
      slug: p.slug,
      description: p.description,
      date: p.date,
      tags: p.tags,
      thumbnail: p.thumbnail,
      thumbnailURL: p.thumbnailURL,
      __thumbPath: null,
      __thumbSize: null,
    };

    const candidate = selectThumbnailCandidate(p);
    if (candidate) {
      proj.__thumbPath = candidate.startsWith("/")
        ? (payloadOrigin ? payloadOrigin + candidate : candidate)
        : candidate; // absolute URL as-is
    }
    proj.__thumbSize = pickThumbnailSize(p) ?? null;

    return proj;
  });

  return normalized;
}
