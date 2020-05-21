const got = require('got')
const getBuiltPackageStats = require('package-build-stats')
const pkgVersions = require('pkg-versions')
const compareVersions = require('compare-versions')
const gitURLParse = require('git-url-parse')
const winston = require('winston')

const getPackageInfo = async (packageName, version = '') => {
  const { body } = await got(`https://registry.yarnpkg.com/${packageName}/${version}`, {
    json: true,
  })

  const { name, description, repository } = body

  let repositoryUrl = ''
  try {
    repositoryUrl = gitURLParse(repository.url || repository).toString('https')
  } catch (e) {
    winston.error('failed to parse repository url', repository)
  }

  const cleanDesc = description ? description.substring(0, 300) : ''

  if (version) {
    return {
      name,
      version: body.version,
      repository: repositoryUrl,
      description: cleanDesc,
    }
  }
  return {
    name,
    version: body['dist-tags'].latest,
    repository: repositoryUrl,
    description: cleanDesc,
  }
}

const getPackageStat = async (name, version) => {

  let info = null
  try {
    info = await getPackageInfo(name, version)
  } catch (e) {
    console.error(e)
    return null
  }

  const sizeStats = await getBuiltPackageStats(`${info.name}@${info.version}`)

  const stat = {
    ...info,
    size: sizeStats.size,
    gzip: sizeStats.gzip,
    dependencySizes: sizeStats.dependencySizes,
  }

  return stat
}

const getVersionsForHistory = versions => {
  const stableVersions = versions.filter(v => v.match(/^\d+\.\d+\.\d+$/)).sort(compareVersions)
  const last4Versions = stableVersions.slice(-4)
  const [major] = stableVersions[stableVersions.length - 1].split('.')

  const previousMajor = stableVersions.reverse().find(v => !v.startsWith(`${major}.`))
  if (!previousMajor) {
    return last4Versions
  }

  if (last4Versions.includes(previousMajor)) {
    return last4Versions
  }

  return [previousMajor, ...last4Versions.slice(1)]
}

const getPackageStatHistory = async name => {
  try {
    const versionsSet = await pkgVersions(name)
    const versions = [...versionsSet]

    const promises = getVersionsForHistory(versions).map(async version => {
      const stats = await getPackageStat(name, version)
      return {
        version,
        size: stats.size,
        gzip: stats.gzip,
      }
    })

    return Promise.all(promises)
  } catch (e) {
    if (e.name === 'PackageNotFoundError') {
      return null
    }
    throw e
  }
}

module.exports = { getPackageStat, getPackageStatHistory, getVersionsForHistory }
