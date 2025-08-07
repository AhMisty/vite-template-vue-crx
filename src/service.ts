import './service/spa'
import { init as initStorage } from './utils/storage'
import { update as updateCookie } from './utils/cookie'
import { update as updateHeader } from './utils/header'

chrome.runtime.onInstalled.addListener(async () => {
  const mode = 'sync'
  await initStorage(mode)
  await updateCookie(mode)
  await updateHeader(mode)
  chrome.runtime.openOptionsPage()
})
