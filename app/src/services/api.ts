import ky from 'ky'
import * as packageUtils from '../utils/package'

export interface PackageInfo {
  name: string
  version: string
  description: string
  repository: string
  size: number
  gzip: number
  dependencySizes: Array<{
    name: string
    approximateSize: number
  }>
}

interface PackageHistoryItem {
  version: string
  size: number
  gzip: number
}

export type PackageHistory = PackageHistoryItem[]

const API_URL = 'http://localhost:8080';

export const getPackageInfo = async (query: string) => {
  const { name, version } = packageUtils.getNameAndVersion(query)
  try {
    const info: PackageInfo = await ky
      .get(`${API_URL}/stats`, {
        searchParams: {
          name,
          ...(version && { version }),
        },
        timeout: 30000,
      })
      .json()
    return info
  } catch (e) {
    console.error(e)
    return null
  }
}

export const getPackageHistory = async (name: string) => {
  try {
    const history: PackageHistory = await ky
      .get(`${API_URL}/history`, {
        searchParams: {
          name,
        },
        timeout: 30000,
      })
      .json()
    return history
  } catch (e) {
    console.error(e)
    return null
  }
}
