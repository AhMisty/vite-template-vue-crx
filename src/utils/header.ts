import { set as setStorage, get as getStorage, type StorageMode } from './storage'

export type SetOption = {
  urls: string[]
  names: string[]
  values: string[]
}

export const clear = async () => {
  const currentRules = await chrome.declarativeNetRequest.getDynamicRules()
  const currentRulesIds: number[] = []
  for (let i = 0, l = currentRules.length; i < l; i++) {
    currentRulesIds.push(currentRules[i].id)
  }
  return chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: currentRulesIds,
  })
}

export const set_only = async (option: SetOption) => {
  await clear()
  const rules: chrome.declarativeNetRequest.Rule[] = []
  for (let i = 0, l = option.urls.length; i < l; i++) {
    rules.push({
      id: i + 1,
      priority: 1,
      action: {
        type: 'modifyHeaders',
        requestHeaders: [
          {
            header: option.names[i],
            operation: 'set',
            value: option.values[i],
          },
        ],
      },
      condition: {
        urlFilter: option.urls[i],
        resourceTypes: [
          'main_frame',
          'sub_frame',
          'stylesheet',
          'script',
          'image',
          'font',
          'object',
          'xmlhttprequest',
          'ping',
          'csp_report',
          'media',
          'websocket',
          'webtransport',
          'webbundle',
          'other',
        ],
      },
    })
  }
  return chrome.declarativeNetRequest.updateDynamicRules({
    addRules: rules,
  })
}

export const set = async (mode: StorageMode, option: SetOption) => {
  await setStorage(mode, {
    'header.urls': option.urls,
    'header.names': option.names,
    'header.values': option.values,
  })
  return set_only(option)
}

export const update = async (mode: StorageMode) => {
  const storage = await getStorage(mode, 'header.urls', 'header.names', 'header.values')
  return set_only({
    urls: storage['header.urls'],
    names: storage['header.names'],
    values: storage['header.values'],
  })
}
