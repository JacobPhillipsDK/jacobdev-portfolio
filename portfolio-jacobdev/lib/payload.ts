/* eslint-disable no-console */
import "server-only";
import {getLRU} from "./cache";


const LRU = getLRU();
const DEFAULT_TTL_SECONDS = process.env.LRU_CACHE_TTL_SECONDS
    ? parseInt(process.env.LRU_CACHE_TTL_SECONDS, 10)
    : 300;

const inFlight: Map<string, Promise<any>> = new Map();

export type CollectionKey = "Projects" | "WorkExperience" | "Education" | "AboutMe" | "Posts";

export const COLLECTION_MAP: Record<CollectionKey, string> = {
    Projects: "projects",
    WorkExperience: "workexperience",
    Education: "education",
    AboutMe: "about-me",
    Posts : "posts"
};

type CollectionLike = CollectionKey | string;

type DocIdLike = string | number;

export type FetchCommonOptions = {
    /** Payload depth (default 2) */
    depth?: number;
    /** Include draft docs (default false) */
    draft?: boolean;
    /** Include trashed docs (default false) */
    trash?: boolean;
    /** Cache TTL in seconds (default from env or 300) */
    ttlSeconds?: number;
};

export type FetchDocOptions = FetchCommonOptions & {
    /**
     * Candidate slug fields to try, in order.
     * Default: ["slug", "slug.en", "slug.da"]
     */
    slugFields?: string[];
};

export type FetchListOptions = FetchCommonOptions & {
    /** Where clause (simple equals map). Example: { category: "web" } */
    whereEquals?: Record<string, string | number | boolean>;
    /** Limit (default 10) */
    limit?: number;
    /** Page (1-based, default 1) */
    page?: number;
    /** Sort (Payload sort string, e.g., "-createdAt") */
    sort?: string;
};

let _authPrefix: "API-Key" | "users API-Key" | null = null;

function getPayloadApiBase(): string {
    const raw = process.env.PAYLOAD_API_URL ?? "http://localhost:3000/api";
    const trimmed = raw.replace(/\/+$/, "");
    return trimmed.endsWith("/api") ? trimmed : `${trimmed}/api`;
}

function resolveCollectionSlug(input: CollectionLike): string {
    return (COLLECTION_MAP as Record<string, string>)[input as string] ?? String(input);
}

function getAuthHeaders(): Array<Record<string, string>> {
    const apiKey = process.env.PAYLOAD_API_KEY;
    if (!apiKey) {
        console.error("Missing PAYLOAD_API_KEY (server-only).");
        return [];
    }
    // Try the two common formats. Order: modern first.
    return [
        {Authorization: `API-Key ${apiKey}`, Accept: "application/json"},
        {Authorization: `users API-Key ${apiKey}`, Accept: "application/json"},
    ];
}

function cachedHeader(): Record<string, string> | null {
    const apiKey = process.env.PAYLOAD_API_KEY;
    if (!_authPrefix || !apiKey) return null;
    return {Authorization: `${_authPrefix} ${apiKey}`, Accept: "application/json"};
}


export async function fetchWithAuth(url: string, init: RequestInit = {}): Promise<Response> {
    // 1) Use cached working header if we have it
    const cached = cachedHeader();
    if (cached) {
        const res = await fetch(url, {...init, headers: {...(init.headers as any), ...cached}});
        if (res.status !== 401 && res.status !== 403) return res;
    }

    // 2) Probe both header styles; remember the first that works
    const candidates = getAuthHeaders();
    let lastRes: Response | null = null;

    for (const hdr of candidates) {
        const res = await fetch(url, {...init, headers: {...(init.headers as any), ...hdr}});
        lastRes = res;

        if (res.status !== 401 && res.status !== 403) {
            // Lock in the working prefix for subsequent calls
            const prefix = hdr.Authorization.split(" ").slice(0, -1).join(" ");
            if (prefix === "API-Key" || prefix === "users API-Key") _authPrefix = prefix;
            return res;
        }
    }

    // 3) If all failed, return the last response so caller can handle (likely 401/403)
    return lastRes as Response;
}


function qs(params: Record<string, string | number | boolean | undefined | null>): string {
    const entries = Object.entries(params)
        .filter(([, v]) => v !== undefined && v !== null);
    if (entries.length === 0) return "";
    const s = entries
        .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
        .join("&");
    return s ? `?${s}` : "";
}

function appendWhereEquals(baseUrl: string, eq?: Record<string, string | number | boolean>): string {
    if (!eq || Object.keys(eq).length === 0) return baseUrl;
    const url = new URL(baseUrl);
    for (const [field, value] of Object.entries(eq)) {
        url.searchParams.append(`where[${field}][equals]`, String(value));
    }
    return url.toString();
}

/**
 * Fetch a single document by "slug or id".
 * - Tries given slugFields with correct Payload syntax where[field][equals]=value
 * - Falls back to GET /:id
 */
export async function fetchDoc(
    collection: CollectionLike,
    slugOrId: DocIdLike,
    opts: FetchDocOptions = {},
): Promise<any | null> {
    if (slugOrId === undefined || slugOrId === null || slugOrId === "") return null;

    const collectionSlug = resolveCollectionSlug(collection);
    const apiBase = getPayloadApiBase();

    const depth = opts.depth ?? 2;
    const draft = opts.draft ?? false;
    const trash = opts.trash ?? false;
    const ttlMs = (opts.ttlSeconds ?? DEFAULT_TTL_SECONDS) * 1000;

    const slugFields = opts.slugFields ?? ["slug", "slug.en", "slug.da"];

    // Try each slug-field query
    for (const field of slugFields) {
        const url = new URL(`${apiBase}/${encodeURIComponent(collectionSlug)}`);
        url.searchParams.set(`where[${field}][equals]`, String(slugOrId));
        url.searchParams.set("limit", "1");
        url.searchParams.set("depth", String(depth));
        url.searchParams.set("draft", String(draft));
        url.searchParams.set("trash", String(trash));

        const cacheKey = `payload:doc:${collectionSlug}:slugfield:${field}:${slugOrId}:url:${url.toString()}`;

        // LRU hit
        try {
            const cached = LRU.get(cacheKey);
            if (cached) {
                return cached;
            }
        } catch (e) {
            console.warn("[cache] LRU get failed", e);
        }

        // In-flight dedupe
        const inflight = inFlight.get(cacheKey);
        if (inflight) {
            try {
                const r = await inflight;
                return r;
            } catch {
                inFlight.delete(cacheKey);
            }
        }

        const p = (async () => {
            try {
                const res = await fetchWithAuth(url.toString(), {method: "GET", cache: "no-store"});
                if (!res.ok) {
                    const txt = await res.text().catch(() => "");
                    console.error("[payload] slugQuery error", res.status, txt);
                    return null;
                }
                const json = await res.json();
                const doc = (json?.docs && json.docs[0]) ?? null;
                if (doc) {
                    try {
                        LRU.set(cacheKey, doc, ttlMs);
                    } catch { /* ignore */
                    }
                    return doc;
                }
                return null;
            } catch (e) {
                console.error("[payload] slugQuery exception", e);
                return null;
            }
        })();

        inFlight.set(cacheKey, p);
        try {
            const result = await p;
            if (result) return result;
        } finally {
            inFlight.delete(cacheKey);
        }
    }

    // Fallback: GET by id
    const byIdUrl = `${apiBase}/${encodeURIComponent(collectionSlug)}/${encodeURIComponent(
        String(slugOrId),
    )}${qs({depth, draft, trash})}`;

    const cacheKeyById = `payload:doc:${collectionSlug}:byId:${slugOrId}:url:${byIdUrl}`;
    try {
        const cachedById = LRU.get(cacheKeyById);
        if (cachedById) return cachedById;
    } catch (e) {
        console.warn("[cache] LRU get (byId) failed", e);
    }

    const pById = (async () => {
        try {
            const res = await fetchWithAuth(byIdUrl, {method: "GET", cache: "no-store"});
            if (!res.ok) {
                const txt = await res.text().catch(() => "");
                console.error("[payload] byId error", res.status, txt);
                return null;
            }
            const body = await res.json();
            const doc = body?.id ? body : (body?.docs && body.docs[0]) ? body.docs[0] : null;
            if (doc) {
                try {
                    LRU.set(cacheKeyById, doc, ttlMs);
                } catch { /* ignore */
                }
                return doc;
            }
            return null;
        } catch (e) {
            console.error("[payload] byId exception", e);
            return null;
        }
    })();

    inFlight.set(cacheKeyById, pById);
    try {
        return await pById;
    } finally {
        inFlight.delete(cacheKeyById);
    }
}

/**
 * Fetch the "first" document of a collection (useful for singleton-ish content like AboutMe).
 * You can adjust sort to prefer newest/oldest.
 */
export async function fetchSingleton(
    collection: CollectionLike,
    opts: FetchCommonOptions & { sort?: string } = {},
): Promise<any | null> {
    const collectionSlug = resolveCollectionSlug(collection);
    const apiBase = getPayloadApiBase();

    const depth = opts.depth ?? 2;
    const draft = opts.draft ?? false;
    const trash = opts.trash ?? false;
    const sort = opts.sort ?? "-updatedAt";
    const limit = 1;

    const url = `${apiBase}/${encodeURIComponent(collectionSlug)}${qs({
        depth,
        draft,
        trash,
        limit,
        sort,
        page: 1,
    })}`;

    const cacheKey = `payload:singleton:${collectionSlug}:url:${url}`;
    try {
        const cached = LRU.get(cacheKey);
        if (cached) return cached;
    } catch (e) {
        console.warn("[cache] LRU get (singleton) failed", e);
    }

    const p = (async () => {
        try {
            const res = await fetchWithAuth(url, {method: "GET", cache: "no-store"});
            if (!res.ok) {
                const txt = await res.text().catch(() => "");
                console.error("[payload] singleton error", res.status, txt);
                return null;
            }
            const json = await res.json();
            const doc = (json?.docs && json.docs[0]) ?? null;
            if (doc) {
                try {
                    LRU.set(cacheKey, doc, (opts.ttlSeconds ?? DEFAULT_TTL_SECONDS) * 1000);
                } catch { /* ignore */
                }
                return doc;
            }
            return null;
        } catch (e) {
            console.error("[payload] singleton exception", e);
            return null;
        }
    })();

    inFlight.set(cacheKey, p);
    try {
        return await p;
    } finally {
        inFlight.delete(cacheKey);
    }
}

/**
 * List documents in a collection with simple equals-based filtering, paging and sort.
 */
export async function fetchList(
    collection: CollectionLike,
    opts: FetchListOptions = {},
): Promise<{ docs: any[]; total: number; page: number; limit: number }> {
    const collectionSlug = resolveCollectionSlug(collection);
    const apiBase = getPayloadApiBase();

    const depth = opts.depth ?? 1;
    const draft = opts.draft ?? false;
    const trash = opts.trash ?? false;
    const limit = Math.max(1, Math.min(100, opts.limit ?? 10));
    const page = Math.max(1, opts.page ?? 1);
    const sort = opts.sort;

    let url = `${apiBase}/${encodeURIComponent(collectionSlug)}${qs({
        depth,
        draft,
        trash,
        limit,
        page,
        ...(sort ? {sort} : {}),
    })}`;

    url = appendWhereEquals(url, opts.whereEquals);

    const cacheKey = `payload:list:${collectionSlug}:url:${url}`;
    try {
        const cached = LRU.get(cacheKey);
        if (cached) return cached;
    } catch (e) {
        console.warn("[cache] LRU get (list) failed", e);
    }

    const p = (async () => {
        try {
            const res = await fetchWithAuth(url, {method: "GET", cache: "no-store"});
            if (!res.ok) {
                const txt = await res.text().catch(() => "");
                console.error("[payload] list error", res.status, txt);
                return {docs: [], total: 0, page, limit};
            }
            const json = await res.json();
            const shaped = {
                docs: json?.docs ?? [],
                total: json?.totalDocs ?? json?.total ?? 0,
                page: json?.page ?? page,
                limit: json?.limit ?? limit,
            };
            try {
                LRU.set(cacheKey, shaped, (opts.ttlSeconds ?? DEFAULT_TTL_SECONDS) * 1000);
            } catch { /* ignore */
            }
            return shaped;
        } catch (e) {
            console.error("[payload] list exception", e);
            return {docs: [], total: 0, page, limit};
        }
    })();

    inFlight.set(cacheKey, p);
    try {
        return await p;
    } finally {
        inFlight.delete(cacheKey);
    }
}
