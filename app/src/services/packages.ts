import ky from 'ky'
import * as packageUtils from '../utils/package'

export interface Suggestion {
  package: {
    name: string
    scope: string
    version: string
    description: string
    keywords: string[]
    date: string
  }
  score: {
    final: number
    detail: {
      quality: number
      popularity: number
      maintenance: number
    }
  }
  searchScore: number
  highlight: string
}

export const getPackagesSuggestions = async (query: string) => {
  const suggestionSort = (packageA: Suggestion, packageB: Suggestion) => {
    if (Math.abs(Math.log(packageB.searchScore) - Math.log(packageA.searchScore)) > 1) {
      return packageB.searchScore - packageA.searchScore
    } else {
      return packageB.score.detail.popularity - packageA.score.detail.popularity
    }
  }
  try {
    const { name } = packageUtils.getNameAndVersion(query)
    const suggestions: Suggestion[] = await ky
      .get(`https://api.npms.io/v2/search/suggestions?q=${name}&size=5`)
      .json()
    return suggestions.sort(suggestionSort)
  } catch (e) {
    return []
  }
}