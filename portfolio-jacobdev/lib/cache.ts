// Simple in-memory LRU cache with TTL per-entry
// Meant for single-VPS (long-running) Node/Next server process.

type LRUNode<K, V> = {
  key: K;
  value: V;
  expiresAt?: number; // epoch ms
  prev?: LRUNode<K, V> | null;
  next?: LRUNode<K, V> | null;
};

export class LRUCache<K = string, V = any> {
  private capacity: number;
  private map: Map<K, LRUNode<K, V>>;
  private head?: LRUNode<K, V> | null;
  private tail?: LRUNode<K, V> | null;
  private defaultTtlMs?: number | undefined;

  constructor(capacity = 100, defaultTtlMs?: number) {
    if (capacity <= 0) throw new Error("LRU capacity must be > 0");
    this.capacity = capacity;
    this.map = new Map();
    this.head = null;
    this.tail = null;
    this.defaultTtlMs = defaultTtlMs;
  }

  private attachToHead(node: LRUNode<K, V>) {
    node.prev = null;
    node.next = this.head ?? null;
    if (this.head) this.head.prev = node;
    this.head = node;
    if (!this.tail) this.tail = node;
  }

  private removeNode(node: LRUNode<K, V>) {
    if (node.prev) node.prev.next = node.next ?? null;
    if (node.next) node.next.prev = node.prev ?? null;
    if (this.head === node) this.head = node.next ?? null;
    if (this.tail === node) this.tail = node.prev ?? null;
    node.next = node.prev = null;
  }

  private evictIfNeeded() {
    while (this.map.size > this.capacity && this.tail) {
      const key = this.tail.key;
      this.map.delete(key);
      const oldTail = this.tail;
      this.removeNode(oldTail);
    }
  }

  get(key: K): V | undefined {
    const node = this.map.get(key);
    if (!node) return undefined;
    // TTL check
    if (node.expiresAt && Date.now() > node.expiresAt) {
      // expired — remove
      this.map.delete(key);
      this.removeNode(node);
      return undefined;
    }
    // move to head (most recently used)
    this.removeNode(node);
    this.attachToHead(node);
    return node.value;
  }

  set(key: K, value: V, ttlMs?: number) {
    const existing = this.map.get(key);
    const expiresAt = ttlMs ?? (this.defaultTtlMs ? Date.now() + this.defaultTtlMs : undefined);
    if (existing) {
      existing.value = value;
      existing.expiresAt = expiresAt;
      this.removeNode(existing);
      this.attachToHead(existing);
    } else {
      const node: LRUNode<K, V> = { key, value, expiresAt };
      this.attachToHead(node);
      this.map.set(key, node);
      this.evictIfNeeded();
    }
  }

  delete(key: K) {
    const node = this.map.get(key);
    if (!node) return;
    this.map.delete(key);
    this.removeNode(node);
  }

  clear() {
    this.map.clear();
    this.head = this.tail = null;
  }

  size() {
    return this.map.size;
  }
}

/* === Singleton for Next hot-reload safety ===
   Global vars avoid re-creating cache every module reload in dev.
*/
declare global {
  // eslint-disable-next-line no-var
  var __JACOBDEV_LRU_CACHE__: LRUCache<string, any> | undefined;
}

export function getLRU(): LRUCache<string, any> {
  if (global.__JACOBDEV_LRU_CACHE__) return global.__JACOBDEV_LRU_CACHE__;
  const cap = process.env.LRU_CACHE_CAPACITY ? parseInt(process.env.LRU_CACHE_CAPACITY, 10) : 200;
  const ttlSeconds = process.env.LRU_CACHE_TTL_SECONDS ? parseInt(process.env.LRU_CACHE_TTL_SECONDS, 10) : 300;
  global.__JACOBDEV_LRU_CACHE__ = new LRUCache<string, any>(cap, ttlSeconds * 1000);
  return global.__JACOBDEV_LRU_CACHE__;
}
