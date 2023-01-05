import getConfig from 'next/config'
//config from next config
const { publicRuntimeConfig } = getConfig()
const BACKEND_URL = `${publicRuntimeConfig.apiUrl}`
// const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL
const baseURL = BACKEND_URL

const SERVER_SETTINGS = {
  BACKEND_URL,
  baseURL,
  getNfts: {
    url: '/api/ntfs',
  },
}

export default SERVER_SETTINGS
