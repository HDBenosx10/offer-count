export interface CacheManager<T> {
  get(key: string): Promise<T | null>
  set(key: string, value: T | string): Promise<void>
}
