const origin = `chrome-extension://${chrome.runtime.id}`
const spaHandler = async (url: string, headers: Headers) => {
  const protoResponse = await fetch(url, {
    headers,
  }).catch(() => null)
  if (protoResponse && protoResponse.status !== 404) {
    return protoResponse
  }
  return fetch(`${origin}/index.html`)
}
globalThis.addEventListener('fetch', async (event) => {
  const fetchEvent = event as FetchEvent
  if (!fetchEvent.request.url.startsWith(origin)) return
  if (fetchEvent.request.url === `${origin}/index.html`) {
    fetchEvent.respondWith(
      new globalThis.Response(null, { status: 302, headers: { location: `${origin}/` } }),
    )
    return
  }
  fetchEvent.respondWith(spaHandler(fetchEvent.request.url, fetchEvent.request.headers))
})

chrome.runtime.onInstalled.addListener(() => {
  chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true })
  chrome.sidePanel.setOptions({
    path: '/sidepanel',
  })
})
