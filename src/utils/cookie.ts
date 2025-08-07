import { set as setStorage, get as getStorage, type StorageMode } from './storage'

export type SetOption = {
  urls: string[]
  names: string[]
  values: string[]
  expires: (number | undefined)[]
}
export type GetOption = {
  urls: string[]
  names: string[]
}

export const set_only = (option: SetOption) => {
  const promises: Promise<chrome.cookies.Cookie | undefined>[] = []
  for (let i = 0, l = option.urls.length; i < l; i++) {
    promises.push(
      chrome.cookies.set({
        url: option.urls[i],
        name: option.names[i],
        value: option.values[i],
        expirationDate:
          option.expires[i] !== undefined
            ? Math.floor(Date.now() / 1000) + (option.expires[i] as number)
            : undefined,
      }),
    )
  }
  return Promise.all(promises)
}

export const set = async (mode: StorageMode, option: SetOption) => {
  await setStorage(mode, {
    'cookie.urls': option.urls,
    'cookie.names': option.names,
    'cookie.values': option.values,
    'cookie.expires': option.expires,
  })
  return set_only(option)
}

export const get = (option: GetOption) => {
  const promises: Promise<chrome.cookies.Cookie | undefined>[] = []
  for (let i = 0, l = option.urls.length; i < l; i++) {
    promises.push(chrome.cookies.get({ url: option.urls[i], name: option.names[i] }))
  }
  return Promise.all(promises)
}

export const update = async (mode: StorageMode) => {
  const storage = await getStorage(
    mode,
    'cookie.urls',
    'cookie.names',
    'cookie.values',
    'cookie.expires',
  )
  return set_only({
    urls: storage['cookie.urls'],
    names: storage['cookie.names'],
    values: storage['cookie.values'],
    expires: storage['cookie.expires'],
  })
}
