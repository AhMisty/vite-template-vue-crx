export const constants = {
  expires: 365 * 24 * 60 * 60,
}

export const setCookie = (params: { urls: string[]; name: string; value: string }) => {
  const promises: Promise<chrome.cookies.Cookie | undefined>[] = []
  for (const url of params.urls) {
    promises.push(
      chrome.cookies.set({
        url,
        name: params.name,
        value: params.value,
        expirationDate: Math.floor(Date.now() / 1000) + constants.expires,
      }),
    )
  }
  return Promise.all(promises)
}
