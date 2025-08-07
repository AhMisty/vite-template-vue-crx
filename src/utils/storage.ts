export const StorageRecord = {
  'cookie.urls': [] as string[],
  'cookie.names': [] as string[],
  'cookie.values': [] as string[],
  'cookie.expires': [] as (number | undefined)[],
  'header.urls': [] as string[],
  'header.names': [] as string[],
  'header.values': [] as string[],
}
export type StorageRecord = typeof StorageRecord
export type StorageMode = 'sync' | 'local' | 'session'

export const set = (mode: StorageMode, data: Partial<StorageRecord>) => {
  return chrome.storage[mode].set(data)
}

export const get = <T extends keyof StorageRecord>(mode: StorageMode, ...keys: T[]) => {
  return chrome.storage[mode].get(keys) as Promise<{
    [key in T]: StorageRecord[key]
  }>
}

export const init = async (mode: StorageMode) => {
  const res = await get(mode, ...(Object.keys(StorageRecord) as (keyof StorageRecord)[]))
  const record: any = {}
  for (const key in StorageRecord) {
    if (Array.isArray(res[key as keyof StorageRecord])) continue
    record[key] = StorageRecord[key as keyof StorageRecord]
  }
  return set(mode, record)
}
