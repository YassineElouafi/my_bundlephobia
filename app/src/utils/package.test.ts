import * as packageUtils from './package'

describe('package utils', () => {
  describe('getNameAndVersion', () => {
    it('should handle normal package without version', () => {
      const result = packageUtils.getNameAndVersion('react-easy-crop')
      expect(result).toEqual({ name: 'react-easy-crop' })
    })
    it('should handle normal package with version', () => {
      const result = packageUtils.getNameAndVersion('react-easy-crop@1.12.0')
      expect(result).toEqual({ name: 'react-easy-crop', version: '1.12.0' })
    })
    it('should handle scoped package without version', () => {
      const result = packageUtils.getNameAndVersion('@testing-library/react')
      expect(result).toEqual({ name: '@testing-library/react' })
    })
    it('should handle scoped package with version', () => {
      const result = packageUtils.getNameAndVersion('@testing-library/react@6.0.0')
      expect(result).toEqual({ name: '@testing-library/react', version: '6.0.0' })
    })
  })
})
