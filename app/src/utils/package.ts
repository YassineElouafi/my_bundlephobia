export const getNameAndVersion = (query: string): { name: string; version?: string } => {
  if (query.includes('@')) {
    if (query.startsWith('@')) {
      const lastAtIndex = query.lastIndexOf('@')
      if (lastAtIndex === 0) {
        return { name: query }
      } else {
        return {
          name: query.substring(0, lastAtIndex),
          version: query.substring(lastAtIndex + 1),
        }
      }
    } else {
      const [name, version] = query.split('@')
      return { name, version }
    }
  }
  return { name: query }
}
