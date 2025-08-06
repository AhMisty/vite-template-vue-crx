import { defineManifest } from '@crxjs/vite-plugin'
import packageJson from './package.json'

export default defineManifest({
  manifest_version: 3,
  name: 'Bifrost',
  version: packageJson.version,
  description: 'Bifrost browser extension',
  icons: {
    16: 'favicon.png',
    32: 'favicon.png',
    48: 'favicon.png',
    128: 'favicon.png',
  },
  background: {
    service_worker: 'src/service-worker.ts',
    type: 'module',
  },
  options_ui: {
    page: 'index.html',
    open_in_tab: true,
  },
  action: {
    default_icon: {
      16: 'favicon.png',
      32: 'favicon.png',
      48: 'favicon.png',
      128: 'favicon.png',
    },
  },
  permissions: ['sidePanel', 'storage', 'cookies', 'declarativeNetRequest'],
  host_permissions: ['<all_urls>'],
})
